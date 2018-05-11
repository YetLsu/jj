import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground
} from 'react-native';

import App from './App';
import Circle from './Circle';
import Cross from './Cross';
import { centerPoints, areas, conditions } from '../constants/game';

let round = 0; //for multiplayer used round = 0 is player1 round; round = 2 is player2 round

export default class GameBoard extends Component {

  constructor() {
    super();
    this.state = {
      gameEnd: false,
      userInputs: [],
      AIInputs: [], // if gameMode = 1 (multiplayer) then AIInputs set to be Player2 Inputs
      result: -1  // result: -1=Game in progress; 0=player win; 1=AI win; 2=Draw
      // result: 3=multiplayer circle Win; 4=multiplayer cross win
    };
  }

  endGame() {
    this.restart(); //for reset to initial state
    this.setState({
      gameEnd: true
    });
  }

  restart() {
    const { gameMode } = this.props;
    this.setState({
      userInputs: [],
      AIInputs: [],
      result: -1
    });
    if (gameMode === 1) {
      round = 0;
    }
  }

  clickSound() {
    // Import the react-native-sound module
    var Sound = require('react-native-sound');

// Enable playback in silence mode (iOS only)
    Sound.setCategory('Playback');

// Load the sound file 'click.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
    var click = new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      } else {
        click.play((success) => {
          if (success) {
            // console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
            // reset the player to its uninitialized state (android only)
            // this is the only option to recover after an error occured and use the player again
            click.reset();
          }
        });
      }
      // loaded successfully
      // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
    });

// Set sound volume
    click.setVolume(1);

// Position the sound to the full right in a stereo field
//         click.setPan(1);

// Loop indefinitely until stop() is called
    click.setNumberOfLoops(-1);

