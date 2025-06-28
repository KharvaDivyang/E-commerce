import { View, Text } from 'react-native'
import React from 'react'
import { colors } from '../constants'
import PriceFormat from './PriceFormat'

const DetailsView = ({productData}:any) => {
  return (
    <View style={{marginHorizontal:20, }} >
      <Text style={{fontSize:20, fontWeight:'700', color:colors.textBlack}} >{productData?.title}</Text>
      <Text>
        {productData?.description}
      </Text>
      <Text>
        Brand:{''}
        <Text style={{color: colors.textBlack, fontWeight:'600'}} >
    {productData?.brand}
        </Text>
      </Text>
      <Text style={{color: colors.textBlack, fontWeight:'600'}} >
        Category:{''}
        <Text>
          {productData?.Category}
        </Text>
      </Text>
      <Text style={{marginVertical:5, color:colors.desginColor}}>
        You are saving{''}
        <PriceFormat 
        style={{color:'green', fontWeight:'600'}}
        amount={productData?.previousPrice - productData?.price}
         />{''} 
    from this product
      </Text>
    </View>
  )
}

export default DetailsView