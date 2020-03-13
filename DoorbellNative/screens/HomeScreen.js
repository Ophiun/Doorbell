import React from 'react'; 
import {View, Text, StyleSheet, Button} from 'react-native'; 

import ImageButton from '../components/ImageButton';

const HomeScreen = props => {

    return(
        <View style={styles.screen}>
            
            <View style={styles.buttonContainer}>
                <ImageButton
                    source={require('../assets/cam.png')}
                    onPress={() => {props.navigation.navigate({routeName: 'Stream'})}}
                />
                <ImageButton
                    source={require('../assets/lib.png')}
                    onPress={() => {props.navigation.navigate({routeName: 'Video'})}}
                />
                <ImageButton
                    source={require('../assets/cog.png')}
                    onPress={() => {props.navigation.navigate({routeName: 'Settings'})}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1, 
        padding: 10, 
        alignItems: 'center' 
    }, 
    buttonContainer: {
        flexDirection: 'column', 
        justifyContent: 'space-around', 
        marginTop: 20, 
        width: 100, 
        maxWidth: '80%'
    },
}); 

export default HomeScreen; 