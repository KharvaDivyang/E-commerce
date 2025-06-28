import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {colors} from '../constants';
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from '../redux/orebiSlices';
import PriceFormat from './PriceFormat';

const CartProduct = ({item}: any) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (item?._id) {
      dispatch(deleteProduct(item._id));
    } else {
      console.warn('Product ID is missing or invalid.');
    }
  };

  return (
    <View
      style={{
        paddingVertical: 2,
        paddingHorizontal: 5,
        backgroundColor: colors.defaultWhite,
        marginBottom: 10,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: 180,
        }}>
        <Image source={{uri: item?.image}} style={{width: 80, height: 80}} />
        <View style={{marginLeft: 8}}>
          <Text style={{color: colors.textBlack, fontWeight: '800'}}>
            {item?.title?.substring(0, 12)}
          </Text>
          <Text>{item?.brand}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 0.2,
          borderColor: colors.lightText,
          borderRadius: 4,
          width: 70,
          height: 30,
          justifyContent: 'space-between',
          paddingHorizontal: 5,
        }}>
        <Pressable onPress={() => dispatch(decreaseQuantity(item))}>
          <AntDesign name="minus" size={16} color={colors.textBlack} />
        </Pressable>

        <Text>{item?.quantity}</Text>

        <Pressable onPress={() => dispatch(increaseQuantity(item))}>
          <AntDesign name="plus" size={16} color={colors.textBlack} />
        </Pressable>
      </View>

      <Text style={{color: colors.textBlack, fontWeight: '600'}}>
        <PriceFormat amount={item?.price * item?.quantity} />
      </Text>

      <Pressable onPress={handleDelete}>
        <EvilIcons name="trash" size={25} color={'red'} />
      </Pressable>
    </View>
  );
};

export default CartProduct;
