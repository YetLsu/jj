import { AppRegistry, Platform } from 'react-native'
import React from 'react'

import AppEntry from './AppEntry';
AppRegistry.registerComponent('NineOneCP', () => AppEntry);
if (Platform.OS === 'web') {
  AppRegistry.runApplication('NineOneCP', {
    rootTag: document.getElementById('root'),
  })
}
