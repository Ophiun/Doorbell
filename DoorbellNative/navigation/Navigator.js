import {createAppContainer} from 'react-navigation'; 
import {createStackNavigator} from 'react-navigation-stack'; 

import LibraryScreen from '../screens/LibraryScreen'; 
import SettingsScreen from '../screens/SettingsScreen'; 
import StreamScreen from '../screens/StreamScreen'; 
import HomeScreen from '../screens/HomeScreen';

const Navigator = createStackNavigator({
    Home: HomeScreen,
    Stream: StreamScreen, 
    Library: LibraryScreen, 
    Settings: SettingsScreen,
}); 

export default createAppContainer(Navigator);