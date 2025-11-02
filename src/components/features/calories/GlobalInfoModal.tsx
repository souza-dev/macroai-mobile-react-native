import InfoModal from '@components/features/calories/InfoModal';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface GlobalInfoModalProps {
    activeModal: 'calories' | 'macros' | 'score' | 'exercise' | null;
    onClose: () => void;
    scoreExplain?: string;
}

const GlobalInfoModal = ({ activeModal, onClose, scoreExplain }: GlobalInfoModalProps) => {
    const { t } = useTranslation('calories');

    const modals = {
        calories: {
            title: t('modal_calories_title'),
            body: t('modal_calories_body'),
        },
        macros: {
            title: t('modal_macros_title'),
            body: t('modal_macros_body'),
        },
        score: {
            title: t('modal_score_title'),
            body: scoreExplain === '' ? t('modal_score_body') : scoreExplain,
        },
        exercise: {
            title: t('modal_exercise_title'),
            body: t('modal_exercise_body'),
        },
    };

    const current = activeModal ? modals[activeModal] : null;

    if (!current) return null;

    return (
        <InfoModal
            visible={true}
            title={current.title}
            body={current.body as string}
            buttonTitle={t('modal_button_title')}
            buttonOnPress={onClose}
            onRequestClose={onClose}
        />
    );
};

export default GlobalInfoModal;
