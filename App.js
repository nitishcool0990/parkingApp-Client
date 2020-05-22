import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Home from './app/Screens/Home';
import Login from './app/Screens/Login';
import Registration from './app/Screens/Registration';
import SplashScreen from './app/Screens/SplashScreen';
import Intro from './app/Screens/intro';
import Booking from './app/Screens/Booking';
import Parking from './app/Screens/Parking';
import Payment from './app/Screens/Payment';
import Favourite from './app/Screens/Favourite';

export default class App extends React.Component {
  render = () => {
    return (
      <Router>
        <Stack key="root" hideNavBar>
          <Scene key="splashscreen" component={SplashScreen} />
          <Scene key="home" component={Home} initial/>
          <Scene key="login" component={Login} title="Login" />
          <Scene key="register" component={Registration} title="Register" />
          <Scene key="intro" component={Intro} title="Register" />
          <Scene key="booking" component={Booking} title="Register" />
          <Scene key="parking" component={Parking} title="Register" />
          <Scene key="payment" component={Payment} title="Register" />
          <Scene key="favourite" component={Favourite} title="Register" />
        </Stack>
      </Router>
    );
  }
} 