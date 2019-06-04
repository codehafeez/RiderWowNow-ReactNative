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
} from 'react-native';
import { Spinner, Button, Item, Input, Icon } from 'native-base';
import { AsyncStorage } from 'react-native';
const THEME_COLOR = '#EC9B56';
export default class SignUp extends Component {


  static navigationOptions = {
    // header: null,
    title: 'Register',
    headerStyle: {
      backgroundColor: THEME_COLOR,
    },
    headerTintColor: '#fff',
  }

  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      name: '',
      email: '',
      password: '',
      repassword: '',
      loading: false
    };
  }

  onButtonPress() {
    Keyboard.dismiss();
    const { name, email, password, repassword } = this.state;
    this.setState({ loading: true });
    if (name.length === 0 || password !== repassword || !this.validateEmail(email) || email.length === 0 || password.length < 5) {
      Alert.alert('Missing or Invalid Fields', 'Enter valid information then retry');
      this.setState({ loading: false });
    }
  }

  onImagePress = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: `data:image/jpeg;base64,${response.data}` };
        this.setState({
          avatar: source,
        });
      }
    });
  }

  validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size='large' color={THEME_COLOR} />;
    }
    return (
      <Button
        rounded
        block
        iconLeft
        onPress={this.onButtonPress.bind(this)}
        style={styles.button}
      >
        <Text style={{ color: 'white' }}>Sign Up</Text>
        <Icon name="log-in" />
      </Button>
    );
  }

  render() {

    // AsyncStorage.removeItem('name_login');

    return (
      <ImageBackground style={styles.bg}>
        <StatusBar backgroundColor={THEME_COLOR} />
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'black',
            opacity: 0.7
          }}
        />
        {/* <Text style={styles.logo}>SignUp</Text> */}

        <KeyboardAvoidingView behavior="padding" style={{ alignItems: 'center' }}>
          <View style={styles.view_fields}>
            <Item rounded style={styles.item}>
              <Input
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
                placeholder="Name"
                placeholderTextColor="rgba(255,255,255,0.7)"
                autoCorrect={false}
                keyboardType="default"
                style={{ color: '#fff', textAlign: "center" }}
              />
            </Item>
            <Item rounded style={styles.item} >
              <Input
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                placeholder="Email"
                placeholderTextColor="rgba(255,255,255,0.7)"
                autoCorrect={false}
                keyboardType="email-address"
                style={{ color: '#fff', textAlign: "center" }}
              />
            </Item>
            <Item rounded style={styles.item}>
              <Input
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                autoCorrect={false}
                keyboardType="default"
                style={{ color: '#fff', textAlign: "center" }}
                secureTextEntry
                error={this.state.password !== this.state.repassword}
              />
            </Item>
          </View>
        </KeyboardAvoidingView>

        <View style={{ alignItems: 'center' }}>
          {this.renderButton()}
        </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    width: 250,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.9)'
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
  button: {
    marginTop: 20,
    width: 250,
    backgroundColor: THEME_COLOR
  }
});
