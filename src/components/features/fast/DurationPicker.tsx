import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DurationPickerProps {
    visible: boolean;
    initialHours?: number;
    initialMinutes?: number;
    onConfirm: (milliseconds: number) => void;
    onCancel: () => void;
    maxHours?: number;
}

const DurationPicker: React.FC<DurationPickerProps> = ({
    visible,
    initialHours = 0,
    initialMinutes = 0,
    onConfirm,
    onCancel,
    maxHours = 48,
}) => {
    const [selectedHours, setSelectedHours] = useState(initialHours);
    const [selectedMinutes, setSelectedMinutes] = useState(initialMinutes);

    const hours = Array.from({ length: maxHours + 1 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    const handleConfirm = () => {
        const milliseconds = selectedHours * 60 * 60 * 1000 + selectedMinutes * 60 * 1000;
        onConfirm(milliseconds);
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Select Duration</Text>
                    </View>

                    <View style={styles.pickerContainer}>
                        <View style={styles.pickerWrapper}>
                            <Text style={styles.label}>Hours</Text>
                            <Picker
                                selectedValue={selectedHours}
                                onValueChange={(value) => setSelectedHours(value)}
                                style={styles.picker}
                                itemStyle={styles.pickerItem}
                            >
                                {hours.map((hour) => (
                                    <Picker.Item key={hour} label={hour.toString()} value={hour} />
                                ))}
                            </Picker>
                        </View>

                        <View style={styles.pickerWrapper}>
                            <Text style={styles.label}>Minutes</Text>
                            <Picker
                                selectedValue={selectedMinutes}
                                onValueChange={(value) => setSelectedMinutes(value)}
                                style={styles.picker}
                                itemStyle={styles.pickerItem}
                            >
                                {minutes.map((minute) => (
                                    <Picker.Item
                                        key={minute}
                                        label={minute.toString().padStart(2, '0')}
                                        value={minute}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirm}>
                            <Text style={styles.confirmButtonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20,
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
    },
    pickerWrapper: {
        alignItems: 'center',
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    picker: {
        width: 120,
        height: 150,
    },
    pickerItem: {
        height: 150,
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    confirmButton: {
        backgroundColor: '#007AFF',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});

export default DurationPicker;
