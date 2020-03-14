import React from 'react'; 
import {View, Text, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native'; 

const ImageButton = props => {
    // Props 
        // source={link to image }
        // onPress={Function On Press}
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.imageContainer}
        >
            
                <ImageBackground 
                    source={props.source}
                    style={styles.image}
                >
                    <View style={styles.textContainer}>
                        <Text>
                            {props.children}
                        </Text>
                    </View>
                </ImageBackground>
            
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%', 
        height: '100%'
    }, 
    imageContainer: {
        borderRadius: 50, 
        borderWidth: 3, 
        borderColor: "black", 
        width: 100, 
        height: 100, 
        overflow: 'hidden', 
        marginVertical: 30,
    }, 
    textContainer:{
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: 1, 
        
    }
});

export default ImageButton;