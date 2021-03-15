import React,{useState,useRef,useEffect} from 'react';
import {View,Text,StyleSheet,Alert, ScrollView} from 'react-native';
import { Entypo } from '@expo/vector-icons'; 

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import UserNumberContainer from '../components/UserNumberContainer';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import Colors from './constants/Colors';


const generateRandomBetween = (min,max,exclude) =>{
    min = Math.ceil(min);
    max = Math.floor(max);

    const rndNum = Math.floor(Math.random() * (max-min)) + min;

    if(rndNum === exclude){
        return generateRandomBetween(min,max,exclude);
    }
    else{
        return rndNum;
    }
};

const renderListItem = (value,numOfRounds) =>(
    <View key={value} style = {styles.listItem}>
        <Text>#{numOfRounds}</Text>
        <Text>{value}</Text>
        </View>
);


const GameScreen = props =>{
    const initialGuess = generateRandomBetween(1,100,props.userChoice);
    const[currentGuess, setCurrentGuess] = useState(initialGuess);
    const[pastGuesses,setPastGuesses] = useState([initialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const[rounds,setRounds] = useState(0);
 

    const {userChoice,onGameOver} = props;

    useEffect(()=>{
        if(currentGuess === userChoice){
            onGameOver(rounds);
        }
    },[currentGuess,userChoice,onGameOver]);

    const nextGuessHandler = direction =>{
        if((direction==='lower' && currentGuess < props.userChoice)||
           (direction==='greater' && currentGuess>props.userChoice)){
            Alert.alert("Don't Lie " , "i'm not that stupid",[{text:'Sorry',style:'cancel'}
        ]);
        return;
        }

        if(direction ==='lower'){
            currentHigh.current = currentGuess;
        }
        else{
            currentLow.current=currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current,currentHigh.current,currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(CurrRound=>CurrRound+1)
        setPastGuesses(curPastGuesses=>[nextNumber,...curPastGuesses])
    };

    return(
        <View style = {styles.screen}>
            <BodyText style = {styles.text}>Computer Guess</BodyText>
            <UserNumberContainer>{currentGuess}</UserNumberContainer>
            <Card style ={styles.button}>
                <MainButton style={styles.ButtonDecrease} onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Entypo name="chevron-with-circle-down" size={30} color="white" /></MainButton> 
                <MainButton style={styles.ButtonIncrease} onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Entypo name="chevron-with-circle-up" size={30} color="white" /></MainButton>
            </Card>
            <BodyText style={styles.text}> Your Number </BodyText>
            <NumberContainer>{props.userChoice}</NumberContainer>
            
            <View style = {styles.list}>
            <ScrollView contentContainerStyle={styles.listContent}>
                {pastGuesses.map((guess,index)=>renderListItem(guess,pastGuesses.length - index+"                            "))}
            </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    button:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20,
        width:400,
        maxWidth:'90%'
    },
    text:{
            fontSize: 20,
            marginVertical: 2
    },
    ButtonIncrease:{
        backgroundColor:'green'
    },
    ButtonDecrease:{
        backgroundColor:'red'
    },
    listItem:{
        borderColor:'#ccc',
        borderWidth:1,
        padding:15,
        marginVertical:10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-around'
        
    },
    list:{
        width:'80%',
        flex:1
    },
    listContent:{
        flexGrow:1,
        alignItems:'center',
        justifyContent:'flex-end'
    }
});

export default GameScreen;