/* @flow */
'use strict';

import React, {Component} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import NavigationRouter from '../Navigation/NavigationRouter';
import {Fonts, Metrics, Colors} from '../Themes/';

const Styles = StyleSheet.create({
	applicationView: {
		flex: 1
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: Colors.background
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		fontFamily: Fonts.type.base,
		margin: Metrics.baseMargin
	},
	myImage: {
		width: 200,
		height: 200,
		alignSelf: 'center'
	}
});

class RootContainer extends Component {
	componentDidMount() {
		this.props.startup();
	}

	render() {
		return (
			<View style={Styles.applicationView}>
				<StatusBar barStyle="light-content"/>
				<NavigationRouter/>
			</View>
		);
	}
}

export default RootContainer;
