import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const SideMenu = () => {
  const navigation = useNavigation();

  const navigations = [
    {title: 'Home'},
    {title: 'Intro'},
    {title: 'Cart'},
    {title: 'Addresses'},
    {title: 'Contact'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Press the menu to Home</Text>

          <Pressable
            onPress={() => navigation.navigate('Home')}
            hitSlop={8}
            style={styles.closeButton}
          >
            <FontAwesome6 name="xmark" size={20} color="red" />
          </Pressable>
        </View>

        {navigations.map(({title}) => (
          <Pressable
            key={title}
            style={styles.menu}
            onPress={() => navigation.navigate(title)}>
            <Text style={styles.menuText}>{title}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    margin: 10,
    textAlign: 'center',
  },
  closeButton: {
    padding: 4, 
    borderRadius: 20,
  },
  menu: {
    backgroundColor: 'black',
    marginVertical: 5,
    paddingVertical: 10,
    borderRadius: 30,
  },
  menuText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SideMenu;
