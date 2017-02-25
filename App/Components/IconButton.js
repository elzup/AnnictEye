/* @flow */
'use strict';

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {Metrics, Colors, Fonts} from '../Themes';
import Icon from 'react-native-vector-icons/FontAwesome';

const Styles = {
	action: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	count: {
		marginLeft: Metrics.smallMargin,
		fontSize: Fonts.size.small
	}
};

type Props = {
	iconName: string,
	onPress: () => void,
	text?: string,
	color?: string
}
class IconButton {
	props: Props = {
		iconName: 'star',
		onPress: () => {},
		text: '',
		color: Colors.disable
	}
	render() {
		const {onPress, iconName, color, text} = this.props;
		return (
			<TouchableOpacity onPress={onPress}>
				<View style={Styles.action}>
					<Icon name={iconName} color={color}/>
					<Text style={Styles.count}>{text}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

export default IconButton;
