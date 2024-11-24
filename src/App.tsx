import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {currencyByRupee} from './constants';
import CurrencyButton from './components/CurrencyButton';
import Snackbar from 'react-native-snackbar';
import TicTaccToe from './TicTaccToe';

const App = (): React.JSX.Element => {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const btnPressed = (targetValue: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter a value to convert',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }

    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`;
      setResultValue(result);
      setTargetCurrency(targetValue.name);
    } else {
      return Snackbar.show({
        text: 'Not a valid number to convert',
        backgroundColor: '#F4BE2C',
        textColor: '#000000',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Currency Converter */}
        <View style={styles.currencyContainer}>
          <Text style={styles.title}>Currency Converter</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencyLabel}>৳</Text>
            <TextInput
              maxLength={10}
              value={inputValue}
              clearButtonMode="always"
              onChangeText={setInputValue}
              keyboardType="number-pad"
              placeholder="Enter amount in Taka"
              style={styles.input}
            />
          </View>
          {resultValue && <Text style={styles.resultText}>{resultValue}</Text>}
          <FlatList
            numColumns={3}
            data={currencyByRupee}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <Pressable
                style={[
                  styles.currencyButton,
                  targetCurrency === item.name && styles.selectedButton,
                ]}
                onPress={() => btnPressed(item)}>
                <CurrencyButton {...item} />
              </Pressable>
            )}
          />
        </View>

        {/* Tic-Tac-Toe */}
        <View style={styles.gameContainer}>
          <Text style={styles.title}>Tic-Tac-Toe</Text>
          <TicTaccToe />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  currencyContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  currencyLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
    color: '#666',
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  resultText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#38CC77',
    textAlign: 'center',
    marginVertical: 12,
  },
  currencyButton: {
    flex: 1,
    margin: 6,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedButton: {
    backgroundColor: '#ffeaa7',
  },
  gameContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default App;
