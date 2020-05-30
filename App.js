import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Home from './app/Screens/Home';
import Login from './app/Screens/Login';
import Login2 from './app/Screens/Login2';
import Registration from './app/Screens/Registration';
import SplashScreen from './app/Screens/SplashScreen';
import Intro from './app/Screens/intro';
import Booking from './app/Screens/Booking';
import Parking from './app/Screens/Parking';
import Payment from './app/Screens/Payment';
import Favourite from './app/Screens/Favourite';
import Account from './app/Screens/Account';
import NewPaymentMethods from './app/Screens/NewPaymentMethods';
import Verification from './app/Screens/Verification';
import Profile from './app/Screens/Profile';
import Vehicles from './app/Screens/Vehicles';


export default class App extends React.Component {
  render = () => {
    return (
      <Router>
        <Stack key="root" hideNavBar>
          <Scene key="splashscreen" component={SplashScreen} initial/>
          <Scene key="home" component={Home}  />
          <Scene key="login" component={Login} title="Login" />
          <Scene key="login2" component={Login2} title="Login2" />
          <Scene key="login" component={Login} title="Login" />
          <Scene key="register" component={Registration} title="Register"/>
          <Scene key="intro" component={Intro} title="Intro" />
          <Scene key="booking" component={Booking} title="Booking" />
          <Scene key="parking" component={Parking} title="Parking" />
          <Scene key="payment" component={Payment} title="Payment" />
          <Scene key="favourite" component={Favourite} title="Favourite" />
          <Scene key="account" component={Account} title="Account" />
          <Scene key="newpaymentmethods" component={NewPaymentMethods} title="New Payment Method" />
          <Scene key="verification" component={Verification} title="Verification" />
          <Scene key="profile" component={Profile} title="Profile" />
          <Scene key="vehicles" component={Vehicles} title="Vehicles" />

        </Stack>
      </Router>
    );
  }
} 