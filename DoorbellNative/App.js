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
  Button
} from 'react-native';

import Navigator from './navigation/Navigator';

import Footer from './components/Footer'; 
import StreamScreen from './screens/StreamScreen';
import LibraryScreen from './screens/LibraryScreen'; 
import SettingsScreen from './screens/SettingsScreen';
export default function App() {
  /*
  const [activeScreen, setActiveScreen] = useState(0)

  const screenHandler = () => {
    setActiveScreen(curActive => curActive + 1); 
    f (activeScreen === 3) setActiveScreen(0);
  };
  let content = <StreamScreen/>

  if (activeScreen === 0){
    content = <StreamScreen/>;
  }else if (activeScreen === 1){
    content = <SettingsScreen/>;
  }else if (activeScreen === 2){
    content = <LibraryScreen/>;
  };
  */
  /*
  return (
    <View style={styles.screen}>
      <Footer/>
      <Button title="NEXT SCREEN" onPress={screenHandler}/>
      {content}
    </View>
  );
  */

  return (
    <Navigator /> 
  );
}



const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

});
