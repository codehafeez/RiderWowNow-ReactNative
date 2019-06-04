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
  TouchableOpacity,
  Image,
} from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Footer, FooterTab, Content, Card, CardItem } from 'native-base';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
const THEME_COLOR = '#EC9B56';
export default class History extends Component {

  static navigationOptions = { header: null }
  constructor(props) {
    super(props);
    this.state = {
      tableData: [
        ['Order ID', '343242'],
        ['Customer Name', 'Hafeez'],
        ['Payment Method', 'Paypal'],
        ['Address', 'Sukkur Pakistan']
      ]
    }
  }

  render() {
    const state = this.state;
    return (
      <Container>


        <Header androidStatusBarColor="#EC9B56" style={styles.bgColor_tab}>
          <Body style={{ paddingLeft: 10 }}>
            <Title>Order History</Title>
          </Body>
        </Header>



        <Content style={{ margin: 20 }}>
          <Card>
            <CardItem>
              <View style={styles.container_table}>
                <Table borderStyle={{ borderColor: '#fff' }}>
                  <Rows data={state.tableData} textStyle={styles.text} />
                </Table>
              </View>
            </CardItem>
          </Card>
        </Content>



        <Footer>
          <FooterTab>
            <Button onPress={() => this.props.navigation.navigate('Home')} style={styles.bgColor_tab} vertical>
              <Icon style={styles.fontColor_tab} name="home" />
              <Text style={styles.fontColor_tab}>Home</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Profile')} style={styles.bgColor_tab} vertical>
              <Icon style={styles.fontColor_tab} name="person" />
              <Text style={styles.fontColor_tab}>Profile</Text>
            </Button>
            <Button style={styles.bgColor_tab_active} vertical>
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
  container_table: {
    flex: 1, backgroundColor: '#fff'
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }

});

