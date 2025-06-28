import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../constants'

const IsNewBadge = ({customStyle, title}:any) => {
  return (
    <View style={[style.container, customStyle]} >
      <Text style={style.text} >{title ? title : 'New'}</Text>
    </View>
  )
}

const style = StyleSheet.create({
    container:{
        position:'absolute',
        right:2,
        top:2,
        paddingVertical:2,
        paddingHorizontal:6,
        borderRadius:2,
        backgroundColor:colors.textBlack,
    },

    text:{
        color:colors.defaultWhite,
        fontSize:10,
    }
})

export default IsNewBadge