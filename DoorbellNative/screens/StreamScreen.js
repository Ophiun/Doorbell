import React from 'react'; 
import {View, Text, StyleSheet, Button} from 'react-native'; 

import ImageButton from '../components/ImageButton';

const StreamScreen = props => {

    return(
        <View style={styles.screen}>
            <Text>This is the stream view</Text>
            <View style={styles.buttonContainer}>
                <ImageButton>SNAPSHOT</ImageButton>
                <ImageButton>HOLD TO SPEAK</ImageButton>
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
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        marginRight: 30, 
         
        maxWidth: '80%', 
    },
}); 

export default StreamScreen; 