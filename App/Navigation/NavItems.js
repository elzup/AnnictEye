/* @flow */
'use strict';

import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Actions as NavigationActions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors, Metrics} from '../Themes';

const navButton = {
	backgroundColor: Colors.transparent,
	justifyContent: 'center'
};

const Styles = StyleSheet.create({
	backButton: {
		...navButton,
		marginTop: Metrics.baseMargin,
		marginLeft: Metrics.baseMargin
	},
	searchButton: {
		...navButton,
		marginTop: Metrics.section,
		marginRight: Metrics.baseMargin,
		alignItems: 'center'
	}
});

const openDrawer = () => {
	NavigationActions.refresh({
		key: 'drawer',
		open: true
	});
};

export default {
	backButton() {
		return (
			<TouchableOpacity
				onPress={() => {
					NavigationActions.pop();
				}}
				>
				<Icon
					name="angle-left"
					size={Metrics.icons.large}
					color={Colors.snow}
					style={Styles.backButton}
					/>
			</TouchableOpacity>
		);
	},

	hamburgerButton() {
		return (
			<TouchableOpacity onPress={openDrawer}>
				<Icon
					name=""
					size={Metrics.icons.medium}
					color={Colors.snow}
					style={Styles.navButtonLeft}
					/>
			</TouchableOpacity>
		);
	},

	searchButton(callback: Function) {
		return (
			<TouchableOpacity onPress={callback}>
				<Icon
					name="search"
					size={Metrics.icons.small}
					color={Colors.snow}
					style={Styles.searchButton}
					/>
			</TouchableOpacity>
		);
	}
};
