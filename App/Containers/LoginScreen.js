/* @flow */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Linking} from 'react-native';
import {Button, Text, Container, Content, Form, Item, Input, Header, Body, Title, Label} from 'native-base';

import {Actions, ActionConst} from 'react-native-router-flux';
import {Metrics, Colors, ApplicationStyles} from '../Themes/';

import {CLIENT_ID} from 'react-native-dotenv';
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
			Actions.pop();
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
			<Container>
				<Content>
					<View style={Styles.mainContainer}>
						<View style={Styles.wrap}>
							<Text marginTop={10} marginBottom={10}>
								Annict にログインし、認証コードをコピーしてください。
							</Text>
							<Text marginTop={10} marginBottom={10} color={'orange'}>
								(ログイン後に認証コードが表示されない場合はボタンから開き直してください。)
							</Text>
							<Button onPress={this.handlePressOauth}>
								<Text>認証画面を開く</Text>
							</Button>
							<Form>
								<Item fixedLabel>
									<Label>コード</Label>
									<Input
										placeholder="code"
										onChangeText={this.handleChangeCode.bind(this)}
										/>
								</Item>
							</Form>
							<Button onPress={this.handleSubmitCode.bind(this)}>
								<Text>ログイン</Text>
							</Button>
						</View>
					</View>
				</Content>
			</Container>
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
		this.auth();
	}

	async auth() {
		const token = await client.oauthToken(this.state.code);
		console.log(token);
		// Actions.homeScreen({type: ActionConst.RESET});
	}

	handleChangeCode(code: string) {
		this.setState({code});
	}
}

export default LoginScreen;
