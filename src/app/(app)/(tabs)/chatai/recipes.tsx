import RecipesIcon from '@assets/icons/chat-recipes.svg';
import ChatScreenBase from '@components/features/chats/ChatScreenBase';
import { Colors } from '@constants/Colors';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function RecipesScreen() {
    const { t } = useTranslation('chat');

    return (
        <ChatScreenBase
            type="recipes"
            title={t('recipes.title')}
            body={t('recipes.body')}
            icon={<RecipesIcon width={36} height={36} color={Colors.light.black} />}
            examples={[t('recipes.example1'), t('recipes.example2')]}
        />
    );
}
