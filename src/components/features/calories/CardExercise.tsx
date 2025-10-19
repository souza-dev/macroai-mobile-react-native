import DeleteIcon from '@assets/icons/food-card-delete.svg';
import { Colors } from '@constants/Colors';
import { textStyles } from '@styles/textStyles';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Body from '../../custom-ui/Body';
import Heading from '../../custom-ui/Heading';
import HStack from '../../custom-ui/HStack';
import VStack from '../../custom-ui/VStack';

interface CardExerciseProps {
    id?: string | null;
    title: string;
    calories: string;
    onPressDelete: (id: string) => void;
}

const CardExercise = ({ id, title, calories, onPressDelete }: CardExerciseProps) => {
    return (
        <HStack style={styles.container} spacing={5}>
            <VStack spacing={15} style={styles.label}>
                <Heading style={textStyles.subtitle} color={Colors.light.red}>
                    {'Exercise'}
                </Heading>
                <Body style={textStyles.text} color={Colors.light.red}>
                    {`You burned ${calories} cal today through exercise`}
                </Body>
            </VStack>
            <VStack spacing={15} style={styles.delete}>
                <TouchableOpacity onPress={() => onPressDelete(id as string)}>
                    <DeleteIcon height={26} width={26} color={Colors.light.red} />
                </TouchableOpacity>
            </VStack>
        </HStack>
    );
};

export default React.memo(CardExercise);

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.white,
        borderWidth: 1,
        borderColor: Colors.light.red,
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
