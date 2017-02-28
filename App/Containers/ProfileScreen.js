/* @flow */

import React, {Component} from 'react';
import {
	View,
	Text,
	ListView,
	Image,
	StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';

import ProgramCell from '../Components/ProgramCell';
import Indicator from '../Components/Indicator';

import {ApplicationStyles, Metrics, Colors, Fonts} from '../Themes/';
import {Program, Episode} from '../Services/Type';
import type {Profile} from '../Services/Type';

import {store} from '../Models/RealmManager';
import {client} from '../Services/AnnictApi';

const Styles = StyleSheet.create({
	...ApplicationStyles.screen,
	container: {
		flex: 1,
		marginTop: Metrics.navBarHeight,
		backgroundColor: Colors.silver,
		alignItems: 'center'
	},
	listContent: {
		marginTop: Metrics.baseMargin
	}
});

type Props = {
}

type State = {
	loading: boolean,
	profile: Profile
}

class ProfileScreen extends React.PureComponent {
	props: Props
	state: State = {
		loading: true,
		profile: {
			username: '---',
			name: '---'
		}
	}

	componentWillMount() {
		if (!store.isLogin()) {
			Actions.loginScreen();
		}
	}

	componentDidMount() {
		this.init();
	}

	async init() {
		try {
			await this.loadProfile();
		} catch (e) {
			if (e.message == 'no-auth') {
				store.deleteSession();
				Actions.loginScreen();
			} else {
				throw e;
			}
		}
	}

	async loadProfile() {
		this.setState({profile: await store.getUser()});
		this.setState({profile: await client.getMe()});
	}

	render() {
		const avator = this.state.profile.avatar_url == null ? (
			<View style={{width: 50, height: 50, borderRadius: 25, marginTop: 20, backgroundColor: Colors.cloud}}/>
		) : (
			<Image
				style={{width: 50, height: 50, borderRadius: 25, marginTop: 20}}
				source={{uri: this.state.profile.avatar_url}}
				/>
		);
		return (
			<View style={Styles.container}>
				{avator}
				<Text style={{marginTop: 10, fontSize: 20}}>{this.state.profile.name || '---'}</Text>
				<Text style={{marginTop: 10}}>@{this.state.profile.username}</Text>
			</View>
		);
	}
}

export default ProfileScreen;
