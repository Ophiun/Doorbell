/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


import Footer from './components/Footer'; 
import StreamScreen from './screens/StreamScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0)
  /*
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds); 
  };

  let content = 
    <StartGameScreen 
      onStartGame={startGameHandler}
    />;

  if (userNumber && guessRounds <= 0){
    content = 
      <GameScreen 
        userChoice={userNumber}
        onGameOver={gameOverHandler}
      />;
  }else if (guessRounds > 0){
    content = 
      <GameOverScreen/>;
  }
  */
  let content = <StreamScreen/>

  return (
    <View style={styles.screen}>
      <Footer/>
      {content}
    </View>
  );
}



const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

});
