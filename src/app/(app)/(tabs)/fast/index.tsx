import CheckIcon from '@assets/icons/add-calories-check.svg';
import FastImage from '@assets/images/fast-image.svg';
import Body from '@components/custom-ui/Body';
import Button from '@components/custom-ui/Button';
import DrawerButton from '@components/custom-ui/DrawerButton';
import Header from '@components/custom-ui/Header';
import Heading from '@components/custom-ui/Heading';
import Screen from '@components/custom-ui/Screen';
import VStack from '@components/custom-ui/VStack';
import DurationPicker from '@components/features/fast/DurationPicker'; // ajuste o path
import FastCronometer from '@components/features/fast/FastCronometer';
import { Colors } from '@constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { textStyles } from '@styles/textStyles';
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, AppState, Platform, StyleSheet } from 'react-native';

interface IFast {
    id: string;
    date: number;
    duration: number;
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

const FastScreen = () => {
    const { t } = useTranslation('fast');
    const appState = useRef(AppState.currentState);
    const [alert, setAlert] = useState(true);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isCronometerActive, setIsCronometerActive] = useState(false);

    const [finishTime, setFinishTime] = useState(0);
    const [cronometer, setCronometer] = useState(0);

    const [fasts, setFasts] = useState<IFast[]>([]);

