import FitnessPlanIcon from '@assets/icons/chat-fitnessplan.svg';
import MacroSetupIcon from '@assets/icons/chat-macrossetup.svg';
import NutritionIcon from '@assets/icons/chat-nutrition.svg';
import RecipesIcon from '@assets/icons/chat-recipes.svg';
import Body from '@components/custom-ui/Body';
import Button from '@components/custom-ui/Button';
import ButtonGroup from '@components/custom-ui/ButtonGroup';
import DrawerButton from '@components/custom-ui/DrawerButton';
import Header from '@components/custom-ui/Header';
import Heading from '@components/custom-ui/Heading';
import Screen from '@components/custom-ui/Screen';
import VStack from '@components/custom-ui/VStack';
import { Colors } from '@constants/Colors';
import { textStyles } from '@styles/textStyles';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

const ChatAiScreen = () => {
    const router = useRouter();
    return (
        <Screen>
            <Header>
                <DrawerButton />
            </Header>
            <VStack style={{ marginBottom: 100 }}>
                <Heading>{'Chat AI'}</Heading>
                <Body>
                    {
                        'Discover the world of culinary arts, nutritional knowledge, and fitness expertise with our AI, expertly trained and powered by ChatGPT technology.'
                    }
                </Body>
            </VStack>
            <Heading style={textStyles.subtitle}>{'Select from one of the following options to begin'}</Heading>
            <ButtonGroup style={{ marginTop: 10 }}>
                <Button
                    style={styles.button}
                    title="Recipes for Meals and Snacks"
                    onPress={() => router.navigate('/chatai/recipes')}
                    height={166}
                    textStyle={[textStyles.text, { color: Colors.light.black }]}
                    iconLeft={({ color }) => <RecipesIcon height={36} width={36} color={color} />}
                />
                <Button
                    style={styles.button}
                    title="Fitness Plans and Workout Routines"
                    onPress={() => router.navigate('/chatai/fitness')}
                    height={166}
                    textStyle={[textStyles.text, { color: Colors.light.black }]}
                    iconLeft={({ color }) => <FitnessPlanIcon height={36} width={36} color={color} />}
                />
                <Button
                    style={styles.button}
                    title="General Information about Nutrition"
                    onPress={() => router.navigate('/chatai/nutrition')}
                    height={166}
                    textStyle={[textStyles.text, { color: Colors.light.black }]}
                    iconLeft={({ color }) => <NutritionIcon height={36} width={36} color={color} />}
                />
                <Button
                    style={styles.button}
                    title="Macros Setup Help"
                    onPress={() => router.navigate('/chatai/macros')}
                    height={166}
                    textStyle={[textStyles.text, { color: Colors.light.black }]}
                    iconLeft={({ color }) => <MacroSetupIcon height={36} width={36} color={color} />}
                />
            </ButtonGroup>
        </Screen>
    );
};

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    button: {
        height: 66,
        backgroundColor: Colors.light['primary-400'],
        justifyContent: 'flex-start',
        paddingHorizontal: 30,
    },
});

export default ChatAiScreen;
