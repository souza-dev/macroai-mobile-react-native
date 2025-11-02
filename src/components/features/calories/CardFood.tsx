import { Button, ListItem, Skeleton } from '@rneui/themed';
import { Image } from 'expo-image';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import IconExercise from '@assets/icons/add-calories-exercise-icon.svg';
import Body from '@components/custom-ui/Body';
import HStack from '@components/custom-ui/HStack';
import Heading from '@components/custom-ui/Heading';
import VStack from '@components/custom-ui/VStack';
import { Colors } from '@constants/Colors';
import { textStyles } from '@styles/textStyles';

// Hook de cores dos cards
function useCardColors(type?: 'photo' | 'exercise' | 'food' | 'voice' | 'text') {
    switch (type) {
        case 'exercise':
            return {
                background: Colors.light.background,
                text: Colors.light.gray,
            };
        case 'photo':
            return {
                background: Colors.light['secondary-500'],
                text: Colors.light.white,
            };
        default:
            return {
                background: Colors.light['primary-500'],
                text: Colors.light.white,
            };
    }
}

interface CardFoodProps {
    id: string;
    title?: string;
    calories?: string;
    carbs?: string;
    proteins?: string;
    fats?: string;
    timestamp?: number;
    onPressDelete?: (id: string) => void;
    loading?: boolean;
    type?: 'photo' | 'exercise' | 'food' | 'voice' | 'text';
    imageUrl?: string;
}

// -------------------- CardContainer --------------------
const CardContainer: React.FC<{
    id: string;
    type?: 'photo' | 'exercise' | 'food' | 'voice' | 'text';
    isSwiped?: boolean;
    rightContent?: React.ReactNode;
    children: React.ReactNode;
    backgroundColor?: string;
}> = ({ id, type, isSwiped, rightContent, children, backgroundColor }) => {
    const { background } = useCardColors(type);
    return (
        <ListItem.Swipeable
            id={id}
            rightContent={rightContent}
            containerStyle={[styles.container, { backgroundColor: background }, isSwiped && styles.containerSwiped]}
        >
            <ListItem.Content style={styles.content}>{children}</ListItem.Content>
        </ListItem.Swipeable>
    );
};

// -------------------- Card Types --------------------
const CardPhoto: React.FC<{ imageUrl?: string }> = React.memo(({ imageUrl }) => (
    <Image style={styles.image} source={imageUrl} contentFit="cover" transition={1000} />
));

const CardExercise: React.FC = React.memo(() => (
    <View style={styles.iconContainer}>
        <IconExercise color={Colors.light.gray} height={33} width={33} />
    </View>
));

// -------------------- CardFood --------------------
const CardFood: React.FC<CardFoodProps> = ({
    id,
    title,
    calories,
    carbs,
    proteins,
    fats,
    timestamp,
    onPressDelete,
    loading = true,
    type = 'food',
    imageUrl,
}) => {
    const { t } = useTranslation('calories');
    const [isSwiped, setIsSwiped] = useState(false);
    const { text, background } = useCardColors(type);

    // Botão de delete
    const renderRightContent = useCallback(
        () => (
            <Button
                title="Delete"
                onPress={() => onPressDelete?.(id)}
                icon={{ name: 'delete', color: 'white' }}
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttonContainerStyle}
            />
        ),
        [id, onPressDelete]
    );

    // Hora formatada
    const formattedTime = useMemo(() => {
        if (!timestamp) return null;
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }, [timestamp]);

    // Skeleton widths
    const skeletonWidths = useMemo(() => [80, 70, 50, 30, 20], []);

    // Descrição
    const description = useMemo(() => {
        if (loading) return null;
        return type === 'exercise'
            ? `You burned ${calories ?? '0'} cal today through exercise`
            : `${calories ?? '0'} cal / ${carbs ?? '0'} carbs / ${proteins ?? '0'} proteins / ${fats ?? '0'} fats`;
    }, [loading, type, calories, carbs, proteins, fats]);

    return (
        <CardContainer id={id} type={type} isSwiped={isSwiped} rightContent={renderRightContent()}>
            {/* Icon ou imagem */}
            {type === 'photo' && <CardPhoto imageUrl={imageUrl} />}
            {type === 'exercise' && <CardExercise />}

            {/* Conteúdo do card */}
            <VStack style={styles.label}>
                <Heading style={textStyles.subtitle} color={text}>
                    {loading ? 'Analyzing...' : title}
                </Heading>
                {loading ? (
                    <HStack spacing={5}>
                        {skeletonWidths.map((w) => (
                            <Skeleton key={w} animation="pulse" width={w} height={10} style={styles.skeleton} />
                        ))}
                    </HStack>
                ) : (
                    <Body style={textStyles.text} color={text}>
                        {description}
                    </Body>
                )}
            </VStack>

            {/* Hora */}
            {formattedTime && (
                <VStack spacing={15} style={styles.delete}>
                    <Body style={textStyles.text} color={text}>
                        {formattedTime}
                    </Body>
                </VStack>
            )}
        </CardContainer>
    );
};

export default React.memo(CardFood);

// -------------------- Styles --------------------
const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
        borderRadius: 10,
    },
    containerSwiped: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    content: {
        flexDirection: 'row',
        gap: 10,
        height: 91,
    },
    image: {
        height: '100%',
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: '#0553',
    },
    iconContainer: {
        height: '100%',
        justifyContent: 'center',
    },
    buttonStyle: {
        minHeight: '100%',
        backgroundColor: 'red',
    },
    buttonContainerStyle: {
        marginVertical: 5,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    label: {
        flex: 2,
    },
    delete: {
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    skeleton: {
        borderRadius: 10,
        backgroundColor: Colors.light['primary-400'],
    },
});
