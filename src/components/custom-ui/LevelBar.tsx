import { Colors } from '@constants/Colors';
import React from 'react';
import { DimensionValue, StyleSheet, View } from 'react-native';

type LevelBarProps = {
    value: number;
    max: number;
    height?: number;
    backgroundColor?: string;
    fillColor?: string;
};

const LevelBar: React.FC<LevelBarProps> = ({
    value,
    max,
    height = 10,
    backgroundColor = Colors.light.background,
    fillColor = Colors.light['primary-500'],
}) => {
    const fillWidth = `${Math.min(Math.max(value / max, 0), 1) * 100}%` as DimensionValue;

    return (
        <View style={[styles.background, { height, backgroundColor, borderRadius: height / 2 }]}>
            <View
                style={{
                    width: fillWidth,
                    height: '100%',
                    backgroundColor: fillColor,
                    borderRadius: height / 2,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        overflow: 'hidden',
    },
});

export default React.memo(LevelBar);
