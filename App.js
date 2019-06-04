import React, { Component } from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Login from './src/components/Login';
import SignUp from './src/components/SignUp';
import Home from './src/components/Home';
import Profile from './src/components/Profile';
import History from './src/components/History';
import { AsyncStorage, ToastAndroid, Text, ImageBackground, StyleSheet, StatusBar, View, } from 'react-native';
import { Spinner } from 'native-base';
const THEME_COLOR = '#EC9B56';
export default class App extends Component {

  constructor() {
    super();
    this.state = { isVisible: true, session_login_email: "", }
  }



  componentDidMount() {
    var thisVal = this;
    setTimeout(function () {
      thisVal.setState({ isVisible: false });
    }, 3000);
  }


  splash_screen_view_function = () => {
    if (this.state.isVisible == true) {
      return (
        <View>
          <ImageBackground style={styles.splash_screen_bg} source={require('./src/images/splashScreen.jpg')}>
            <StatusBar backgroundColor={THEME_COLOR} />
            <Spinner size='large' style={styles.splash_screen_spinner} color={THEME_COLOR} />
          </ImageBackground>
        </View>
      )
    }
    else {
      AsyncStorage.getItem('session_login_email').then((value) => this.setState({ session_login_email: value }))
      if (this.state.session_login_email !== null && this.state.session_login_email !== "") {
        return (this.home_view_function())
      }
      else {
        return (this.login_view_function())
      }
    }
  }



  home_view_function() { return (<HomeNav />); }
  login_view_function() { return (<MainNav />); }
  render() { return (this.splash_screen_view_function()); }

}




const HomeNav = createStackNavigator({
  Home: { screen: Home },
  Profile: { screen: Profile },
  History: { screen: History }
});
const LoginNav = createStackNavigator({
  Login: { screen: Login },
  SignUp: { screen: SignUp }
},
  {
    initialRouteName: 'Login'
  }
);

const MainNav = createSwitchNavigator({
  LoginNav: LoginNav,
  HomeNav: HomeNav,
});







const styles = StyleSheet.create({
  splash_screen_bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  splash_screen_spinner: {
    marginTop: 250,
  }
});
