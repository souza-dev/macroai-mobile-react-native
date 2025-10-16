import AddExerciseIcon from '@assets/icons/add-exercise-plus.svg';
import CarbsIcon from '@assets/icons/macro-carbs.svg';
import FatsIcon from '@assets/icons/macro-fats.svg';
import PenIcon from '@assets/icons/macro-pen.svg';
import ProteinIcon from '@assets/icons/macro-protein.svg';
import Input from '@components/custom-ui/Input';
import { Colors } from '@constants/Colors';
import { dietData } from '@constants/dropdowndata';
import { textStyles } from '@styles/textStyles';
import React, { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import Body from './Body';
import Button from './Button';
import Heading from './Heading';
import HStack from './HStack';
import LevelBar from './LevelBar';
import Select from './Select';
import VStack from './VStack';

interface ValueTotal {
    value: number;
    total: number;
}

type Macros = Record<'protein' | 'carbs' | 'fats', ValueTotal>;

type CardData =
    | { type: 'calories'; value: ValueTotal }
    | { type: 'macros'; value: Macros }
    | { type: 'score'; value: number }
    | { type: 'exercise'; value: number };

interface SliderCaloriesProps {
    data: CardData[];
}

const SliderCalories = ({ data }: SliderCaloriesProps) => {
    const { width } = useWindowDimensions();
    const ref = React.useRef<ICarouselInstance>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleOnChange = (index: number | undefined) => {
        if (index === undefined) return;
        setCurrentIndex(index);

        if (ref.current) {
            ref.current.scrollTo({ index, animated: true });
        }
    };

    return (
        <View style={[styles.container]}>
            <View style={styles.carousel}>
                <Carousel
                    ref={ref}
                    width={width}
                    loop={true}
                    data={data}
                    containerStyle={{ width: width, paddingVertical: 20 }}
                    renderItem={({ item }) => {
                        switch (item.type) {
                            case 'calories': {
                                const { value, total } = item.value;
                                return (
                                    <VStack spacing={10} style={[styles.card]}>
                                        <Heading style={textStyles.subtitle} color={Colors.light['primary-500']}>
                                            {'Calories'}
                                        </Heading>
                                        <Heading>{`${value} cal.`}</Heading>
                                        <VStack spacing={5}>
                                            <LevelBar value={value} max={total} />
                                            <HStack style={{ justifyContent: 'space-between' }}>
                                                <Body style={textStyles.text}>0</Body>
                                                <Body style={textStyles.text}>{total}</Body>
                                            </HStack>
                                        </VStack>
                                    </VStack>
                                );
                            }
                            case 'macros': {
                                const { protein, carbs, fats } = item.value;

                                return (
                                    <VStack spacing={10} style={[styles.card]}>
                                        <Heading style={textStyles.subtitle} color={Colors.light['primary-500']}>
                                            {'Macros'}
                                        </Heading>
                                        <VStack spacing={5}>
                                            <HStack spacing={5} style={{ justifyContent: 'flex-end' }}>
                                                <HStack spacing={5} style={{ flex: 1 }}>
                                                    <ProteinIcon width={16} height={16} color={Colors.light.black} />
                                                    <Body style={textStyles.text}>Protein</Body>
                                                </HStack>
                                                <LevelBar value={protein.value} max={protein.total} />
                                            </HStack>
                                            <HStack spacing={5} style={{ justifyContent: 'flex-end' }}>
                                                <HStack spacing={5} style={{ flex: 1 }}>
                                                    <CarbsIcon width={16} height={16} color={Colors.light.black} />
                                                    <Body style={textStyles.text}>Carbs</Body>
                                                </HStack>
                                                <LevelBar value={carbs.value} max={carbs.total} fillColor="#FF3C3F" />
                                            </HStack>
                                            <HStack spacing={5} style={{ justifyContent: 'flex-end' }}>
                                                <HStack spacing={5} style={{ flex: 1 }}>
                                                    <FatsIcon width={16} height={16} color={Colors.light.black} />
                                                    <Body style={textStyles.text}>Fats</Body>
                                                </HStack>
                                                <LevelBar value={fats.value} max={fats.total} />
                                            </HStack>
                                        </VStack>
                                    </VStack>
                                );
                            }
                            case 'score':
                                return (
                                    <VStack spacing={10} style={[styles.card, { width: 358 }]}>
                                        <Heading style={textStyles.subtitle} color={Colors.light['primary-500']}>
                                            {'Ai Diet Score'}
                                        </Heading>
                                        <HStack spacing={5}>
                                            <VStack style={{ flex: 1 }} spacing={10}>
                                                <Heading center>{`${item.value} pt.`}</Heading>
                                                <LevelBar value={12500} max={25000} width={138} />
                                                <HStack style={{ justifyContent: 'space-between' }}>
                                                    <Body style={textStyles.text}>Bad</Body>
                                                    <Body style={textStyles.text}>Good</Body>
                                                </HStack>
                                            </VStack>
                                            <VStack style={{ flex: 1 }}>
                                                <Select data={dietData} />
                                            </VStack>
                                        </HStack>
                                    </VStack>
                                );
                            case 'exercise':
                                return (
                                    <VStack spacing={10} style={[styles.card, { width: 326 }]}>
                                        <Heading style={textStyles.subtitle} color={Colors.light['primary-500']}>
                                            {'Substract calories burned from exercise'}
                                        </Heading>
                                        <HStack spacing={10}>
                                            <Input
                                                placeholder="000"
                                                iconLeft={() => (
                                                    <PenIcon width={20} color={Colors.light.gray} height={20} />
                                                )}
                                                containerStyle={{
                                                    width: 120,
                                                    backgroundColor: Colors.light.background,
                                                }}
                                            />
                                            <Button
                                                title="Add Exercise"
                                                textStyle={{ color: Colors.light.white }}
                                                iconRight={() => <AddExerciseIcon color={Colors.light.white} />}
                                            />
                                        </HStack>
                                    </VStack>
                                );
                        }
                    }}
                    onSnapToItem={(index) => setCurrentIndex(index)}
                    // snapEnabled={false}
                    // pagingEnabled={false}
                    autoPlay={false}
                    autoPlayInterval={2000}
                />
            </View>
            <View style={styles.dotsContainer}>
                {data.map((_, index) => (
                    <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
                ))}
            </View>
        </View>
    );
};

export default React.memo(SliderCalories);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 220,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    carousel: {
        backgroundColor: Colors.light.background,
    },
    card: {
        height: 155,
        backgroundColor: Colors.light.white,
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 8,
    },
    dotsContainer: {
        position: 'absolute',
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.light.white,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: Colors.light['primary-500'], // Cor do ponto ativo
    },
});
