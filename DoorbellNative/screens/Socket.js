import React from 'react'; 
import io from 'socket.io-client'; 
import {Text, View} from 'react-native'
export default class App extends React.Component {
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
    render(){
        <View>
            <Text> 
                {this.output}
            </Text> 
        </View>

    }
}