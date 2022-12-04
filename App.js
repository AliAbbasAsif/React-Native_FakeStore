import React from 'react';
import {Text, View} from 'react-native';
import AppRouter from './Config/AppRouter';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Signup from './Screens/Signup';

function App() {
  return (
    <>
      <View>
        {/* <Signup /> */}
        {/* <Login/> */}
        {/* <Home/> */}
        <AppRouter/>
      </View>
    </>
  );
}

export default App;
