import {View, Text, StyleSheet, TextStyle} from 'react-native';
import React from 'react';

interface PriceFormatProps {
  amount: number | undefined;
  style?: TextStyle;
}

const PriceFormat = ({amount, style}: PriceFormatProps) => {
  const formattedAmount = new Number(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  return (
    <View>
      <Text style={[styles.defaultText, style]}>{formattedAmount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    color: 'green', // This will be overridden if a color is passed in `style`
    fontWeight: '600',
    fontSize: 16,
  },
});

export default PriceFormat;
