// @flow

import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from '../Themes';

const styles = StyleSheet.create({
	tabText: {
		color: 'white'
	},
	tabTextActive: {
		color: 'gray'
	}
});

const TabIcon = (props: any) => (
	<View>
		<Icon
			containerStyle={{
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: 5
			}}
			color={props.selected ? Colors.snow : Colors.disable}
			name={props.iconName}
			size={25}
			/>
		<Text
			style={{color: props.selected ? Colors.snow : Colors.disable}}
			>
			{props.selected ? props.title : ''}
		</Text>
	</View>
  );

export default TabIcon;
