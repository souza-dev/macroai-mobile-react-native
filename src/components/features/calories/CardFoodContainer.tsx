import { Colors } from '@constants/Colors';
import { ListItem } from '@rneui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';

interface CardFoodContainerProps {
    id: string;
    type?: string;
    isSwiped?: boolean;
    rightContent?: React.ReactNode;
    children: React.ReactNode;
}

const CardFoodContainer: React.FC<CardFoodContainerProps> = ({ id, type, isSwiped, rightContent, children }) => {
    const containerStyle = [
        styles.container,
        { backgroundColor: type === 'photo' ? Colors.light['secondary-500'] : Colors.light['primary-500'] },
        isSwiped && styles.containerSwiped,
    ];

    return (
        <ListItem.Swipeable id={id} rightContent={rightContent} containerStyle={containerStyle}>
            <ListItem.Content style={styles.content}>{children}</ListItem.Content>
        </ListItem.Swipeable>
    );
};

export default React.memo(CardFoodContainer);

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    containerSwiped: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    content: {
        flexDirection: 'row',
        gap: 10, // ou use HStack / marginRight
    },
});
