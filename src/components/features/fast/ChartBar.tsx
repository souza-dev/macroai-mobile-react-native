import { Colors } from '@constants/Colors';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface ChartBarProps {
    value: number;
    maxValue: number;
    style?: ViewStyle;
}

export default function ChartBar({ value, maxValue, style }: ChartBarProps) {
    const barHeight = maxValue > 0 ? Math.min((value / maxValue) * 100, 100) : 0;
    const barColor = value >= maxValue ? Colors.light['error'] : Colors.light['primary-400'];
    return (
        <View style={[styles.barContainer, style]}>
            <View style={[styles.barMax]}>
                <View style={[styles.bar, { height: `${barHeight}%`, backgroundColor: barColor }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    barContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 30,
    },
    barMax: {
        width: '100%',
        height: 100,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
    },
    bar: {
        width: '100%',
        backgroundColor: Colors.light['primary-400'],
        borderRadius: 5,
    },
});
