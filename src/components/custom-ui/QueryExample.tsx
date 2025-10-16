import BalloonIcon from '@assets/icons/chat-balloon.svg';
import { Colors } from '@constants/Colors';
import { textStyles } from '@styles/textStyles';
import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import VStack from './VStack';

type QueryExampleProps = {
    children: string;
    color?: string;
    textProps?: TextProps;
};

const QueryExample: React.FC<QueryExampleProps> = ({ children, color = Colors.light.black, textProps }) => {
    return (
        <VStack style={styles.container} spacing={11}>
            <BalloonIcon width={23} height={23} color={'black'} />
            <Text style={[textStyles.mini, styles.text]} {...textProps}>
                {children}
            </Text>
        </VStack>
    );
};

export default React.memo(QueryExample);

const styles = StyleSheet.create({
    container: {
        width: 156,
        backgroundColor: Colors.light['primary-400'],
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
    },
    text: { textAlign: 'center' },
});
