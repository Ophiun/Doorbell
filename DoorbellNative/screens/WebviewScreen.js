
import React from 'react'; 
import {View, Text, StyleSheet, Button} from 'react-native'; 

import ImageButton from '../components/ImageButton';

import {WebView} from 'react-native-webview'; 


export default class WebviewScreen extends React.Component {
    render() {
        return(
            <WebView
                        source={{ uri: 'http://192.168.0.13:8000/index.html'}}                        
            />

        );
    }

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

//export default StreamScreen; 
