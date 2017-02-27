/* @flow */

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

import {CLIENT_ID} from 'react-native-dotenv';
import {store} from '../Models/RealmManager';
import {client} from '../Services/AnnictApi';

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

type Props = {
  attemptLogin: () => void,
  loggedIn: boolean,
}

type State = {
	code: string
}

class LoginScreen extends React.Component {
	props: Props
	state: State = {
		code: ''
	}

	componentDidMount() {
		this.init();
	}

	async init() {
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

	handlePressOauth() {
		Linking.openURL([
			'https://api.annict.com/oauth/authorize',
			'?response_type=code',
			'&client_id=' + CLIENT_ID,
			'&redirect_uri=urn:ietf:wg:oauth:2.0:oob',
			'&scope=read+write'
		].join(''));
	}

	handleSubmitCode() {
		Actions.homeScreen({type: ActionConst.RESET});
	}

	handleChangeCode() {
	}
}

export default LoginScreen;
