import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '.';
import {logo} from '../assets';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Header = () => {
const navigation:any = useNavigation();

const {productData} = useSelector((state:any)=> state?.orebi)

  return (
    <SafeAreaView>
      <View style={style.container}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={22} color={colors.textBlack} />
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Home')}>
          <Image source={logo} alt="logo-icon" style={style.logo} />
        </Pressable>

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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBlockColor: 'grey',
  },

  logo: {
    width: 100,
    height: 25,
    objectFit: 'contain',
  },

  cartIcon: {
    position: 'relative',
  },

  cartCount: {
   borderRadius:50,
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
    fontWeight: 700,
  },
});

export default Header;
