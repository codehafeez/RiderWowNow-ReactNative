import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  StatusBar,
  ImageBackground,
  Keyboard,
  Alert,
  Image,
  ToastAndroid
} from 'react-native';
import { Spinner, Button, Item, Input, Icon } from 'native-base';
import { AsyncStorage } from 'react-native';
const THEME_COLOR = '#EC9B56';
export default class Login extends Component {

  static navigationOptions = ({ navigation }) => ({ header: null })
  constructor(props) {
    super(props);
    this.state = {
      email: "", password: "", error_msg_text: "", error_msg: false, login_button_click: false,
    }
  }

  onButtonPress() {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const { email, password } = this.state;

    if (reg.test(email) === false) {
      this.setState({ error_msg: true });
      this.setState({ error_msg_text: "Please enter a valid email address." });
    }
    else if (password.length < 6) {
      this.setState({ error_msg: true });
      this.setState({ error_msg_text: "Sorry!, Password should be > 5 char." });
    }
    else {
      this.setState({ login_button_click: true });
      this.setState({ error_msg: false });
      this.login_wordpress_api_function(email, password);
    }
  }

  renderErrorMsgFunction() {
    if (this.state.error_msg === true) {
      return (<View><Text style={styles.error_msg_style}>{this.state.error_msg_text}</Text></View>)
    }
  }

  renderLoginButtonFunction() {
    if (this.state.login_button_click === false) {
      return (<View>
        <Button rounded block iconLeft
          onPress={() => this.onButtonPress()}
          style={styles.button}>
          <Text style={{ color: 'white' }}>Login</Text>
          <Icon name="log-in" />
        </Button>
      </View>)
    }
    else {
      return (<View><Spinner size='large' color={THEME_COLOR} /></View>)
    }
  }


  login_wordpress_api_function(email, password) {
    fetch('http://wownow.pk/react-native-rider-app-api/login.php',
      {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password
        })

      }).then((response) => response.json()).then((responseJson) => {
        this.setState({ login_button_click: false });
        if (responseJson.msg === "Success") {
          this.setState({ error_msg: false });
          AsyncStorage.setItem('session_login_email', email);
          AsyncStorage.setItem('session_login_password', password);
          this.props.navigation.navigate('HomeNav')
        }
        else {
          this.setState({ error_msg: true });
          this.setState({ error_msg_text: responseJson.msg });
        }

      }).catch((error) => {
        this.setState({ login_button_click: false });
        alert(error);
      });
  }



  render() {
    return (
      <View style={styles.bg}>
        <StatusBar backgroundColor={THEME_COLOR} />
        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'black', opacity: 0.7 }} />
        <Text style={styles.logo}>Login</Text>

        <View behavior="padding" style={{ alignItems: 'center' }}>
          <Item rounded style={{ width: 250, marginTop: 10, backgroundColor: 'rgba(0,0,0,0.4)' }} >
            <Input
              onChangeText={email => this.setState({ email: email })}
              value={this.state.email}
              placeholder="Email"
              placeholderTextColor="rgba(255,255,255,0.7)"
              autoCorrect={false}
              keyboardType="email-address"
              style={{ color: '#fff', textAlign: "center" }}
            />
          </Item>
          <Item rounded style={{ marginTop: 10, width: 250, backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <Input onChangeText={pass => this.setState({ password: pass })}
              value={this.state.password}
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.7)"
              autoCorrect={false}
              keyboardType="default"
              style={{ color: '#fff', textAlign: "center" }}
              secureTextEntry
            />
          </Item>


          {this.renderErrorMsgFunction()}
          {this.renderLoginButtonFunction()}

        </View>

        {/* <Text onPress={() => this.props.navigation.navigate('SignUp')} style={styles.signup}>
          Don't have account? Sign Up
        </Text> */}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.9)'
  },
  error_msg_style: {
    color: 'white',
    marginTop: 20,
    fontSize: 16
  },
  bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  logoImage: {
    width: 100,
    height: 100,
    marginTop: 20
  },
  logo: {
    fontSize: 35,
    textAlign: 'center',
    color: THEME_COLOR,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitle: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 80,
    fontSize: 16
  },
  signup: {
    textAlign: 'center',
    color: 'white',
    marginTop: 20,
    fontSize: 16
  },
  signupBlue: {
    textAlign: 'center',
    color: THEME_COLOR,
    marginTop: 20,
    fontSize: 16
  },
  button: {
    marginTop: 20,
    width: 250,
    backgroundColor: THEME_COLOR
  }
});
