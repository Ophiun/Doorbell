import React from 'react'; 
import {View, Text, StyleSheet, Button} from 'react-native'; 

import ImageButton from '../components/ImageButton';

import Video from 'react-native-video';

const StreamScreen = props => {

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
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        marginVertical: 30,  
        maxWidth: '90%', 
    },
}); 

export default StreamScreen; 