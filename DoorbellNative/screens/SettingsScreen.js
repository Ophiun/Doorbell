import React from 'react'; 
import {View, Text, StyleSheet, Button} from 'react-native'; 

import ImageButton from '../components/ImageButton';


const SettingsScreen = props => {

    return(
        <View style={styles.screen}>
            <Text>This is the stream view</Text>
            <View style={styles.buttonContainer}>
                <ImageButton>SNAPSHOT</ImageButton>
                <ImageButton>SPEAK</ImageButton>
                <ImageButton>UNLOCK</ImageButton>
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

export default SettingsScreen; 