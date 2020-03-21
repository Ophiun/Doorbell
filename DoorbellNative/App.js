
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

export default class App extends React.Component {

  // Create websocket 
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Navigator /> 
    );
  }

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

});
