import MacrosIcon from '@assets/icons/chat-macrossetup.svg';
import ChatScreenBase from '@components/features/chats/ChatScreenBase';
import { Colors } from '@constants/Colors';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function RecipesScreen() {
    const { t } = useTranslation('chat');

    return (
        <ChatScreenBase
            type="macros"
            title={t('macros.title')}
            body={t('macros.body')}
            icon={<MacrosIcon width={36} height={36} color={Colors.light.black} />}
            examples={[t('macros.example1'), t('macros.example2')]}
        />
    );
}
