import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground, Dimensions
} from 'react-native';

export default class Cross extends Component {
  render() {
    let fullWidth = Dimensions.get('window').width;
    let fullHeight = Dimensions.get('window').height;
    const { xTranslate, yTranslate, color } = this.props;
    return (
      <View style={[styles.container, {
        transform: [
          { translateX: (xTranslate ? xTranslate : 10) + 40 },
          { translateY: (yTranslate ? yTranslate : 10) - 12 },
        ]
      }]}>
        <ImageBackground source={require('../assets/images/ic_cha.png')} style={styles.bgImg}>
          {/*<View style={[styles.line, {*/}
            {/*transform: [*/}
              {/*{ rotate: '45deg' },*/}
            {/*],*/}
            {/*backgroundColor: color ? color : '#000'*/}
          {/*}*/}
          {/*]}/>*/}
          {/*<View style={[styles.line, {*/}
            {/*transform: [*/}
              {/*{ rotate: '135deg' },*/}
            {/*],*/}
            {/*backgroundColor: color ? color : '#000'*/}
          {/*}*/}
          {/*]}/>*/}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 60,
    height: 60,
    left: Dimensions.get('window').height > 810 ?  -28 : -22,
    marginTop: Dimensions.get('window').height > 810 ?  110 : Dimensions.get('window').height > 733 ? 75 : 44,
  },
  line: {
    position: 'absolute',
    width: 5,
    height: 105,
  },
  bgImg:{
    width: '100%',
    height: '100%'
  }
});
