import IconCheck from '@assets/icons/account-check.svg';
import Body from '@components/custom-ui/Body';
import Button from '@components/custom-ui/Button';
import ButtonGroup from '@components/custom-ui/ButtonGroup';
import DrawerButton from '@components/custom-ui/DrawerButton';
import Header from '@components/custom-ui/Header';
import Heading from '@components/custom-ui/Heading';
import HStack from '@components/custom-ui/HStack';
import Screen from '@components/custom-ui/Screen';
import Select, { mockdata } from '@components/custom-ui/Select';
import VStack from '@components/custom-ui/VStack';
import { Colors } from '@constants/Colors';
import { textStyles } from '@styles/textStyles';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function AccountScreen() {
    const router = useRouter();
    const [selected, setSelected] = React.useState<'metric' | 'imperial'>('metric');

    return (
        <Screen>
            <Header>
                <DrawerButton />
            </Header>
            <ScrollView style={styles.flex}>
                <VStack spacing={20}>
                    <Heading>Account</Heading>
                    <Body>Our AI will help you set up your daily macro requirements.</Body>
                    <ButtonGroup direction="row" isAttached style={{ marginBottom: 20 }}>
                        <Button
                            title="Metric"
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
                            title="Imperial"
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
                            <Heading style={textStyles.subtitle}>Choose your Diet</Heading>
                        </View>
                        <Select style={{ width: '45%' }} data={mockdata} onChange={(item) => console.log(item)} />
                    </HStack>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>Your goal is to</Heading>
                        </View>
                        <Select style={{ width: '45%' }} data={mockdata} />
                    </HStack>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>Your Age</Heading>
                        </View>
                        <Select style={{ width: '45%' }} data={mockdata} />
                    </HStack>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>Your Height</Heading>
                        </View>
                        <Select style={{ width: '45%' }} data={mockdata} />
                    </HStack>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>Your Weight</Heading>
                        </View>
                        <Select style={{ width: '45%' }} data={mockdata} />
                    </HStack>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>Your Gender</Heading>
                        </View>
                        <Select style={{ width: '45%' }} data={mockdata} />
                    </HStack>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>Daily workout hours</Heading>
                        </View>
                        <Select style={{ width: '45%' }} data={mockdata} onChange={(item) => console.log(item)} />
                    </HStack>
                    <Button
                        onPress={() => router.navigate('/(tabs)/account/macro')}
                        title="Let’s begin!"
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
