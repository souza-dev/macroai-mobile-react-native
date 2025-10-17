import Heading from '@components/custom-ui/Heading';
import HStack from '@components/custom-ui/HStack';
import { Colors } from '@constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { textStyles } from '@styles/textStyles';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type InfoHeaderProps = {
    title: string;
    onPress?: () => void;
};

const InfoHeader: React.FC<InfoHeaderProps> = ({ title, onPress }) => {
    return (
        <HStack style={styles.container} spacing={10}>
            <Heading style={[textStyles.subtitle, styles.text]} color={Colors.light['primary-500']}>
                {title}
            </Heading>
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                <Ionicons name="information-circle-outline" size={20} color={Colors.light['primary-500']} />
            </TouchableOpacity>
        </HStack>
    );
};

export default InfoHeader;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexWrap: 'nowrap',
    },
    text: {
        flexShrink: 1,
        flex: 1,
        marginRight: 6,
    },
});
