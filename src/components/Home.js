import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Footer, FooterTab, Content } from 'native-base';
import { AsyncStorage } from 'react-native';
const THEME_COLOR = '#EC9B56';
export default class Home extends Component {

  static navigationOptions = { header: null }
  constructor() {
    super();
    this.state = { session_login_email: "", }
    AsyncStorage.getItem('session_login_email').then((value) => this.setState({ session_login_email: value }))
  }

  logout_function() {
    AsyncStorage.removeItem('session_login_email');
    AsyncStorage.removeItem('session_login_password');
    this.props.navigation.navigate('LoginNav')
  }

  render() {
    return (
      <Container>


        <Header androidStatusBarColor="#EC9B56" style={styles.bgColor_tab}>
          {/* <Left></Left> */}
          <Body style={{ paddingLeft: 10 }}>
            <Title>Order List</Title>
          </Body>
          <Right>
            <Button onPress={() => this.logout_function()} transparent>
              <Icon name='log-out' />
            </Button>
          </Right>
        </Header>


        <Content></Content>




        <Footer>
          <FooterTab>
            <Button style={styles.bgColor_tab_active} vertical>
              <Icon style={styles.fontColor_tab} name="home" />
              <Text style={styles.fontColor_tab}>Home</Text>
            </Button>
            <Button onPress={() =>
              this.props.navigation.navigate('Profile', {
                email: this.state.session_login_email
              })
            } style={styles.bgColor_tab} vertical>
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
  fontColor_tab: {
    color: 'white',
  },
  bgColor_tab_active: {
    backgroundColor: "#CF8547",
  },
});

