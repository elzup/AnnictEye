/* @flow */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
	Text,
  Linking} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button} from 'react-native-elements';

import {Actions, ActionConst} from 'react-native-router-flux';
import {Metrics, Colors, ApplicationStyles} from '../Themes/';

import {store} from '../Models/RealmManager';
import {client} from '../Services/AnnictApi';

const Styles = StyleSheet.create({
	...ApplicationStyles.screen,
	warn: {
		color: 'orange',
		marginTop: 10,
		marginBottom: 10
	},
	text: {
		marginTop: 10,
		marginBottom: 10
	},
	wrap: {
		paddingLeft: 20,
		paddingRight: 20
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

	componentWillMount() {
		if (store.isLogin()) {
			Actions.tabbar({type: ActionConst.REPLACE});
		}
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
				<View style={Styles.wrap}>
					<Text style={Styles.text}>
						Annict にログインし、認証コードをコピーしてください。
					</Text>
					<Text style={Styles.warn}>
						(ログイン後に認証コードが表示されない場合はボタンから開き直してください。)
					</Text>
					<Button onPress={this.handlePressOauth} title="認証画面を開く"/>
					<FormLabel>コード</FormLabel>
					<FormInput onChangeText={this.handleChangeCode.bind(this)}/>
					<Button
						onPress={this.handleSubmitCode.bind(this)}
						title="ログイン"
						/>
				</View>
			</View>
		);
	}

	handlePressOauth() {
		Linking.openURL(client.authURL());
	}

	handleSubmitCode() {
		this.auth();
	}

	async auth() {
		const res = await client.oauthToken(this.state.code);
		await client.setToken(res.data.access_token);
		console.log('t: ' + res.data.access_token);
		Actions.tabbar({type: ActionConst.REPLACE});
	}

	handleChangeCode(code: string) {
		this.setState({code});
	}
}

export default LoginScreen;
