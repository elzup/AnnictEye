/* @flow */
'use strict';

import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Linking,
  TextInput} from 'react-native';

import {Actions, ActionConst} from 'react-native-router-flux';
import {Metrics, Colors, ApplicationStyles} from '../Themes/';
import DrawerButton from '../Components/DrawerButton';
import AnnictApi from '../Services/AnnictApi';

import {CLIENT_ID} from 'react-native-dotenv';

const Styles = StyleSheet.create({
	...ApplicationStyles.screen,
	logo: {
		height: Metrics.images.logo,
		width: Metrics.images.logo,
		resizeMode: 'contain'
	},
	centered: {
		alignItems: 'center'
	},
	textInput: {
		height: 40,
		color: Colors.coal
	}
});

type LoginScreenProps = {
  attemptLogin: () => void,
  loggedIn: boolean,
}

class LoginScreen extends Component {

	props: LoginScreenProps

	isAttempting: boolean

	state: {
    code: string
  }

	constructor(props: LoginScreenProps) {
		super(props);
		this.state = {
			code: ''
		};
		this.isAttempting = false;
	}

	componentDidMount = () => {
		this.isAttempting = true;
	}

	componentWillReceiveProps = (newProps: LoginScreenProps) => {
		this.forceUpdate();
		if (!this.isAttempting) {
			return;
		}
		if (newProps.loggedIn) {
			Actions.homeScreen({type: ActionConst.RESET});
		} else {
			console.log('login failed.');
		}
	}

	handlePressOauth = () => {
		Linking.openURL([
			'https://api.annict.com/oauth/authorize',
			'?response_type=code',
			'&client_id=' + CLIENT_ID,
			'&redirect_uri=urn:ietf:wg:oauth:2.0:oob',
			'&scope=read+write'
		].join(''));
	}

	render() {
		const {code} = this.state;
		return (
			<View style={Styles.mainContainer}>
				<ScrollView style={Styles.container}>
					<View style={Styles.section} >
						<Text>
							認証画面から Annict にログインし、認証コードをコピーしてください。
						</Text>
						<DrawerButton text="認証画面を開く" onPress={this.handlePressOauth}/>
						<TextInput
							value={code}
							style={Styles.textInput}
							keyboardType="default"
							returnKeyType="next"
							autoCapitalize="none"
							autoCorrect={false}
							onChangeText={this.handleChangeCode}
							underlineColorAndroid="transparent"
							onSubmitEditing={this.handleSubmitCode}
							placeholder="認証コード"
							/>
						<DrawerButton text="ログイン" onPress={this.handleSubmitCode}/>
					</View>
				</ScrollView>
			</View>
		);
	}
}

export default LoginScreen;