    const [hasPermission, setHasPermission] = useState(false);
    const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (isCronometerActive) {
            timer = setInterval(async () => {
                if (cronometer > 0) {
                    setCronometer((prevTempo) => prevTempo - 1000);
                } else {
                    // saveFasts();
                    stopTimer();
                }
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isCronometerActive, cronometer]);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            const doUpdateCronometer = async () => {
                updateScreen();
            };
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                doUpdateCronometer();
            } else {
                // stopTimer();
            }
            appState.current = nextAppState;
        });
        return () => {
            subscription.remove();
        };
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const doUpdateCronometer = async () => {
                updateScreen();
            };
            doUpdateCronometer();
            return () => {
                // stopTimer();
            };
        }, [])
    );

    useEffect(() => {
        (async () => {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                Alert.alert('Permissão não concedida para notificações');
                return;
            }

            if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                });
            }

            setHasPermission(true);
        })();

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true, // alerta na tela
                shouldShowBanner: true, // iOS 14+ banner
                shouldShowList: true, // mostra no centro de notificações
                shouldPlaySound: true, // toca som
                shouldSetBadge: false, // não altera badge
            }),
        });
    }, []);

    const convertMsToTimer = (ms: number) => {
        const data = new Date(ms);
        const hours = String(data.getUTCHours()).padStart(2, '0');
        const minutes = String(data.getUTCMinutes()).padStart(2, '0');
        const seconds = String(data.getUTCSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const createNotification = async (timeMs: number) => {
        if (!hasPermission) return;
        const date = new Date(timeMs).toLocaleTimeString();
        const seconds = timeMs / 1000;

        console.log('Setando para daqui (segundos):', seconds);
        console.log('Data:', new Date(timeMs).toLocaleTimeString());

        await Notifications.scheduleNotificationAsync({
            content: {
                title: t('end_fast'),
                body: t('have_fineshed_fast', { hours: date }),
                sound: 'default',
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: timeMs,
            },
        });
    };

    const getData = useCallback(async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value != null ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Error getting AsyncStorage data:', error);
            return null;
        }
    }, []);

    const saveFasts = React.useCallback(async () => {
        const finish = await getData('@fast/finishTime');
        const hours = await getData('@fast/finishTime');
        const savedfasts = await getData('@fast/fasts');
        let newFasts;

        if (savedfasts) {
            newFasts = [
                {
                    // id: uuidv4(),
                    date: finish as number,
                    duration: hours as number,
                },
                ...savedfasts,
            ];
        } else {
            newFasts = [
                {
                    // id: uuidv4(),
                    date: finish as number,
                    duration: hours as number,
                },
            ];
        }

        if (newFasts.length > 5) {
            newFasts.pop();
        }
        setFasts(newFasts);
        await AsyncStorage.setItem('@fast/fasts', JSON.stringify(newFasts));
    }, [fasts]);

    const clearFasts = async () => {
        setFasts([]);
        await AsyncStorage.removeItem('@fast/fasts');
    };

    const updateScreen = React.useCallback(async () => {
        const finish = await getData('@fast/finishTime');
        console.log('Tempo de acabar time pelo ascyn storage:', new Date(finish).toLocaleTimeString());
        const isActive = await getData('@fast/active');
        console.log('Timer ta ativo?', isActive);
        const alertIsActive = await getData('@fast/alert');
        const haveFasts = await getData('@fast/fasts');
        if (haveFasts) {
            haveFasts.sort((a: IFast, b: IFast) => b.date - a.date);
            setFasts(haveFasts);
        }
        if (alertIsActive) {
            setAlert(true);
        }

        if (finish && isActive === true) {
            const nowMs = new Date().getTime();
            const finishMs = new Date(finish).getTime();
            const timeToFinish = finishMs - nowMs;
            if (timeToFinish > 0) {
                setCronometer(timeToFinish);
                setIsCronometerActive(true);
            } else {
                saveFasts();
                setCronometer(0);
                setFinishTime(0);
                stopTimer();
                await AsyncStorage.setItem('@fast/active', 'false');
            }
        }
    }, []);

    /**
     * Pega o tempo selecionado pelo modal.
     * Esse tempo é quantas horas de jejum (finishTime) em ms.
     * Salva o finishTime no asyncstorage
     */
    const handleConfirmSelectedTime = useCallback(async (milliseconds: number) => {
        console.log('tempo selecionado (ms):', milliseconds);
        setCronometer(milliseconds);
        const now = Date.now();
        const finish = now + milliseconds;
        setFinishTime(finish);
        if (milliseconds <= 0) {
            Alert.alert(t('alert'), t('greather_than_zero'));
        }
        AsyncStorage.setItem('@fast/finishTime', JSON.stringify(milliseconds));
        setDatePickerVisibility(false);
    }, []);

    const handleStartTimer = async () => {
        console.log('time vai acabar em:', new Date(finishTime));

        if (cronometer <= 0) {
            Alert.alert(t('alert'), t('greather_than_zero'));
            return;
        }

        Alert.alert(t('alert'), t('end_time', { time: new Date(finishTime).toLocaleString() }), [
            {
                text: t('cancel'),
                onPress: () => {
                    return;
                },
                style: 'cancel',
            },
            {
                text: t('start_cronometer'),
                onPress: async () => {
                    try {
                        await createNotification(finishTime);
                        setIsCronometerActive(true);
                        await AsyncStorage.setItem('@fast/active', 'true');
                        await AsyncStorage.setItem('@fast/finishTime', JSON.stringify(finishTime));

                        return;
                    } catch (e: any) {
                        Alert.alert('Error', t('error_saving_timer'));
                    }
                },
            },
        ]);
    };

    const stopTimer = React.useCallback(async () => {
        try {
            setIsCronometerActive(false);
            setCronometer(0);
            await AsyncStorage.setItem('@fast/active', 'false');
        } catch (e: any) {
            Alert.alert('Error', t('Fast_error_saving_timer'));
        }
    }, []);

    /**
     * Cancelamento do timer pelo usuário
     * O stop timer é uma função separada pois é usada em outras partes do código.
     */
    const handleStopTimer = async () => {
        if (!isCronometerActive) {
            return;
        }
        Alert.alert(t('alert'), t('cancel_timer'), [
            {
                text: t('no_keep'),
                onPress: () => {
                    return;
                },
                style: 'cancel',
            },
            {
                text: t('yes_cancel'),
                onPress: async () => {
                    stopTimer();
                    // PushNotification.cancelAllLocalNotifications();
                    return;
                },
            },
        ]);
    };

    // const handleSetAlert = useCallback(async () => {
    //     // Se não tem alerta seta como true
    //     if (!alert) {
    //         setAlert(true);
    //         await AsyncStorage.setItem('@fast/alert', 'true');
    //         if (isCronometerActive) {
    //             const finish = await getData('@fast/finishTime');
    //             createNotification(finish, finishTime);
    //         }
    //     }

    //     // Se tem alerta seta como false.
    //     if (alert) {
    //         setAlert(false);
    //         await AsyncStorage.setItem('@fast/alert', 'false');
    //         PushNotification.cancelAllLocalNotifications();
    //     }
    // }, [alert, isCronometerActive]);

    return (
        <Screen>
            <Header>
                <DrawerButton />
            </Header>
            <DurationPicker
                visible={isDatePickerVisible}
                initialHours={Math.floor(cronometer / (1000 * 60 * 60))}
                initialMinutes={Math.floor((cronometer % (1000 * 60 * 60)) / (1000 * 60))}
                onConfirm={handleConfirmSelectedTime}
                onCancel={() => setDatePickerVisibility(false)}
                maxHours={48} // Define o máximo de horas (opcional)
            />
            <VStack style={{ marginBottom: 100 }}>
                <Heading>{t('title')}</Heading>
                <Body>{t('body')}</Body>
            </VStack>
            <VStack spacing={20} style={{ alignItems: 'center', marginBottom: 30 }}>
                <FastImage />
                <Heading style={textStyles.subtitle}>Select Your Fasting Hours</Heading>
            </VStack>
            <FastCronometer
                onPressButton={() => {
                    setAlert(!alert);
                }}
                time={convertMsToTimer(cronometer)}
                onPress={() => setDatePickerVisibility(true)}
                buttonState={alert}
            />
            {isCronometerActive === true ? (
                <Button
                    title={t('stop')}
                    color={Colors.light.gray}
                    textStyle={{ color: Colors.light.white }}
                    onPress={handleStopTimer}
                />
            ) : (
                <Button
                    title={t('start')}
                    color={Colors.light['secondary-500']}
                    textStyle={{ color: Colors.light.black }}
                    iconLeft={({ size }) => <CheckIcon color={Colors.light.white} height={size} width={size} />}
                    onPress={handleStartTimer}
                />
            )}
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default FastScreen;
