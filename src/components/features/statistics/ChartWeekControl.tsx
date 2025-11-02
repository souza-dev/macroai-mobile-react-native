import LeftArrowIcon from '@assets/icons/button-left-arrow.svg';
import RightArrowIcon from '@assets/icons/button-right-arrow.svg';
import Body from '@components/custom-ui/Body';
import Heading from '@components/custom-ui/Heading';
import VStack from '@components/custom-ui/VStack';
import { Colors } from '@constants/Colors';
import { textStyles } from '@styles/textStyles';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface ChartWeekControlProps {
    date: string;
    increase: () => void;
    decrease: () => void;
}

export default function ChartWeekControl({ date, increase, decrease }: ChartWeekControlProps) {
    const iconSize = 21;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={decrease} style={styles.button}>
                <LeftArrowIcon width={iconSize} height={iconSize} color={Colors.light['secondary-500']} />
            </TouchableOpacity>
            <VStack style={styles.dateContainer}>
                <Heading style={textStyles.subtitle}>{date}</Heading>
                <Body style={textStyles.text}>{'Weekly Calories'}</Body>
            </VStack>
            <TouchableOpacity onPress={increase} style={styles.button}>
                <RightArrowIcon width={iconSize} height={iconSize} color={Colors.light['secondary-500']} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: Colors.light.background,
        padding: 10,
        borderRadius: 30,
    },

    dateContainer: {
        flex: 1,
        alignItems: 'center',
    },
    dateText: {
        textAlign: 'center',
        fontFamily: 'Lato-Regular',
        fontWeight: '700',
        color: '#282828',
    },
});
