import React from 'react';
import {View,Text,StyleSheet, Button,Image} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import BodyText from '../components/BodyText';
import Color from '../screens/constants/Colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props =>{
    return(
        <View style = {styles.screen}>
            <BodyText style={styles.text}>Thank You</BodyText>
            {/* <View style ={styles.imageContainer}> */}
                <Image source={require('../assets/robot.png') } 
                style ={styles.image}
                resizeMode="cover"/>
                {/* </View> */}
            <BodyText style={styles.text}>I Guessed Your Number<Text style={styles.highlight}> {props.userNumber} </Text> 
                             in<Text style={styles.highlight}> {props.roundsNumber}</Text> Tries</BodyText>
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
    );
};
const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        // width:'100%',
        // height:'100%'
        width:"50%",
        height:"50%"
    },
    text:{
        marginTop:10,
        marginBottom:30,
    },
    imageContainer:{
        width:300,
        height:300,
        borderRadius:150,
        borderWidth:3,
        borderColor:'black',
        overflow:'hidden',
        marginVertical:20
    },
    highlight:{
        color:Color.primary    }
});

export default GameOverScreen;