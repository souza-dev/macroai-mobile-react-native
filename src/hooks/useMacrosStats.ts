import { useState } from 'react';

export default function useMacrosStats() {
    const [calMax, setCalMax] = useState('3000');
    const [carbMax, setCarbMax] = useState('250');
    const [proteinMax, setProteinMax] = useState('300');
    const [fatsMax, setFatsMax] = useState('250');
    const [subtract, setSubract] = useState('0');
    const [exercise, setExercise] = useState(0);

    return {
        calMax,
        setCalMax,
        carbMax,
        setCarbMax,
        proteinMax,
        setProteinMax,
        fatsMax,
        setFatsMax,
        subtract,
        setSubract,
        exercise,
        setExercise,
    };
}
