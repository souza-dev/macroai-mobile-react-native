import RightIcon from '@assets/icons/button-right-chevron.svg';
import FitnessPlanIcon from '@assets/icons/chat-fitnessplan.svg';
import MacroSetupIcon from '@assets/icons/chat-macrossetup.svg';
import NutritionIcon from '@assets/icons/chat-nutrition.svg';
import RecipesIcon from '@assets/icons/chat-recipes.svg';
import AllNotesIcon from '@assets/icons/notes-allnotes.svg';
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
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

export default function NotesScreen({ navigation }: any) {
    const { t } = useTranslation('notes');
    const router = useRouter();
    const ICON_SIZE = 33;
    const RIGHT_ICON_SIZE = 12;

    return (
        <Screen>
            <Header>
                <DrawerButton />
            </Header>
            <VStack spacing={10}>
                <Heading>{t('title')}</Heading>
                <Body style={textStyles.text}>{t('body')}</Body>

                <ButtonGroup style={{ marginTop: 10 }}>
                    <Button
                        style={styles.button}
                        title={t('button_recipes')}
                        onPress={() => router.navigate('/notes/list/recipes')}
                        height={66}
                        textStyle={[textStyles.text, styles.text]}
                        iconLeft={({ color }) => <RecipesIcon height={ICON_SIZE} width={ICON_SIZE} color={color} />}
                        iconRight={({ color }) => (
                            <RightIcon height={RIGHT_ICON_SIZE} width={RIGHT_ICON_SIZE} color={color} />
                        )}
                    />
                    <Button
                        style={styles.button}
                        title={t('button_exercise')}
                        onPress={() => router.navigate('/notes/list/fitness')}
                        height={66}
                        textStyle={[textStyles.text, styles.text]}
                        iconLeft={({ color }) => <FitnessPlanIcon height={ICON_SIZE} width={ICON_SIZE} color={color} />}
                        iconRight={({ color }) => (
                            <RightIcon height={RIGHT_ICON_SIZE} width={RIGHT_ICON_SIZE} color={color} />
                        )}
                    />
                    <Button
                        style={styles.button}
                        title={t('button_info')}
                        onPress={() => router.navigate('/notes/list/nutrition')}
                        height={66}
                        textStyle={[textStyles.text, styles.text]}
                        iconLeft={({ color }) => <NutritionIcon height={ICON_SIZE} width={ICON_SIZE} color={color} />}
                        iconRight={({ color }) => (
                            <RightIcon height={RIGHT_ICON_SIZE} width={RIGHT_ICON_SIZE} color={color} />
                        )}
                    />
                    <Button
                        style={styles.button}
                        title={t('button_macros')}
                        onPress={() => router.navigate('/notes/list/macros')}
                        height={66}
                        textStyle={[textStyles.text, styles.text]}
                        iconLeft={({ color }) => <MacroSetupIcon height={ICON_SIZE} width={ICON_SIZE} color={color} />}
                        iconRight={({ color }) => (
                            <RightIcon height={RIGHT_ICON_SIZE} width={RIGHT_ICON_SIZE} color={color} />
                        )}
                    />
                    <Button
                        style={styles.button}
                        title={t('button_all_notes')}
                        onPress={() => router.navigate('/notes/list/all')}
                        height={66}
                        textStyle={[textStyles.text, styles.text]}
                        iconLeft={({ color }) => <AllNotesIcon height={ICON_SIZE} width={ICON_SIZE} color={color} />}
                        iconRight={({ color }) => (
                            <RightIcon height={RIGHT_ICON_SIZE} width={RIGHT_ICON_SIZE} color={color} />
                        )}
                    />
                </ButtonGroup>
            </VStack>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {},
    text: {
        flex: 1,
        color: Colors.light.black,
    },
    button: {
        backgroundColor: Colors.light['primary-400'],
        justifyContent: 'flex-start',
        paddingHorizontal: 30,
    },
});
