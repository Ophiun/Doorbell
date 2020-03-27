
import React from 'react'; 
import {View, Text, StyleSheet, Button} from 'react-native'; 

import ImageButton from '../components/ImageButton';
import {WebView} from 'react-native-webview'; 
import Video from 'react-native-video';


export default class StreamScreen extends React.Component {
    render() {
        return(
            <View style={{ flex: 1 }}>
                <WebView
                    source={{ uri: 'http://192.168.0.13:8000/index.html'}}                        
                />
                <View style={styles.screen}>
                    <View style={styles.buttonContainer}>
                        <ImageButton >
                            SNAPSHOT
                        </ImageButton>
                        <ImageButton>
                            SPEAK
                        </ImageButton>
                        <ImageButton onPress={() => this.props.navigation.state.params.dispatch('turn_off', 0)}>
                            UNLOCK
                        </ImageButton>
                    </View>
                </View>
            </View>
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
