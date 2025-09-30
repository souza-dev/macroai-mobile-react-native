import { Colors } from '@constants/Colors';
import { textStyles } from '@styles/textStyles';
import React, { useState } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface SelectProps {
    data: { label: string; value: string }[];
    onChange: (value: string) => void;
    style?: ViewStyle;
}

export const mockData = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

const Select = ({ style, data = mockData, onChange = (item: any) => console.log(item) }: SelectProps) => {
    const [isFocus, setIsFocus] = useState(false);

    return (
        <Dropdown
            data={data}
            onChange={(item) => {
                onChange(item.value);
                setIsFocus(false);
            }}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            style={[styles.dropdown, style]}
            placeholderStyle={[textStyles.button, { color: Colors.light.white }]}
            selectedTextStyle={[textStyles.button, { color: Colors.light.white }]}
            iconStyle={styles.iconStyle}
            maxHeight={500}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
        />
    );
};

export default React.memo(Select);

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        backgroundColor: Colors.light['primary-500'],
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    icon: {
        marginRight: 5,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 25,
        height: 25,
        tintColor: 'white',
    },
});
