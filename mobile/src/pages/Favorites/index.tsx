import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';

import PageHeader  from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import styles from './styles';

export const Favorites = () => {
  const [favoreds, setFavoreds] = useState([]);

  const loadFavoreds = () => {
    AsyncStorage.getItem('favoreds').then((res) => {
      if (res) {
        const favoritedTeachers = JSON.parse(res);

        setFavoreds(favoritedTeachers);
      }
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      loadFavoreds();
    }, [])
  );

  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}>
        {favoreds.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} favorited />;
        })}
      </ScrollView>
    </View>
  );
};

export default Favorites;