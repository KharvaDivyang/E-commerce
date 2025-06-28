import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../constants/Header';
import {colors} from '../constants';
import { Item } from '../../type';
import {Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { bannerOne, bannerThree, bannerTwo } from '../assets';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IsNewBadge from '../components/IsNewBadge';
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/orebiSlices';
import Toast from 'react-native-toast-message';



const {width, height} = Dimensions.get('window');

const Home = () => {
const navigation : any = useNavigation()  
  const [productArray, setProductArray] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();


  const getData = async () => {
    try{
      setIsLoading(true);
      const response = await fetch('https://jsonserver.reactbd.com/amazonpro');
      const json = await response.json();
      setProductArray(json);
      setIsLoading(false);
    } catch (error) {
      console.log('Error', error)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const images = [bannerOne, bannerTwo, bannerThree, ]


  const RenderItem = ({item}: Item) => {

 
    return (
      <TouchableOpacity
        style={style.productView}
        onPress={() =>
          navigation.navigate('ProductDetails', {
            _id: item?._id,
          })
        }>
        {item?.image ? (
          <Image source={{uri: item.image}} style={style.img} />
        ) : (
          <View
            style={[
              style.img,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text>No Image</Text>
          </View>
        )}

        <View style={style.textView}>
          <Text>{item?.title}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
            <View>
              <Text
                style={{
                  fontWeight: '600',
                  color: colors.textBlack,
                  fontSize: 12,
                }}>
                ${item?.price}
              </Text>
              <Text style={{fontSize: 12, textDecorationLine: 'line-through'}}>
                ${item?.previousPrice}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                dispatch(addToCart(item));
                Toast.show({
                  type: 'success',
                  text1: `${item?.title} added successfully `
                });
              }}
              style={{
                backgroundColor: colors.desginColor,
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderRadius: 6,
              }}>
              <AntDesign
                name="shoppingcart"
                size={20}
                color={colors.textBlack}
              />
            </TouchableOpacity>
          </View>
        </View>
        {item.isNew && <IsNewBadge />}
      </TouchableOpacity>
    );
  };  
  
  


  return (
    <View style={{flex: 1}}>
      <Header />
      <View>
        {isLoading ? (
          <Loader title="Product is Loading..." />
        ) : (
          <FlatList
            data={productArray}
            contentContainerStyle={style.container}
            keyExtractor={(item: any) => item?._id}
            renderItem={RenderItem}
            refreshing={refreshing}
            onRefresh={() => {
              getData();
            }}

            numColumns={2}
            ListHeaderComponent={<View>
              <Carousel loop width={width} style={{height:210}} 
               autoPlay={true} data={images} scrollAnimationDuration={1000} renderItem={({item})=>{
                return(
                  <View>
                    <Image source={item} style={{
                      width:'100%',height:270, objectFit:'cover'
                    }} />
                  </View>
                )
               }} />
            </View>}
          />
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.defaultWhite,
    paddingBottom: 200,
    paddingHorizontal: 8,
  },

  productView: {
    flex: 1,
    height: height / 3,
    borderWidth: 0.5,
    borderColor: colors.lightText,
    margin: 5,
    borderRadius: 6,
    marginHorizontal: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  img: {
   flex:1,
   objectFit:'cover'
  },
  textView:{
    padding:10
  }
});

export default Home;
