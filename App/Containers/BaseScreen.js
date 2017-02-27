/* @flow */

import React from 'react';
import {Actions} from 'react-native-router-flux';

import {store} from '../Models/RealmManager';

export class BaseScreen extends React.PureComponent {
	constructor(props: any) {
		super(props);
	}

	authLogin() {
		if (!store.isLogin()) {
			Actions.loginScreen();
		}
	}
}
