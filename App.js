import React from 'react';
import MainNavigator from './Navigations/MainNavigator';
import {RootSiblingParent} from 'react-native-root-siblings';

const App=props=>{
  return(
    <RootSiblingParent>
    <MainNavigator/>
    </RootSiblingParent>
  )
}

export default App;
