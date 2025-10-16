import NutritionIcon from '@assets/icons/chat-nutrition.svg';
import ChatScreenBase from '@components/features/chats/ChatScreenBase';
import { Colors } from '@constants/Colors';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function RecipesScreen() {
    const { t } = useTranslation('chat');

    return (
        <ChatScreenBase
            type="nutrition"
            title={t('nutrition.title')}
            body={t('nutrition.body')}
            icon={<NutritionIcon width={36} height={36} color={Colors.light.black} />}
            examples={[t('nutrition.example1'), t('nutrition.example2')]}
        />
    );
}
