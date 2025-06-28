import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonHeader from '../constants/CommonHeader';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {NavigationProps, ProductsrProps} from '../../type';
import CartProduct from '../components/CartProduct';
import {colors} from '../constants';
import PriceFormat from '../components/PriceFormat';
import {useNavigation} from '@react-navigation/native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const Cart = () => {
  const navigation: NavigationProps = useNavigation();
  const {productData} = useSelector((state: any) => state?.orebi);
  const [totalAmt, setTotalAmt] = React.useState(0);
  const [DiscountPrice, setDiscountPrice] = useState(0);

  useEffect(() => {
    let amt = 0;
    let discountAmt = 0;
    productData?.map((item: ProductsrProps) => {
      amt += item?.previousPrice * item?.quantity;
      discountAmt = item?.price * item?.quantity;
      return;
    });
    setTotalAmt(amt);
    setDiscountPrice(discountAmt);
  }, [productData]);

  return (
    <View>
      <CommonHeader title="Cart" />
      <ScrollView contentContainerStyle={{paddingBottom: 100, margin: 10}}>
        {productData?.length > 0 ? (
          <>
            <View>
              {productData?.map((item: ProductsrProps) => (
                <CartProduct key={item?._id} item={item} />
              ))}
            </View>
            <View style={{backgroundColor: colors.defaultWhite, padding: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 16, color: colors.textBlack}}>
                  Subtotal
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: colors.textBlack,
                  }}>
                  <PriceFormat amount={totalAmt} />
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 16, color: colors.textBlack}}>
                  Discount
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 16, color: 'red'}}>-</Text>
                  <PriceFormat
                    amount={totalAmt - DiscountPrice}
                    style={{fontSize: 16, color: 'red'}}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                }}>
                <Text style={{fontSize: 16, color: colors.textBlack}}>
                  Total
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: colors.textBlack,
                  }}>
                  <PriceFormat
                    amount={DiscountPrice}
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: 'green',
                    }}
                  />
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                Toast.show({
                  type: 'error',
                  text1: 'Please login to initialize the Checkout',
                  text1Style: {color: 'red'},
                  text2: 'Login feature is on progress, please wait...',
                  text2Style: {color: 'black'},
                })
              }
              style={{
                backgroundColor: colors.buttonColor,
                paddingVertical: 10,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text
                style={{
                  color: colors.defaultWhite,
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                Proceed to Checkout
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{
                backgroundColor: colors.defaultWhite,
                paddingVertical: 8,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 5,
                borderWidth: 1,
                borderColor: colors.lightText,
              }}>
              <Text
                style={{
                  color: colors.textBlack,
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: colors.defaultWhite,
              padding: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.textBlack,
                textAlign: 'center',
                fontWeight: '600',
              }}>
              Your Cart is Empty!
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{
                backgroundColor: colors.defaultWhite,
                paddingVertical: 8,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 5,
                borderWidth: 1,
                borderColor: colors.lightText,
                marginTop:20
              }}>
              <Text
                style={{
                  color: colors.textBlack,
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                Back Shopping
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Cart;
// yarn add redux-persist
