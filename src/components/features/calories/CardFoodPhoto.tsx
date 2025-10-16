import DeleteIcon from '@assets/icons/food-card-delete.svg';
import { Colors } from '@constants/Colors';
import { textStyles } from '@styles/textStyles';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Body from '../custom-ui/Body';
import Heading from '../custom-ui/Heading';
import HStack from '../custom-ui/HStack';
import VStack from '../custom-ui/VStack';

const CardFoodPhoto = () => {
    return (
        <HStack style={styles.container} spacing={5}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../../__mocks__/images/card-food-photo.png')}
                    contentFit="cover"
                    transition={1000}
                />
            </View>
            <VStack spacing={10} style={styles.label}>
                <Heading style={textStyles.subtitle} color={Colors.light.black}>
                    {'1 plate of meatballs'}
                </Heading>
                <Body style={textStyles.text} color={Colors.light.black}>
                    {'200 calories / 44g carbs / 6g proteins / 4g fats'}
                </Body>
            </VStack>
            <VStack spacing={15} style={styles.delete}>
                <DeleteIcon height={26} width={26} color={Colors.light['secondary-600']} />
            </VStack>
        </HStack>
    );
};

export default React.memo(CardFoodPhoto);

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light['secondary-500'],
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        flexWrap: 'nowrap',
    },
    imageContainer: {
        flex: 2,
    },
    image: {
        flex: 1,
        backgroundColor: '#0553',
        borderRadius: 10,
    },
    label: {
        flex: 5,
    },
    delete: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
});
