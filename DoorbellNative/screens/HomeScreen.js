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
        this._dispatch = this._dispatch.bind(this); 
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
    _dispatch(message, data){
        var out = 'sent: ' + message;
        this.socket.emit({message}); 
        this.setState({status: out});
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
                    <Button title='CONNECT' onPress={() => this.dispatch('button_press', 0)}/>
                    <ImageButton
                        source={require('../assets/cam.png')}
                        onPress={() => {
                            this.props.navigation.navigate('Stream', {dispatch: this._dispatch})  
                        }}
                    />
                    <ImageButton
                        source={require('../assets/lib.png')}
                        onPress={() => {
                            this.props.navigation.navigate('Video', {dispatch: this._dispatch})
                        }}
                    />
                    <ImageButton
                        source={require('../assets/cog.png')}
                        onPress={() => {
                            this.props.navigation.navigate('Settings', {
                                dispatch: this._dispatch, 
                                name: 'Evan D'
                            })
                        }}
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