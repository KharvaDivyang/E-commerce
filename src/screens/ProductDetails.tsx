import React, {useEffect, useState, useMemo} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Image,
  ScrollView,
} from 'react-native';
import CommonHeader from '../constants/CommonHeader';
import {ProductsrProps} from '../../type';
import {colors} from '../constants';
import Loader from '../components/Loader';
import DetailsView from '../components/DetailsView';
import PriceFormat from '../components/PriceFormat';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IsNewBadge from '../components/IsNewBadge';
import {addToCart} from '../redux/orebiSlices';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';

/* -------------------------------------------------------------------------- */
/*                              Helper Functions                              */
/* -------------------------------------------------------------------------- */

/**
 * Generate style sheet that adapts to current screen size.
 * All fixed numbers have been converted to percentages or scale helpers
 * to ensure the component looks consistent on phones, tablets, and iPads.
 */
const createResponsiveStyles = (width: number, height: number) => {
  // Base guideline taken from a standard mobile size
  const guidelineBaseWidth = 375;
  const guidelineBaseHeight = 812;

  const scale = (size: number) => (width / guidelineBaseWidth) * size;
  const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
  const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.defaultWhite,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingBottom: verticalScale(140), // Leaves space for bottom menu
    },
    imgView: {
      width: '100%',
      height: height * 0.45, // 45% of screen height keeps aspect on tablets
      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain', // better support than objectFit
    },
    bottomMenu: {
      position: 'absolute',
      bottom: verticalScale(40), // ~5% of base height
      width: width * 0.9,
      alignSelf: 'center',
      borderRadius: moderateScale(8),
      paddingVertical: verticalScale(12),
      paddingHorizontal: scale(12),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.bgColor,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    priceText: {
      color: colors.defaultWhite,
    },
    addToCartBtn: {
      backgroundColor: colors.desginColor,
      paddingHorizontal: scale(14),
      paddingVertical: verticalScale(10),
      borderRadius: moderateScale(6),
      flexDirection: 'row',
      alignItems: 'center',
    },
    addToCartLabel: {
      fontSize: moderateScale(12),
      fontWeight: '600',
      color: colors.textBlack,
      marginRight: scale(6),
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                             Component Definition                           */
/* -------------------------------------------------------------------------- */

const ProductDetails = ({route}: any) => {
  const {_id} = route?.params ?? {};
  const [productData, setProductData] = useState<ProductsrProps | null>(null);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Screen dimensions (updates on orientation change)
  const {width, height} = useWindowDimensions();
  // Memoize styles to avoid recalculation on every render unless dimensions change
  const styles = useMemo(
    () => createResponsiveStyles(width, height),
    [width, height],
  );

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://jsonserver.reactbd.com/amazonpro/${_id}`,
      );
      const json = await response.json();
      setProductData(json);
    } catch (error) {
      console.log('Error fetching product', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // Rerun only when _id changes
  }, [_id]);

  /* ------------------------------------------------------------------------ */
  /*                               Render Logic                               */
  /* ------------------------------------------------------------------------ */

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title={'Product Details'} />

      {isLoading ? (
        <Loader title={'Product Details is Loading'} />
      ) : (
        <>
          <ScrollView
            bounces={false}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            {/* --------------------------- Product Image -------------------------- */}
            <View style={styles.imgView}>
              {productData?.image && (
                <Image source={{uri: productData?.image}} style={styles.img} />
              )}
            </View>

            {/* --------------------------- Details View -------------------------- */}
            <DetailsView productData={productData} />
          </ScrollView>

          {/* --------------------------- Bottom Menu --------------------------- */}
          <View style={styles.bottomMenu}>
            {/* ----- Price Section ----- */}
            <View>
              <Text style={styles.priceText}>
                <PriceFormat
                  amount={productData?.price}
                  style={styles.priceText}
                />
              </Text>

              {productData?.previousPrice && (
                <Text style={styles.priceText}>
                  <PriceFormat
                    amount={productData?.previousPrice}
                    style={{
                      ...styles.priceText,
                      textDecorationLine: 'line-through',
                    }}
                  />
                </Text>
              )}
            </View>

            {/* ----- Add to Cart Button ----- */}
            <Pressable
              onPress={() => {
                dispatch(addToCart(productData));
                Toast.show({
                  type: 'success',
                  text1: `${productData?.title} added successfully`,
                });
              }}
              style={styles.addToCartBtn}>
              <Text style={styles.addToCartLabel}>Add to Cart</Text>
              <AntDesign name="arrowright" size={16} color={colors.textBlack} />
            </Pressable>
          </View>

          {/* --------------------------- New Badge ----------------------------- */}
          {productData?.isNew && (
            <IsNewBadge
              customStyle={{
                position: 'absolute',
                right: width * 0.05,
                top: height * 0.07,
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderRadius: 6,
              }}
              title="NewArrival"
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default ProductDetails;
