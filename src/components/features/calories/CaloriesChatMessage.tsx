import CardFoodPhoto from '../CardFoodPhoto';
import CardFood from './CardFood';

interface CaloriesChatMessageProps {
    type: 'photo' | 'voice' | 'text';
}
export default function CaloriesChatMessage({ type }: CaloriesChatMessageProps) {
    if (type === 'photo') {
        return <CardFoodPhoto />;
    } else {
        return <CardFood />;
    }
}
