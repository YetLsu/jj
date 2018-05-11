import {Text , StyleSheet} from 'react-native'
import React from 'react'

import AppView from './app/components/App'
const App = () =>{
    return <AppView />
}
export default App

const styles = StyleSheet.create({
    text:{
        marginTop: 100,
        alignSelf: 'center',
        fontSize: 50
    }
})