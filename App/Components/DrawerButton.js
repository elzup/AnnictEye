/* @flow */

import React, {PureComponent} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Metrics, Colors, Fonts} from '../Themes';

const Styles = {
	text: {
		...Fonts.style.h6,
		backgroundColor: Colors.green,
		color: Colors.snow,
		textAlign: 'center',
		paddingVertical: 5,
		marginVertical: Metrics.baseMargin
	}
};

type Props = {
	onPress: () => void,
	 text: string
}

class DrawerButton extends PureComponent {
	props: Props
	render = (
		<TouchableOpacity onPress={props.onPress}>
			<Text style={Styles.text}>{props.text}</Text>
		</TouchableOpacity>
	)
}

export default DrawerButton;
