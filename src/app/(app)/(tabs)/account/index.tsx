import IconCheck from '@assets/icons/account-check.svg';
import Body from '@components/custom-ui/Body';
import Button from '@components/custom-ui/Button';
import ButtonGroup from '@components/custom-ui/ButtonGroup';
import DrawerButton from '@components/custom-ui/DrawerButton';
import Header from '@components/custom-ui/Header';
import Heading from '@components/custom-ui/Heading';
import HStack from '@components/custom-ui/HStack';
import Screen from '@components/custom-ui/Screen';
import Select from '@components/custom-ui/Select';
import VStack from '@components/custom-ui/VStack';
import { Colors } from '@constants/Colors';
import {
    ageData,
    dailyWorkoutData,
    dietData,
    genderData,
    goalData,
    heightImperialData,
    heightMetricData,
    weightImperialData,
    weightMetricData,
} from '@constants/dropdowndata';
import { textStyles } from '@styles/textStyles';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function AccountScreen() {
    const { t } = useTranslation(['account', 'dropdown']);
    const router = useRouter();
    const [selected, setSelected] = React.useState<'metric' | 'imperial'>('metric');

    return (
        <Screen>
            <Header>
                <DrawerButton />
            </Header>
            <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>
                <VStack spacing={20}>
                    <Heading>{t('title')}</Heading>
                    <Body>{t('body')}</Body>
                    <ButtonGroup direction="row" isAttached style={{ marginBottom: 20 }}>
                        <Button
                            title={t('metric')}
                            color={selected === 'metric' ? Colors.light['primary-500'] : Colors.light.background}
                            textStyle={{ color: selected === 'metric' ? Colors.light.white : Colors.light.gray }}
                            onPress={() => setSelected('metric')}
                            height={44}
                            iconRight={({ color }) => (
                                <IconCheck
                                    color={selected === 'metric' ? color : Colors.light.background}
                                    width={16}
                                    height={16}
                                />
                            )}
                            style={{ paddingLeft: 16 }}
                        />
                        <Button
                            title={t('imperial')}
                            color={selected === 'imperial' ? Colors.light['primary-500'] : Colors.light.background}
                            textStyle={{ color: selected === 'imperial' ? Colors.light.white : Colors.light.gray }}
                            onPress={() => setSelected('imperial')}
                            height={44}
                            iconRight={({ color }) => (
                                <IconCheck
                                    color={selected === 'imperial' ? color : Colors.light.background}
                                    width={16}
                                    height={16}
                                />
                            )}
                            style={{ paddingLeft: 16 }}
                        />
                    </ButtonGroup>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>{t('choose_diet')}</Heading>
                        </View>
                        <Select style={{ width: '45%' }} data={dietData} onChange={(item) => console.log(item)} />
                    </HStack>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>{t('choose_goal')}</Heading>
                        </View>
                        <Select style={{ width: '45%' }} data={goalData} onChange={(item) => console.log(item)} />
                    </HStack>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>{t('choose_age')}</Heading>
                        </View>
                        <Select style={{ width: '45%' }} data={ageData} onChange={(item) => console.log(item)} />
                    </HStack>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>{t('choose_height')}</Heading>
                        </View>
                        <Select
                            style={{ width: '45%' }}
                            data={selected === 'metric' ? heightMetricData : heightImperialData}
                            onChange={(item) => console.log(item)}
                        />
                    </HStack>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>{t('choose_weight')}</Heading>
                        </View>
                        <Select
                            style={{ width: '45%' }}
                            data={selected === 'metric' ? weightMetricData : weightImperialData}
                            onChange={(item) => console.log(item)}
                        />
                    </HStack>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>{t('choose_gender')}</Heading>
                        </View>
                        <Select style={{ width: '45%' }} data={genderData} onChange={(item) => console.log(item)} />
                    </HStack>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>{t('choose_workout')}</Heading>
                        </View>
                        <Select
                            style={{ width: '45%' }}
                            data={dailyWorkoutData}
                            onChange={(item) => console.log(item)}
                        />
                    </HStack>
                    <Button
                        onPress={() => router.navigate('/account/macro')}
                        title={t('button')}
                        color={Colors.light['secondary-500']}
                        textStyle={{ color: Colors.light.black }}
                    />
                </VStack>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
});
