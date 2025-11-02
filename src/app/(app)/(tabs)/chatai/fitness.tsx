import FitnessIcon from '@assets/icons/chat-fitnessplan.svg';
import ChatScreenBase from '@components/features/chats/ChatScreenBase';
import { Colors } from '@constants/Colors';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function RecipesScreen() {
    const { t } = useTranslation('chat');

    return (
        <ChatScreenBase
            type="fitness"
            title={t('fitness.title')}
            body={t('fitness.body')}
            icon={<FitnessIcon width={36} height={36} color={Colors.light.black} />}
            examples={[t('fitness.example1'), t('fitness.example2')]}
        />
    );
}
