import { textStyles } from '@styles/textStyles';
import React, { ComponentProps } from 'react';
import { Text, TextStyle } from 'react-native';

interface CustomHeadingProps extends ComponentProps<typeof Text> {
    children: React.ReactNode;
    center?: boolean;
    color?: string;
}

function Heading({ children, center = false, color = 'black', style, ...props }: CustomHeadingProps) {
    const additionalStyles: TextStyle = {
        textAlign: center ? 'center' : 'left',
        color,
    };

    return (
        <Text style={[textStyles.title, additionalStyles, style]} {...props}>
            {children}
        </Text>
    );
}

export default React.memo(Heading);
