import { Colors } from '@constants/Colors';
import { textStyles } from '@styles/textStyles';
import { StyleSheet, Text, View } from 'react-native';
import ChartBar from './ChartBar';

interface WeeklyChartProps {
    data: {
        mon: number;
        tue: number;
        wed: number;
        thu: number;
        fri: number;
        sat: number;
        sun: number;
    };
    maxValue?: number;
}

export default function WeeklyChart({ data, maxValue }: WeeklyChartProps) {
    const weekDays = [
        { label: 'Sun', value: data.sun },
        { label: 'Mon', value: data.mon },
        { label: 'Tue', value: data.tue },
        { label: 'Wed', value: data.wed },
        { label: 'Thu', value: data.thu },
        { label: 'Fri', value: data.fri },
        { label: 'Sat', value: data.sat },
    ];

    // Se maxValue não for informado, definimos dinamicamente como o maior valor da semana
    const dynamicMaxValue = maxValue ?? Math.max(...weekDays.map((day) => day.value));

    return (
        <View style={styles.chartContainer}>
            {weekDays.map((day, index) => (
                <View key={index} style={styles.dayWrapper}>
                    <Text style={[textStyles.button, styles.label]}>{day.label}</Text>
                    <ChartBar value={day.value} maxValue={dynamicMaxValue} />
                    <Text style={[textStyles.text, styles.valueLabel]}>{day.value}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 150,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    dayWrapper: {
        alignItems: 'center',
        gap: 2,
    },
    label: {
        color: Colors.light.black,
    },
    valueLabel: {
        color: Colors.light.black,
    },
});