// Release the audio player resource
    click.release();
  }

  boarcClickHandler(e) {
    const { locationX, locationY } = e.nativeEvent;
    const { userInputs, AIInputs, result } = this.state;
    const inputs = userInputs.concat(AIInputs);
    const { gameMode } = this.props;

    const area = areas.find(d =>
      (locationX >= d.startX && locationX <= d.endX) &&
      (locationY >= d.startY && locationY <= d.endY)
    );

    if (area &&
      inputs.every(d => d !== area.id) &&
      result === -1
    ) {
      if (gameMode === 0) {
        this.setState({ userInputs: userInputs.concat(area.id) });
        this.clickSound();
        setTimeout(() => {
          this.componentDidUpdate();
          setTimeout(() => {
            this.AIAction();
          }, 3);
        }, 2);
      } else if (gameMode === 1) {
        this.clickSound();
        if (round === 0) {
          this.setState({ userInputs: userInputs.concat(area.id) });
          round = 1;
        } else if (round === 1) {
          this.setState({ AIInputs: AIInputs.concat(area.id) });
          round = 0;
        }

      }
    }
  }

  AIAction() {
    const { result } = this.state;
    while (result === -1) {
      const { userInputs, AIInputs } = this.state;
      const randomNumber = Number.parseInt(Math.random() * 9);

      if (userInputs.concat(AIInputs).every(d => d !== randomNumber)) {
        this.setState({ AIInputs: AIInputs.concat(randomNumber) });
        break;
      }
    }
  }

  judgeWinner(inputs) {
    return conditions.some(d => d.every(item => inputs.indexOf(item) !== -1));
  }

  componentDidUpdate() {
    const { userInputs, AIInputs, result } = this.state;
    const inputs = userInputs.concat(AIInputs);
    const { gameMode } = this.props;

    if (gameMode === 0) {
      if (inputs.length >= 5) {
        let res = this.judgeWinner(userInputs);
        if (res && result !== 0) {
          this.setState({ result: 0 });
          return;
        }
        res = this.judgeWinner(AIInputs);
        if (res && result !== 1) {
          this.setState({ result: 1 });
          return;
        }
      }
    } else if (gameMode === 1)
      if (inputs.length >= 5) {
        let res = this.judgeWinner(userInputs);
        if (res && result !== 3) {
          this.setState({ result: 3 });
          return;
        }
        res = this.judgeWinner(AIInputs);
        if (res && result !== 4) {
          this.setState({ result: 4 });
          return;
        }
      }

    if (inputs.length >= 9 && result === -1) {
      this.setState({ result: 2 });
    }
  }

  render() {
    let fullWidth = Dimensions.get('window').width; //full width
    let fullHeight = Dimensions.get('window').height; //full height
    const { gameEnd, userInputs, AIInputs, result } = this.state;
    const { gameMode } = this.props;
    return (
      <View>
        {
          gameEnd ? (
            <App gameEnd={true}/>
          ) : (
              <View style={{
                flex: 1,
                flexDirection:'row',
                justifyContent: 'center',
                width: fullWidth
              }}>
                <Image style={{
                  flex: 1,
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                }} source={require('../assets/images/bg_2.png')}/>
                <View style={[styles.JudgeMessage, styles.roundIndicator]}>
                  {gameMode === 1 && <View>
                    {
                      round === 0 && <Text style={styles.Text}>Circle Turn</Text>
                    }
                    {
                      round === 1 && <Text style={styles.Text}>Cross Turn</Text>
                    }</View>
                  }
                </View>
                <View style={styles.container}>
                  <TouchableWithoutFeedback onPress={e => this.boarcClickHandler(e)}>
                  
                    <View style={styles.board}>
                    <ImageBackground source={require('../assets/images/board_bg.png')} style={styles.board_bg}>
                      <View style={[styles.line, {
                        width: 3,
                        height: 306,
                        transform: [
                          { translateX: 100 }
                        ]
                      }]}/>
                      <View style={[styles.line, {
                        width: 3,
                        height: 306,
                        transform: [
                          { translateX: 203 }
                        ]
                      }]}/>
                      <View style={[styles.line, {
                        width: 306,
                        height: 3,
                        transform: [
                          { translateY: 100 }
                        ]
                      }]}/>
                      <View style={[styles.line, {
                        width: 306,
                        height: 3,
                        transform: [
                          { translateY: 203 }
                        ]
                      }]}/>
                    </ImageBackground>
                    </View>
                  
                  </TouchableWithoutFeedback>
                  {
                    userInputs.map((d, i) => (
                      <Circle
                        key={i}
                        xTranslate={centerPoints[d].x}
                        yTranslate={centerPoints[d].y}
                        color='deepskyblue'
                      />
                    ))
                  }
                  {
                    AIInputs.map((d, i) => (
                      <Cross
                        key={i}
                        xTranslate={centerPoints[d].x}
                        yTranslate={centerPoints[d].y}
                        color='red'
                      />
                    ))
                  }
                  <View style={styles.JudgeMessage}>
                    {
                      result === 2 && <Image source={require('../assets/images/ic_draw.png')}  style={styles.fontImg}/>
                    }
                    {
                      result === 0 && <Image source={require('../assets/images/ic_win.png')}  style={styles.fontImg}/>
                    }
                    {
                      result === 1 && <Image source={require('../assets/images/ic_lose.png')}  style={styles.fontImg}/>
                    }
                    {
                      result === 3 && <Image source={require('../assets/images/ic_circlewin.png')}  style={styles.fontImg}/>
                    }
                    {
                      result === 4 && <Image source={require('../assets/images/ic_crosswin.png')}  style={styles.fontImg}/>
                    }
                    {
                      result !== -1 &&
                      <View>
                        <TouchableOpacity onPress={() => this.restart()}>
                          <View style={[styles.menuButton, styles.lastBtn]}>
                            <Text style={{
                              color: '#FFF',
                              fontSize: 20,
                              fontWeight: '900',
                            }}>
                              CLICK HERE TO RESTART
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.endGame()}>
                          <View style={styles.menuButton}>
                            <Text style={{
                              color: '#FFF',
                              fontSize: 20,
                              fontWeight: '900',
                            }}>
                              BACK TO THE MENU
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    }
                  </View>
                </View>
              </View>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
  },
  roundIndicator: {
    position: 'absolute',
    transform: [
      { translateX: 60 },
      { translateY: -60 },
    ]
  },
  board: {
    width:  Dimensions.get('window').height > 810 ?  312 : 312,
    width:  Dimensions.get('window').height > 810 ?  312 : Dimensions.get('window').width > 733 ? 384 : 312 ,
    // height: Dimensions.get('window').height > 810 ?  560 : Dimensions.get('window').height > 733 ? 380 : 312 ,
    height: Dimensions.get('window').height > 810 ?  312 : Dimensions.get('window').height > 733 ? 315 : 312 ,
    marginTop: Dimensions.get('window').height > 810 ?  83 : Dimensions.get('window').height > 733 ? 48 : 23,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  board_bg:{
    width:'100%',
    height:'100%'
  },
  line: {
    position: 'absolute',
    // backgroundColor: '#000',
    // borderWidth: 2,
    // borderColor: '#fff',
  },
  JudgeMessage: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  fontImg:{
    marginBottom: 20,
    marginTop: 40,
    position: 'relative',
    top: Dimensions.get('window').height > 810 ?  20 : 0
  },
  Text: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 40,
    marginTop: 20,
    position: 'relative',
    top: Dimensions.get('window').height > 810 ?  20 : 0
  },
  menuButton: {
    height: 30,
    alignItems: 'center',
    position: 'relative',
    top: Dimensions.get('window').height > 810 ?  20 : 0
  },
  lastBtn:{
    marginBottom: 15,
  }
});
