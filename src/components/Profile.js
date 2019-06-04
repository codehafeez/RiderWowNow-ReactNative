import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  TextInput,
} from 'react-native';
import { List, Container, Header, Title, Button, Right, Body, Icon, Badge, Footer, FooterTab, Content } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import TextInputMask from 'react-native-text-input-mask';
const THEME_COLOR = '#EC9B56';
export default class Profile extends Component {


  /* Start - Camera Image Code */
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
        this.setState({ avatar: source });
      }
    });
  }
  /* End - Camera Image Code */




  static navigationOptions = { header: null }
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      edit_view: false,
      display_name: "", email: "", mobile_number: "", address: "",
      display_name_new: "", mobile_number_new: "", address_new: "",
    }

    const { navigation } = this.props;
    this.load_db_function(navigation.getParam('email'));
  }

  load_db_function(email) {
    fetch('http://wownow.pk/react-native-rider-app-api/profile_view.php',
      {
        method: 'POST',
        body: JSON.stringify({ email: email })
      }).then((response) => response.json()).then((responseJson) => {
        this.setState({
          email: email,
          display_name: responseJson.display_name,
          mobile_number: responseJson.mobile_number,
          address: responseJson.address,

          display_name_new: responseJson.display_name,
          mobile_number_new: responseJson.mobile_number,
          address_new: responseJson.address,
        })
      }).catch((error) => {
        alert(error);
      });
  }

  edit_view_function() {
    this.setState({ edit_view: true });
  }

  edit_view_close_function() {
    this.setState({
      edit_view: false,
      display_name_new: this.state.display_name,
      mobile_number_new: this.state.mobile_number,
      address_new: this.state.address
    })
  }

  update_view_function() {
    this.setState({ edit_view: false });
    const { display_name_new, email_new, mobile_number_new, address_new } = this.state;
    fetch('http://wownow.pk/react-native-rider-app-api/profile_update.php',
      {
        method: 'POST',
        body: JSON.stringify({
          display_name: display_name_new,
          email: email_new,
          mobile_number: mobile_number_new,
          address: address_new,
        })

      }).then((response) => response.json()).then((responseJson) => {

        this.setState({
          display_name: display_name_new,
          mobile_number: mobile_number_new,
          address: address_new,
        })

      }).catch((error) => {
        this.setState({ login_button_click: false });
        alert(error);
      });
  }

  renderEditViewFunction() {
    if (this.state.edit_view !== true) {
      return (
        <Button onPress={() => this.edit_view_function()} transparent>
          <Icon name='create' />
        </Button>
      );
    }
    else {
      return (
        <Button onPress={() => this.edit_view_close_function()} transparent>
          <Icon name='close' />
        </Button>
      );
    }
  }


  renderUpdateViewFunction() {
    if (this.state.edit_view === true) {
      return (
        <Content>
          <List style={styles.listdata}>
            <Text style={styles.input_text_view}>Name</Text>
            <TextInput style={styles.input}
              value={this.state.display_name_new}
              onChangeText={(display_name_new) => this.setState({ display_name_new })}
            />
            <Text style={styles.input_text_view}>Email</Text>
            <TextInput editable={false} style={styles.input} value={this.state.email} />


            <Text style={styles.input_text_view}>Mobile Number</Text>
            <TextInputMask
              style={styles.input} value={this.state.mobile_number_new}
              onChangeText={(mobile_number_new) => this.setState({ mobile_number_new })}
              mask={"+92 ([000]) [0000000]"}
            />

            <Text style={styles.input_text_view}>Address</Text>
            <TextInput style={styles.input_address} numberOfLines={4} multiline={true}
              value={this.state.address_new}
              onChangeText={(address_new) => this.setState({ address_new })}
            />
          </List>
          <Button onPress={() => this.update_view_function()} rounded block iconLeft
            style={styles.button}>
            <Text style={{ color: 'white' }}>Update Profile</Text>
          </Button>
        </Content>
      );
    }
    else {
      return (
        <Content>
          <List style={styles.listdata}>
            <Text style={styles.input_text_view}>Name</Text>
            <TextInput editable={false} style={styles.input} value={this.state.display_name} />
            <Text style={styles.input_text_view}>Email</Text>
            <TextInput editable={false} style={styles.input} value={this.state.email} />
            <Text style={styles.input_text_view}>Mobile Number</Text>
            <TextInput editable={false} style={styles.input} value={this.state.mobile_number} />
            <Text style={styles.input_text_view}>Address</Text>
            <TextInput editable={false} style={styles.input_address}
              underlineColorAndroid="transparent"
              numberOfLines={4}
              multiline={true} value={this.state.address} />
          </List>
        </Content>
      );
    }
  }


  render() {
    return (
      <Container>


        <Header androidStatusBarColor="#EC9B56" style={styles.bgColor_tab}>
          <Body style={{ paddingLeft: 10 }}>
            <Title>Profile</Title>
          </Body>
          <Right>
            {this.renderEditViewFunction()}
          </Right>
        </Header>


        <TouchableOpacity style={styles.camera_image} onPress={this.onImagePress}>
          {
            this.state.avatar === '' ? <Image circle style={{ borderRadius: 80, width: 130, height: 130 }} source={require('../images/default.png')} /> :
              this.state.avatar !== '' && <Image circle style={{ borderRadius: 80, width: 130, height: 130 }} source={this.state.avatar} />
          }
        </TouchableOpacity>
        {this.renderUpdateViewFunction()}


        <Footer>
          <FooterTab>
            <Button onPress={() => this.props.navigation.navigate('Home')} style={styles.bgColor_tab} vertical>
              <Icon style={styles.fontColor_tab} name="home" />
              <Text style={styles.fontColor_tab}>Home</Text>
            </Button>
            <Button style={styles.bgColor_tab_active} vertical>
              <Icon style={styles.fontColor_tab} name="person" />
              <Text style={styles.fontColor_tab}>Profile</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('History')} style={styles.bgColor_tab} vertical>
              <Icon style={styles.fontColor_tab} name="clock" />
              <Text style={styles.fontColor_tab}>History</Text>
            </Button>
          </FooterTab>
        </Footer>


      </Container>
    );
  }
}




const styles = StyleSheet.create({
  bgColor_tab: {
    backgroundColor: THEME_COLOR
  },
  camera_image: {
    marginTop: -40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fontColor_tab: {
    color: 'white',
  },
  bgColor_tab_active: {
    backgroundColor: "#CF8547",
  },
  button: {
    marginBottom: 25,
    marginLeft: '20%',
    marginRight: '20%',
    width: 250,
    backgroundColor: THEME_COLOR,
  },
  avatar: {
    marginTop: 10,
    width: 160,
    height: 160,
    borderRadius: 93,
    borderWidth: 4,
    borderColor: "white",
    alignSelf: 'center',
    position: 'absolute',
  },
  input: {
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    height: 40,
    borderColor: '#000',
    borderWidth: 1
  },
  input_address: {
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 25,
    marginLeft: 15,
    marginRight: 15,
    height: 60,
    borderColor: '#000',
    borderWidth: 1
  },
  input_text_view: {
    marginLeft: 15,
    fontWeight: 'bold',
  },
  listdata: {
    marginLeft: 20,
    marginRight: 20,
  }
});

