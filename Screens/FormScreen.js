import React,{useState} from 'react';
import {StyleSheet,View,TextInput,TouchableOpacity,Text, ToastAndroid, Keyboard} from 'react-native';
import Toast from 'react-native-root-toast';
import ToastShow from "../Utils/ToastShow";

const FormScreen=props=>{

    const [latLong,setLatLong]=useState({
        latitude:'',
        longitude:''
    })

    const latitudeChangeHandler=text=>{
        setLatLong({
            ...latLong,
            latitude:text
        })
    }

    const longitudeChangeHnadler=text=>{
        setLatLong({
            ...latLong,
            longitude:text
        })
    }

    // const checkValidation=()=>{
    //     if(latLong.latitude===''){
    //         // Toast.show("Please Enter Latitude")
    //         ToastAndroid.show("Please Enter Latitude",ToastAndroid.SHORT);
    //         return false;
    //     }else if(latLong.longitude===''){
    //         // ToastShow('Please Enter Longitude');
    //         ToastAndroid.show("Please Enter Longitude",ToastAndroid.SHORT);

    //         return false;
    //     }else{
    //         return true;
    //     }
    // }
    const getData=props.navigation.getParam('getData');
    const submitBtnHandler=()=>{
        Keyboard.dismiss();
            getData(latLong)
            props.navigation.goBack();

    }

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center',padding:10}}>

        <TextInput
        keyboardType='numeric'
        placeholder="Enter Latitude..."
        style={styles.textInputStyle}
        onChangeText={latitudeChangeHandler}
        />

        <TextInput
        keyboardType='numeric'
        placeholder="Enter Latitude..."
        style={styles.textInputStyle}
        onChangeText={longitudeChangeHnadler}
        />
            <TouchableOpacity style={styles.buttonStyle} onPress={submitBtnHandler}>
                <Text style={styles.fontStyle}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    textInputStyle:{
        backgroundColor:'#99d6ff',
        borderRadius:30,
        marginVertical:10,
        width:'100%',
        fontSize:16,
    },
    fontStyle:{
        fontSize:20,
        color:'white'
    },
    buttonStyle:{
        marginTop:5,
        paddingHorizontal:25,
        paddingVertical:5,
        backgroundColor:'#008ae6',
        borderRadius:30,
    }
});

export default FormScreen;