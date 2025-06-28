import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {intro} from '../assets';
import {colors} from '../constants';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { NavigationProps } from '../../type';

const {height} = Dimensions.get('window');

const Intro = () => {

  const navigation : NavigationProps = useNavigation();

  return (
    <View style={style.container}>
      {/* Top */}
      <View style={style.top}>
        <Image source={intro} alt="intro-image" style={style.introImg} />
      </View>
      {/* bottom */}

      <View style={style.bottom}>
        <Text style={style.title}>Great way to lift your style</Text>
        <Text style={style.subtitle}>
          Complete your style with awesome collections from bazaar shopping
        </Text>
      </View>

      <TouchableOpacity
        style={style.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={style.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: height,
    padding: 30,
  },
  top: {
    height: height / 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  introImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    marginTop: -10,
  },

  bottom: {
    alignItems: 'center',
  },

  title: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
  },

  subtitle: {
    color: colors.defaultWhite,
    textAlign: 'center',
    marginTop: 20,
  },

  button: {
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textBlack,
  },
});

export default Intro;
