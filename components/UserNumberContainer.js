import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

import Colors from '../screens/constants/Colors';

const UserNumberContainer = props =>{
    return(
        <View style ={styles.container}>
            <Text style = {styles.number}>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        borderWidth:2,
        borderColor:"black",
        padding:10,
        borderRadius:30,
        marginVertical:10,
        alignItems:'center',
        justifyContent:'center'

    },
    number:{
        color:Colors.user,
        fontSize:22

    }
});

export default UserNumberContainer;