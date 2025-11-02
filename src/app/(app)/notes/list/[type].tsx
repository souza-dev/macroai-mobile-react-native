/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */

import BackButton from '@components/custom-ui/BackButton';
import Body from '@components/custom-ui/Body';
import Header from '@components/custom-ui/Header';
import Heading from '@components/custom-ui/Heading';
import Screen from '@components/custom-ui/Screen';
import VStack from '@components/custom-ui/VStack';
import { useUser } from '@contexts/userContext';
import useNotes from '@hooks/useNotes';
import { Button, ListItem } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NotesListScreen({ route, navigation }: any) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('notes');
    const { type } = useLocalSearchParams<{ type: string }>();
    const { user } = useUser();
    const { notes, deleteNote, loadNotes } = useNotes(user as User, type as NotesTypes);
    const [title, setTitle] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        let title = '';
        if (type === 'all') {
            title = t('button_all_notes');
        } else if (type === 'recipes') {
            title = t('button_recipes');
        } else if (type === 'fitness') {
            title = t('button_exercise');
        } else if (type === 'nutrition') {
            title = t('button_info');
        } else if (type === 'macros') {
            title = t('button_macros');
        } else {
            title = t('title');
        }
        setTitle(title);
    }, [navigation, type]);

    const generateTag = (tag: string) => {
        let color;

        if (tag === 'recipes') {
            color = '#05C7AC';
        } else if (tag === 'fitness') {
            color = '#05C7AC';
        } else if (tag === 'nutrition') {
            color = '#05C7AC';
        } else if (tag === 'macros') {
            color = '#05C7AC';
        }

        return (
            <View style={[styles.noteTag, { backgroundColor: color }]}>
                <Text style={styles.tagText}>{`#${tag.toUpperCase()}`}</Text>
            </View>
        );
    };
    const removeNote = async (id: string) => {
        try {
            await deleteNote(id);
        } catch (e: any) {
            Alert.alert('Error', e.toString());
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadNotes();
        setRefreshing(false);
    };

    useEffect(() => {
        onRefresh();
    }, [type]);

    const NotesListItem = ({ id, title, content, tag }: Note) => {
        return (
            <ListItem.Swipeable
                id={id}
                bottomDivider={true}
                rightContent={(action) => (
                    <Button
                        title={t('Delete')}
                        onPress={() => {
                            removeNote(id);
                            action();
                        }}
                        icon={{ name: 'delete', color: 'white' }}
                        buttonStyle={styles.deleteButton}
                    />
                )}
            >
                <ListItem.Content>
                    <TouchableOpacity onPress={() => navigation.navigate('NoteScreen', { id })}>
                        <ListItem.Title style={styles.listItemTitle}>{title}</ListItem.Title>
                        <Text style={styles.itemText}>{content?.substring(0, 100) + '...'}</Text>
                        <View style={{ alignItems: 'flex-start' }}>{generateTag(tag as string)}</View>
                    </TouchableOpacity>
                </ListItem.Content>
            </ListItem.Swipeable>
        );
    };

    return (
        <Screen style={{ paddingBottom: insets.bottom }}>
            <Header>
                <BackButton />
            </Header>
            <Heading>{title}</Heading>
            <FlatList
                data={notes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <NotesListItem id={item.id} title={item.title} content={item.content} tag={item.tag} />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={() => (
                    <VStack>
                        <Body>{t('empty', { title })}</Body>
                    </VStack>
                )}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 30,
    },
    listItemTitle: {
        fontFamily: 'Lato-Regular',
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '700',
        color: '#0D72B9',
    },
    itemText: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '400',
        color: '#282828',
    },
    text: {
        fontFamily: 'Lato-Regular',
        fontSize: 23,
        lineHeight: 28,
        fontWeight: '700',
        color: '#282828',
    },
    deleteButton: {
        minHeight: '100%',
        backgroundColor: 'red',
    },
    noteTag: {
        backgroundColor: '#01C7B0',
        borderRadius: 100,
        padding: 5,
        paddingHorizontal: 13,
    },
    tagText: {
        fontFamily: 'Lato-Regular',
        fontSize: 13,
        lineHeight: 15,
        fontWeight: '700',
        color: 'white',
    },
});
