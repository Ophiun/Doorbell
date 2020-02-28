import React from 'react'; 
import {View, Text, StyleSheet, Button} from 'react-native'; 

import ImageButton from '../components/ImageButton';

export default class HomeScreen extends React.Component {
    
    // Constructor 
    constructor(props){
        super(props); 

         
    }
    componentDidMount () {
        this.connect();

    }

    connect() {
        // Return Socket.io Object 
        this.socket = io('https://192.168.0.108:9000');   
        this.socket.emit('Hi DICK');
        this.socket.on ('button_press', () => {
            // handle code 
            // throw push 
            // Ack 
            this.socket.emit('button_confirmed'); 
        });
    }
    componentWillUnmount () {
        this.socket.close();
    }  

    // Create Websocket
    render(){
        return(
            <View style={styles.screen}>
                <View style={styles.buttonContainer}>
                    <ImageButton
                        source={require('../assets/cam.png')}
                        onPress={() => {
                            this.props.navigation.navigate({routeName: 'Stream'})
                            
                        }}
                    />
                    <ImageButton
                        source={require('../assets/lib.png')}
                        onPress={() => {this.props.navigation.navigate({routeName: 'Video'})}}
                    />
                    <ImageButton
                        source={require('../assets/cog.png')}
                        onPress={() => {this.props.navigation.navigate('Settings', {name: 'EVAN'})}}
                    />
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
        flexDirection: 'column', 
        justifyContent: 'space-around', 
        marginTop: 20, 
        width: 100, 
        maxWidth: '80%'
    },
}); 

//export default HomeScreen; 