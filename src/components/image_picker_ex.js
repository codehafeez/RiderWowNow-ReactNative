import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { Icon, Badge } from 'native-base';
import ImagePicker from 'react-native-image-picker';
export default class Login extends Component {


  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
    };
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
        this.setState({ avatar: source });
      }
    });
  }


  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onImagePress}>
          {
            this.state.avatar === '' ? <Image circle style={{ borderRadius: 50, width: 100, height: 100 }} source={require('../images/logo.png')} /> :
              this.state.avatar !== '' && <Image circle style={{ borderRadius: 50, width: 100, height: 100 }} source={this.state.avatar} />
          }
          <Badge style={{ position: 'absolute', backgroundColor: 'rgba(41, 128, 185,0.8)' }}>
            <Icon name="add" style={{ fontSize: 20, color: '#fff', lineHeight: 25 }} />
          </Badge>
        </TouchableOpacity>
      </View>
    );
  }
}
