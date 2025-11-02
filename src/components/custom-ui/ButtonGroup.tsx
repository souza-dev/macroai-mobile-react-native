import HStack from '@components/custom-ui/HStack';
import VStack from '@components/custom-ui/VStack';
import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

interface ButtonGroupProps {
    children: ReactNode;
    isAttached?: boolean;
    direction?: 'column' | 'row';
    style?: StyleProp<ViewStyle>;
}

export default function ButtonGroup({ direction = 'column', children, style, isAttached = false }: ButtonGroupProps) {
    const childArray = React.Children.toArray(children);

    const enhancedChildren = childArray.map((child, index) => {
        if (!React.isValidElement(child)) return child;

        const element = child as React.ReactElement<{ style?: StyleProp<ViewStyle> }>;

        const borderRadiusStyle: ViewStyle = {};
        const isFirst = index === 0;
        const isLast = index === childArray.length - 1;

        if (isAttached) {
            if (direction === 'column') {
                if (isFirst) {
                    // só zera o bottom
                    borderRadiusStyle.borderBottomLeftRadius = 0;
                    borderRadiusStyle.borderBottomRightRadius = 0;
                } else if (isLast) {
                    // só zera o top
                    borderRadiusStyle.borderTopLeftRadius = 0;
                    borderRadiusStyle.borderTopRightRadius = 0;
                } else {
                    // meio: zera todos
                    borderRadiusStyle.borderTopLeftRadius = 0;
                    borderRadiusStyle.borderTopRightRadius = 0;
                    borderRadiusStyle.borderBottomLeftRadius = 0;
                    borderRadiusStyle.borderBottomRightRadius = 0;
                }
            } else {
                // row
                if (isFirst) {
                    // só zera o right
                    borderRadiusStyle.borderTopRightRadius = 0;
                    borderRadiusStyle.borderBottomRightRadius = 0;
                } else if (isLast) {
                    // só zera o left
                    borderRadiusStyle.borderTopLeftRadius = 0;
                    borderRadiusStyle.borderBottomLeftRadius = 0;
                } else {
                    // meio: zera todos
                    borderRadiusStyle.borderTopRightRadius = 0;
                    borderRadiusStyle.borderBottomRightRadius = 0;
                    borderRadiusStyle.borderTopLeftRadius = 0;
                    borderRadiusStyle.borderBottomLeftRadius = 0;
                }
            }
        }

        return React.cloneElement(element, {
            style: [direction === 'row' ? { flex: 1 } : undefined, borderRadiusStyle, element.props.style],
        });
    });

    return direction === 'row' ? (
        <HStack spacing={isAttached ? 0 : 10} style={style}>
            {enhancedChildren}
        </HStack>
    ) : (
        <VStack spacing={isAttached ? 0 : 10} style={style}>
            {enhancedChildren}
        </VStack>
    );
}
