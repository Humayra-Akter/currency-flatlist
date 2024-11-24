import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import type {PropsWithChildren} from 'react';

type CurrencyButtonProps = PropsWithChildren<{
  name: string;
  flag: string;
}>;

const CurrencyButton = (props: CurrencyButtonProps): JSX.Element => {
  return (
    <View style={styles.btnContainer}>
      <Text style={styles.flag}>{props.name}</Text>
      <Text style={styles.country}>{props.flag}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
  },
  flag: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 4,
  },
  country: {
    fontSize: 20,
    color: '#2D3436',
    marginBottom: 4,
  },
});

export default CurrencyButton;
