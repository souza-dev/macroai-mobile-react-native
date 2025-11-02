import AddExerciseIcon from '@assets/icons/add-exercise-plus.svg';
import CarbsIcon from '@assets/icons/macro-carbs.svg';
import FatsIcon from '@assets/icons/macro-fats.svg';
import PenIcon from '@assets/icons/macro-pen.svg';
import ProteinIcon from '@assets/icons/macro-protein.svg';
import Input from '@components/custom-ui/Input';
import InfoHeader from '@components/features/calories/InfoHeader';
import { Colors } from '@constants/Colors';
import { dietData } from '@constants/dropdowndata';
import { textStyles } from '@styles/textStyles';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import Body from '../../custom-ui/Body';
import Button from '../../custom-ui/Button';
import Heading from '../../custom-ui/Heading';
import HStack from '../../custom-ui/HStack';
import LevelBar from '../../custom-ui/LevelBar';
import Select from '../../custom-ui/Select';
import VStack from '../../custom-ui/VStack';

interface ValueTotal {
    value: string | number;
    total: string | number;
}

type Macros = Record<'protein' | 'carbs' | 'fats', ValueTotal>;

type CardData =
    | { type: 'calories'; value: ValueTotal; onPress?: () => void }
    | { type: 'macros'; value: Macros; onPress?: () => void }
    | {
          type: 'score';
          value: string | number;
          explain: string;
          onPress?: () => void;
          diet: string;
          onChange: (value: string) => void;
      }
    | { type: 'exercise'; value: number; onPress?: () => void; onPressAddExercise: (value: number) => void };

interface SliderCaloriesProps {
    data: CardData[];
}

const SliderCalories = ({ data }: SliderCaloriesProps) => {
    const { t } = useTranslation('calories');
    const { width } = useWindowDimensions();
    const ref = React.useRef<ICarouselInstance>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <View style={[styles.container]}>
            <View style={styles.carousel}>
                <Carousel
                    ref={ref}
                    width={width}
                    loop
                    data={data}
                    containerStyle={{ width, paddingVertical: 20 }}
                    renderItem={({ item }) => {
                        switch (item.type) {
                            case 'calories': {
                                const rawValue = item.value.value;
                                const rawTotal = item.value.total;

                                // Garante número válido
                                const value = Number(rawValue) || 0;
                                const total = Number(rawTotal) || 0;
                                return (
                                    <VStack spacing={10} style={[styles.card]}>
                                        <InfoHeader title="Calories" onPress={item.onPress} />
                                        <Heading>{`${value} cal.`}</Heading>
                                        <VStack style={{ height: 10 }}>
                                            <LevelBar value={value as number} max={total as number} />
                                        </VStack>
                                        <HStack style={{ justifyContent: 'space-between' }}>
                                            <Body style={textStyles.text}>0</Body>
                                            <Body style={textStyles.text}>{total}</Body>
                                        </HStack>
                                    </VStack>
                                );
                            }
                            case 'macros': {
                                const { protein, carbs, fats } = item.value;
                                return (
                                    <VStack spacing={10} style={[styles.card]}>
                                        <InfoHeader title="Macros" onPress={item.onPress} />
                                        <VStack spacing={5}>
                                            <HStack spacing={5} style={{ justifyContent: 'flex-end' }}>
                                                <HStack spacing={5} style={{ flex: 1 }}>
                                                    <ProteinIcon width={16} height={16} color={Colors.light.black} />
                                                    <Body style={textStyles.text}>Protein</Body>
                                                </HStack>
                                                <LevelBar
                                                    value={protein.value as number}
                                                    max={protein.total as number}
                                                />
                                            </HStack>

                                            <HStack spacing={5} style={{ justifyContent: 'flex-end' }}>
                                                <HStack spacing={5} style={{ flex: 1 }}>
                                                    <CarbsIcon width={16} height={16} color={Colors.light.black} />
                                                    <Body style={textStyles.text}>Carbs</Body>
                                                </HStack>
                                                <LevelBar
                                                    value={carbs.value as number}
                                                    max={carbs.total as number}
                                                    fillColor="#FF3C3F"
                                                />
                                            </HStack>

                                            <HStack spacing={5} style={{ justifyContent: 'flex-end' }}>
                                                <HStack spacing={5} style={{ flex: 1 }}>
                                                    <FatsIcon width={16} height={16} color={Colors.light.black} />
                                                    <Body style={textStyles.text}>Fats</Body>
                                                </HStack>
                                                <LevelBar value={fats.value as number} max={fats.total as number} />
                                            </HStack>
                                        </VStack>
                                    </VStack>
                                );
                            }
                            case 'score':
                                return (
                                    <VStack spacing={10} style={[styles.card]}>
                                        <InfoHeader title="Ai Diet Score" onPress={item.onPress} />
                                        <HStack spacing={10}>
                                            <VStack style={{ flex: 1 }} spacing={10}>
                                                <Heading center>{`${item.value} pt.`}</Heading>
                                                <VStack style={{ height: 10 }}>
                                                    <LevelBar value={Number(item.value)} max={10} />
                                                </VStack>
                                                <HStack style={{ justifyContent: 'space-between' }}>
                                                    <Body style={textStyles.text}>{t('bad')}</Body>
                                                    <Body style={textStyles.text}>{t('good')}</Body>
                                                </HStack>
                                            </VStack>
                                            <VStack
                                                style={{
                                                    flex: 1,
                                                }}
                                            >
                                                <Select data={dietData} value={item.diet} onChange={item.onChange} />
                                            </VStack>
                                        </HStack>
                                    </VStack>
                                );
                            case 'exercise':
                                const [exerciseValue, setExerciseValue] = useState('');

                                return (
                                    <VStack spacing={10} style={[styles.card]}>
                                        <InfoHeader
                                            title="Substract calories burned from exercise"
                                            onPress={item.onPress}
                                        />
                                        <HStack spacing={20}>
                                            <Input
                                                placeholder="000"
                                                value={exerciseValue}
                                                onChangeText={setExerciseValue}
                                                iconLeft={() => (
                                                    <PenIcon width={20} color={Colors.light.gray} height={20} />
                                                )}
                                                containerStyle={{
                                                    flex: 1,
                                                    backgroundColor: Colors.light.background,
                                                }}
                                                style={{ textAlign: 'center' }}
                                                keyboardType="numeric"
                                                returnKeyType="done"
                                                onSubmitEditing={() => {
                                                    console.log('Enviado');
                                                    const value = Number(exerciseValue);
                                                    if (!isNaN(value) && value > 0) {
                                                        item.onPressAddExercise(value);
                                                        setExerciseValue(''); // limpa o input depois
                                                    }
                                                }}
                                            />
                                            <Button
                                                title="Add Exercise"
                                                textStyle={{ color: Colors.light.white }}
                                                iconRight={() => <AddExerciseIcon color={Colors.light.white} />}
                                                onPress={() => {
                                                    const value = Number(exerciseValue);
                                                    if (!isNaN(value) && value > 0) {
                                                        item.onPressAddExercise(value);
                                                        setExerciseValue(''); // limpa o input depois
                                                    }
                                                }}
                                                style={{ flex: 1 }}
                                            />
                                        </HStack>
                                    </VStack>
                                );
                        }
                    }}
                    onSnapToItem={(index) => setCurrentIndex(index)}
                    autoPlay={false}
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
        backgroundColor: Colors.light['primary-500'],
    },
});
