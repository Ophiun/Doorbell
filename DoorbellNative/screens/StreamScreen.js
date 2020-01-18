import React from 'react'; 
import {View, Text, StyleSheet, Button} from 'react-native'; 

const StreamScreen = props => {

    return(
        <View style={styles.screen}>
            <Text>This is the stream view</Text>
            <View style={styles.buttonContainer}>
                <Button 
                    title="SNAPSHOT" 
                    // bind(objectReferringTo, first argument by function)
                    
                />
                <Button 
                    title="UNLOCK" 
                    // bind(objectReferringTo, first argument by function)
                    
                />
                <Button 
                    title="SPEAK" 
                    // bind(objectReferringTo, first argument by function)
                    
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
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        marginTop: 20, 
        width: 300, 
        maxWidth: '80%'
    },
}); 

export default StreamScreen; 