import React from 'react'; 
import {Text, View, StyleSheet} from 'react-native'; 
import Colors from '../constants/colors';

const Footer = props => {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerTitle}>
                This is a footer
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        width: '100%', 
        height: 90, 
        paddingTop: 36, 
        backgroundColor: Colors.primary, 
        alignItems: 'center', 
        justifyContent: 'center'
    }, 
    footerTitle: {
        color: 'black', 
        fontSize: 18
    }
});

export default Footer; 