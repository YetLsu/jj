import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground, Dimensions
} from 'react-native';

export default class Circle extends Component {
  render() {
    const { xTranslate, yTranslate, color } = this.props;
    return (
        <View style={[styles.container, {
          transform: [
            { translateX: xTranslate ? xTranslate : 20 },
            { translateY: yTranslate ? yTranslate : 20 },
          ],
        }]}>
          <ImageBackground source={require('../assets/images/ic_quan.png')} style={styles.bgImg}>
            <View style={styles.innerCircle}>
            </View>
          </ImageBackground>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    marginLeft: Dimensions.get('window').height > 810 ?  12 : 12,
    borderRadius: 40,
    marginTop: Dimensions.get('window').height > 810 ?  103 : Dimensions.get('window').height > 733 ? 68 : 32,
  },
  innerCircle: {
    // backgroundColor: '#F5FCFF',
    width: 30,
    height: 30,
    borderRadius: 35,
  },
  bgImg:{
    width: '100%',
    height: '100%'
  }
});
