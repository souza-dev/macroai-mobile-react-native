import DeleteIcon from '@assets/icons/food-card-delete.svg';
import { Colors } from '@constants/Colors';
import { textStyles } from '@styles/textStyles';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Body from '../../custom-ui/Body';
import Heading from '../../custom-ui/Heading';
import HStack from '../../custom-ui/HStack';
import VStack from '../../custom-ui/VStack';

interface CardFoodProps {
    id: string;
    title: string;
    calories: string;
    carbs: string;
    proteins: string;
    fats: string;
    onPressDelete: (id: string) => void;
}

const CardFood = ({ id, title, calories, carbs, proteins, fats, onPressDelete }: CardFoodProps) => {
    return (
        <HStack style={styles.container} spacing={5}>
            <VStack spacing={15} style={styles.label}>
                <Heading style={textStyles.subtitle} color={Colors.light.white}>
                    {title}
                </Heading>
                <Body style={textStyles.text} color={Colors.light.white}>
                    {`${calories} calories / ${carbs} carbs / ${proteins} proteins / ${fats} fats`}
                </Body>
            </VStack>
            <VStack spacing={15} style={styles.delete}>
                <TouchableOpacity onPress={() => onPressDelete(id)}>
                    <DeleteIcon height={26} width={26} color={Colors.light['primary-400']} />
                </TouchableOpacity>
            </VStack>
        </HStack>
    );
};

export default React.memo(CardFood);

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light['primary-500'],
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        flexWrap: 'nowrap',
        marginVertical: 5,
    },
    label: {
        flex: 2,
    },
    delete: {
        alignItems: 'center',
        alignSelf: 'stretch',
    },
});
