import React from 'react';
import { createAppContainer } from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';
import FormScreen from '../Screens/FormScreen';
import HomeScreen from '../Screens/HomeScreen';

const MainNavigator=createStackNavigator({
    Home:{
        screen:HomeScreen,
        navigationOptions:{
            headerShown:false
        }
    },
    Form:{
        screen:FormScreen,
        navigationOptions:{
            headerShown:true,
            headerTitle:'Form Screen'
        }
    }
},
{
    initialRouteKey:'Home'
});

export default createAppContainer(MainNavigator);