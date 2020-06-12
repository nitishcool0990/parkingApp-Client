import React from 'react';
import { Router, Stack, Scene, Drawer } from 'react-native-router-flux';
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
import AddVehicle from './app/Screens/AddVehicle';
import SideMenu from './app/Screens/SideMenu';
import ParkDetails from './app/Screens/ParkDetails';
import AddReview from './app/Screens/AddReview';
import Wallet from './app/Screens/Wallet';
import AddVehiclepark from './app/Screens/AddVehiclePark';
import MyPark from './app/Screens/MyPark';
import LocationSelecterMap from './app/Screens/LocationSelecterMap';


export default class App extends React.Component {
  render = () => {
    return (
      <Router>
        <Stack key="root" hideNavBar>

          <Scene key="splashscreen" component={SplashScreen} initial />
          <Scene key="login" component={Login} title="Login" />
          <Scene key="login2" component={Login2} title="Login2" />
          <Scene key="register" component={Registration} title="Register" />
          <Scene key="verification" component={Verification} title="Verification" />
          <Scene key="account" component={Account} title="Account" />
          <Scene key="profile" component={Profile} title="Profile" />
          <Scene key="vehicles" component={Vehicles} title="Vehicles" />
          <Scene key="addvehicles" component={AddVehicle} title="Add Vehicles" />

          <Stack key="main" type={'replace'} hideNavBar panHandlers={null}>
            <Drawer
              key={'drawer'}
              hideNavBar={true}
              drawerWidth={250}
              drawerPosition={'left'}
              // drawerIcon={drawerIcon}
              drawerOpenRoute="DrawerOpen"
              drawerCloseRoute="DrawerClose"
              contentComponent={SideMenu}
            >
              <Scene key="home" component={Home} hideNavBar />
            </Drawer>
            
            <Scene key="intro" component={Intro} title="Intro" />
            <Scene key="parking" component={Parking} title="Parking" />
            <Scene key="payment" component={Payment} title="Payment" />
            <Scene key="newpaymentmethods" component={NewPaymentMethods} title="New Payment Method" />      
            <Scene key="favourite" component={Favourite} title="Favourite" />
            <Scene key="booking" component={Booking} title="Booking"/>
            <Scene key="parkdetails" component={ParkDetails} title="Park Details" />
            <Scene key="addreview" component={AddReview} title="Add Review" />
            <Scene key="wallet" component={Wallet} title="Wallet" />
            <Scene key="addvehiclepark" component={AddVehiclepark} title="Add Vehicle Park" />
            <Scene key="mypark" component={MyPark} title="My Park" />
            <Scene key="locationselectmap" component={LocationSelecterMap} title="Location Selecter Map"/>
          </Stack>
        </Stack>
      </Router>
    );
  }
} 