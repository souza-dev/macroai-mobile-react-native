import CaloriesIcon from '@assets/icons/macro-calories.svg';
import CarbsIcon from '@assets/icons/macro-carbs.svg';
import FatsIcon from '@assets/icons/macro-fats.svg';
import PenIcon from '@assets/icons/macro-pen.svg';

import ProteinIcon from '@assets/icons/macro-protein.svg';
import Body from '@components/custom-ui/Body';
import Button from '@components/custom-ui/Button';
import Heading from '@components/custom-ui/Heading';
import HStack from '@components/custom-ui/HStack';
import Input from '@components/custom-ui/Input';
import Screen from '@components/custom-ui/Screen';
import VStack from '@components/custom-ui/VStack';
import { Colors } from '@constants/Colors';
import { useSession } from '@contexts/authContext';
import { getAuth, signOut as signOutFB } from '@react-native-firebase/auth';
import { textStyles } from '@styles/textStyles';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MacroEditScreen() {
    const { signOut } = useSession();
    const insets = useSafeAreaInsets();
    const currentUser = getAuth().currentUser;

    return (
        <Screen style={{ paddingTop: insets.top }}>
            <VStack spacing={20}>
                <VStack spacing={10} style={{ alignItems: 'center' }}>
                    <Image style={styles.avatar} source={currentUser?.photoURL} contentFit="cover" transition={1000} />
                    <Heading style={textStyles.subtitle}>{currentUser?.displayName}</Heading>
                </VStack>

                <Body center style={textStyles.button} color={Colors.light['primary-500']}>
                    Your macros have been calculated by the AI.
                </Body>
                <HStack style={styles.panel}>
                    <VStack style={{ width: '75%', padding: 10 }}>
                        <Body style={[textStyles.text, { color: Colors.light.white }]}>
                            Calories꞉ 2429 - Protein꞉ 121 grams Carbs꞉ 30 grams - Fats꞉ 202
                        </Body>
                    </VStack>
                    <Image
                        style={styles.image}
                        source={require('@assets/images/macro-robot.png')}
                        contentFit="cover"
                        transition={1000}
                    />
                </HStack>
                <VStack spacing={16} style={styles.editpanel}>
                    <HStack spacing={10} style={styles.editRow}>
                        <HStack spacing={10} style={styles.editLabel}>
                            <CaloriesIcon width={26} height={26} color={Colors.light.black} />
                            <Heading style={textStyles.subtitle} color={Colors.light.black}>
                                Calories
                            </Heading>
                        </HStack>
                        <Input
                            placeholder="000"
                            iconLeft={() => <PenIcon width={20} color={Colors.light.gray} height={20} />}
                            containerStyle={styles.flex}
                        />
                    </HStack>
                    <HStack spacing={10} style={styles.editRow}>
                        <HStack spacing={10} style={styles.editLabel}>
                            <ProteinIcon width={26} height={26} color={Colors.light.black} />
                            <Heading style={textStyles.subtitle} color={Colors.light.black}>
                                Protein
                            </Heading>
                        </HStack>
                        <Input
                            placeholder="000"
                            iconLeft={() => <PenIcon width={20} color={Colors.light.gray} height={20} />}
                            containerStyle={styles.flex}
                        />
                    </HStack>
                    <HStack spacing={10} style={styles.editRow}>
                        <HStack spacing={10} style={styles.editLabel}>
                            <CarbsIcon width={26} height={26} color={Colors.light.black} />
                            <Heading style={textStyles.subtitle} color={Colors.light.black}>
                                Carbs
                            </Heading>
                        </HStack>
                        <Input
                            placeholder="000"
                            iconLeft={() => <PenIcon width={20} color={Colors.light.gray} height={20} />}
                            containerStyle={styles.flex}
                        />
                    </HStack>
                    <HStack spacing={10} style={styles.editRow}>
                        <HStack spacing={10} style={styles.editLabel}>
                            <FatsIcon width={26} height={26} color={Colors.light.black} />
                            <Heading style={textStyles.subtitle} color={Colors.light.black}>
                                Fats
                            </Heading>
                        </HStack>
                        <Input
                            placeholder="000"
                            iconLeft={() => <PenIcon width={20} color={Colors.light.gray} height={20} />}
                            containerStyle={styles.flex}
                        />
                    </HStack>
                </VStack>
                <Button
                    onPress={async () => {
                        signOut();
                        await signOutFB(getAuth());
                    }}
                    title="Save Results"
                    color={Colors.light['secondary-500']}
                    textStyle={{ color: Colors.light.black }}
                />
            </VStack>
        </Screen>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    avatar: {
        width: 108,
        height: 108,
        borderRadius: 100,
        backgroundColor: '#0553',
    },
    image: {
        width: 70,
        height: 70,
        backgroundColor: 'transparent',
        transform: [{ scaleX: -1 }],
    },
    panel: {
        backgroundColor: Colors.light['primary-500'],
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingVertical: 10,
    },
    editpanel: {
        backgroundColor: Colors.light.background,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    editRow: {
        justifyContent: 'flex-end',
    },
    editLabel: {
        justifyContent: 'center',
        flex: 1,
    },
});
