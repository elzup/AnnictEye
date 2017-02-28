/* @flow */

import React from 'react';
import {Actions, ActionConst} from 'react-native-router-flux';

import {store} from '../Models/RealmManager';

export class BaseScreen extends React.Component {
	authLogin() {
		if (!store.isLogin()) {
			Actions.loginScreen();
		}
	}
}
