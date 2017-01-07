'use strict';

import React, { Component } from 'react';
var AppState = require('AppState');
var StyleSheet = require('StyleSheet');
var View = require('View');
var StatusBar = require('StatusBar');
var Navigator = require('Navigator');
var AnnictEyeNavigator = require('./AnnictEyeNavigator');
import {
	 Text
 } from 'react-native';

class AnnictEye extends Component {
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
  }

  render() {
		return (
			<View style={styles.container}>
				<StatusBar
					translucent={true}
					backgroundColor="rgba(0, 0, 0, 0.2)"
					barStyle="light-content"
					/>
				<Navigator
					initialRoute={{ title: 'Awesome Scene', index: 0 }}
					renderScene={(route, navigator) =>
						<Text>Hello {route.title}!</Text>
					}
					style={{padding: 100}}
					/>
			</View>
		);
	}

}

var styles = StyleSheet.create({
  container: {
		backgroundColor: 'orange',
    flex: 1,
  },
	navigator: {
		padding: 100
	});

module.exports = AnnictEye
