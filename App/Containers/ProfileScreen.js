/* @flow */

import React, {Component} from 'react';
import {
	View,
	Text,
	ListView,
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
		backgroundColor: Colors.silver
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
		profile: {}
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
		const profile = store.getUser();
		this.setState({profile});
	}

	render() {
		return (
			<View style={Styles.container}>
				<Text>{this.state.profile.username}</Text>
			</View>
		);
	}
}

export default ProfileScreen;
