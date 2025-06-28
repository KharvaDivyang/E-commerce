import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../constants';

const {height} = Dimensions.get('window');

const Loader = ({title}:{title:string}) => {
  return (
    <View style={style.container}>
      <View style={{marginTop:-100}} >
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 10,
            color: colors.defaultWhite,
            fontSize: 16,
          }}>
          {title ? title : 'Loading is running'}
        </Text>
        <ActivityIndicator size={'large'} color={colors.desginColor} />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
    container:{
        height: height -50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#00000080'
    }
})

export default Loader;