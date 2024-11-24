import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';

export default function TicTaccToe() {
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  };

  const checkIsWinner = () => {
    //  checking  winner of the game
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game! 🥳`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner('Draw game... ⌛️');
    }
  };

  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
      });
    }

    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: 'red',
        textColor: '#FFFFFF',
      });
    }

    checkIsWinner();
  };

  return (
    <View>
      <Text>TicTaccToe</Text>
      <View>
        {gameWinner ? (
          <View style={[styles.playerInfo, styles.winnerInfo]}>
            <Text style={styles.winnerTxt}>{gameWinner}</Text>
          </View>
        ) : (
          <View
            style={[
              styles.playerInfo,
              isCross ? styles.playerX : styles.playerO,
            ]}>
            <Text style={styles.gameTurnTxt}>
              Player {isCross ? 'X' : 'Y'}'s turn it is
            </Text>
          </View>
        )}
      </View>
      {/* Game Grid */}
      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({item, index}) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => onChangeItem(index)}>
            <Icons name={item} />
          </Pressable>
        )}
      />

      {/* Game Action  */}
      <Pressable style={styles.gameBtn} onPress={reloadGame}>
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start new Game' : 'Reload the Game'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 16,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  rupee: {
    marginRight: 8,
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  inputAmountField: {
    fontSize: 18,
    color: '#666',
    flex: 1,
  },
  resultTxt: {
    fontSize: 32,
    color: '#FFFFFF',
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  bottomContainer: {
    flex: 3,
    marginTop: 16,
  },
  button: {
    flex: 1,
    margin: 8,
    height: 140,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  selected: {
    backgroundColor: '#6C63FF',
    shadowColor: '#6C63FF',
    shadowOpacity: 0.2,
  },
  playerInfo: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 16,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gameTurnTxt: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  card: {
    height: 100,
    width: '33.33%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#EEE',
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 20,
    marginHorizontal: 40,
    backgroundColor: '#8D3DAF',
    marginTop: 16,
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  btnContainer: {
    alignItems: 'center',
  },
  flag: {
    fontSize: 24,
    color: '#333',
    marginBottom: 4,
  },
  country: {
    fontSize: 16,
    color: '#666',
  },
});
