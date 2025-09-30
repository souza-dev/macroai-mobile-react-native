import { textStyles } from '@styles/textStyles';
import React, { ComponentProps } from 'react';
import { Text, TextStyle } from 'react-native';

type TextProps = ComponentProps<typeof Text>;

interface CustomTextProps extends TextProps {
    children: React.ReactNode;
    center?: boolean;
    color?: string;
    bold?: boolean;
    italic?: boolean;
    size?: number;
}

function Body({
    children,
    center = false,
    color = 'black',
    bold = false,
    italic = false,
    size = 14,
    style,
    ...props
}: CustomTextProps) {
    // Define a família da fonte com base nas props
    let fontFamily = 'InterRegular';
    if (bold && italic) {
        fontFamily = 'InterBoldItalic';
    } else if (bold) {
        fontFamily = 'InterBold';
    } else if (italic) {
        fontFamily = 'InterItalic';
    }

    const additionalStyles: TextStyle = {
        textAlign: center ? 'center' : 'left',
        color,
        fontSize: size ?? 14,
        fontFamily,
    };

    return (
        <Text style={[textStyles.body, additionalStyles, style]} {...props}>
            {children}
        </Text>
    );
}

export default React.memo(Body);
