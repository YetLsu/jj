import React from "react";
import { StyleSheet,View,Text } from "react-native";
import PropTypes from 'prop-types'
import * as Progress from "react-native-progress";
const propTypes = {
  sysncMessage : PropTypes.string,
  sysncProgress :PropTypes.number,
  indeterminate : PropTypes.bool,
}
const HotUpdateView = ({sysncMessage,sysncProgress,indeterminate}) =>(
    <View style={styles.codepushContainer}>
    <Text style={styles.codepushWelcome}>欢迎您,请等待更新完成</Text>
    <Text style={styles.codePushText}>{sysncMessage}</Text>
    <Progress.Bar
      style={styles.progressStyle}
      progress={sysncProgress}
      indeterminate={indeterminate}
    />
  </View>
)
export default HotUpdateView


const styles = ({
    codepushContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
      },
      codepushWelcome: {
        fontSize: 18,
        textAlign: "center",
        margin: 10
      },
      codePushText: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
      },
      progressStyle: {
        margin: 5
      }
})