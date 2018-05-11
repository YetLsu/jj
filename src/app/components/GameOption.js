import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from 'react-native';

import GameBoard from './GameBoard';

export default class GameOption extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      gameMode: 0 // 0: single player; 1: multiplayer
    };
  }

  startGame(e) {
    const mode = e;
    this.setState({
      gameMode: mode
    });
    setTimeout(() => {
      this.setState({
        gameStarted: true
      });
    }, 2);
  }

  render() {
    const { gameStarted, gameMode } = this.state;
    return (
      
      <View style={styles.container2}>
        
        {
          gameStarted ? (
            <GameBoard gameMode={gameMode}/>
          ) : (
            <ImageBackground source={require('../assets/images/bg_1.png')} style={styles.bgImg}>
              <View style={styles.container}>
                <View style={[styles.boxContainer, styles.firstBox]}>
                  <TouchableOpacity style={styles.btn} onPress={(e) => this.startGame(0)}>
                    <ImageBackground source={require('../assets/images/btn_single.png')} style={styles.btnImg}>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
                <View style={[styles.boxContainer,styles.twoBox]}>
                  <TouchableOpacity style={styles.btn} onPress={(e) => this.startGame(1)}>
                    <ImageBackground source={require('../assets/images/btn_multi.png')} style={styles.btnImg}>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          )
        }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container2:{
    width: Dimensions.get('window').width > 767 ?"100%" : 'auto',
    height:Dimensions.get('window').width > 767 ? "100%" : 'auto'
  },
  container: {
    // width: '100%',
    // height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  bgImg:{
    width: '100%',
    height: '100%'
  },
  btn: {
    width: 250,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

  },
  firstBox:{
    marginTop: Dimensions.get('window').width > 767 ?  400 : 350,
    
  },
  twoBox:{
    marginTop: Dimensions.get('window').width > 767 ?  490 : 30,
  },
  btnImg: {
    width: 250,
    height: 50,
  },
  btnText: {
    fontSize: 18
  },

  boxContainer: {
    marginBottom: 20,
  }
});
