/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground
} from 'react-native';

import Header from './Header';
import GameOption from './GameOption';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toOption: false
    };

  }

  startOption() {
    this.setState({ toOption: true });
  }

  fetchData = () => {
    let formData = new FormData();
    formData.append('type','2');
    formData.append('appid', 'com.b778.0fbe');
    formData.append('lan', 'en');
    fetch('http://zx.ixinjiapo28.com/Comment/record_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    }).then(data => {
      console.log(data);
    }).catch(err => {
      console.log(err);
    });
  };

  render() {
    this.fetchData()
    const { toOption } = this.state;
    const { gameEnd } = this.props;
    return (
        <View style={styles.container}>
          {
            gameEnd ? (
              <View/>
            ) : ''
          }
          {
            toOption || gameEnd ? (
              <GameOption/>
            ) : (
              <ImageBackground source={require('../assets/images/bg_1.png')} style={styles.bgImg}>
                <View style={{
                  justifyContent:'center',
                  alignItems:'center'
                }}>
                  <Text style={styles.welcome}>
                    WELCOME TO THE GAME!
                  </Text>
                  <TouchableOpacity onPress={() => this.startOption()}>
                    <Text style={styles.instructions}>
                      CLICK HERE TO START
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            )
          }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 26,
    color: '#F5F1B4',
    fontWeight: 'bold',
    marginTop: 320,
  },
  instructions: {
    marginTop: 20,
    color: '#C8C8C8',
    fontWeight: '900',
    fontSize: 20,
  },
  bgImg:{
    width: '100%',
    height: '100%'
  }
});
