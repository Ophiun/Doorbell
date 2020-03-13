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
import React from 'react'; 
import {View, Text, StyleSheet, Button} from 'react-native'; 
import io from 'socket.io-client'; 
import ImageButton from '../components/ImageButton';

export default class HomeScreen extends React.Component {
    
    // Constructor 
    constructor(props){
        super(props);  
        this.state = { 
            status: 'connected'
        }
        this.buttonPress = this.buttonPress.bind(this);
        //this.connect = this.connect.bind(this);
    }

    componentDidMount () {
        this.setState({status: 'mounted'});
        // Check IP to mach ip of pie
        this.socket = io('http://192.168.0.26:9000', {transports: ['websocket']});  
        this.socket.on('button_press_recieved', () => {
            this.setState({status: 'Recieved'});
        });
    }

    buttonPress() {
        this.socket.emit('button_press');
        this.setState({status: 'sent'});
    }

    componentWillUnmount () {
        this.socket.close();
    }  

    // Create Websocket
    render(){
        return(
            <View style={styles.screen}>
                <View style={styles.buttonContainer}>
                    <Text> {this.state.status}</Text>
                    <Button title='CONNECT' onPress={() => this.buttonPress()}/>
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
