import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '.';
import {NavigationProps} from '../../type';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {logo} from '../assets';
import { useSelector } from 'react-redux';

const CommonHeader = ({title}: {title: string}) => {
  const navigation: NavigationProps = useNavigation();
  const {productData} = useSelector((state: any) => state?.orebi);

  return (
    <SafeAreaView>
      <View style={style.container}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name="arrowleft" color={colors.textBlack} size={20} />
          <Text
            style={{
              color: colors.textBlack,
              marginLeft: 5,
              fontWeight: '600',
            }}>
            {title}
          </Text>
        </Pressable>

        {/* Logo */}
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Image source={logo} alt="logo-icon" style={style.logo} />
        </Pressable>

        {/* Cart Icon */}
        <Pressable
          onPress={() => navigation.navigate('Cart')}
          style={style.cartIcon}>
          <AntDesign name="shoppingcart" size={22} color={colors.textBlack} />
          <View style={style.cartCount}>
            <Text style={style.cartText}>
              {productData?.length > 0 ? productData.length : 0}
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'grey', 
  },

  logo: {
    width: 100,
    height: 25,
    resizeMode: 'contain', 
  },

  cartIcon: {
    position: 'relative',
  },

  cartCount: {
    borderRadius: 50,
    backgroundColor: 'black',
    position: 'absolute',
    right: -4,
    top: -6,
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cartText: {
    color: colors.defaultWhite,
    fontSize: 10,
    fontWeight: '700', 
  },
});

export default CommonHeader;
