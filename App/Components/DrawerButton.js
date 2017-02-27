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
	 text: string,
	onPress: () => void
}

class DrawerButton extends PureComponent {
	props: Props = {
		text: '',
		onPress: () => {}
	}
	render() {
		const {onPress, text} = this.props;
		return (
			<TouchableOpacity onPress={onPress}>
				<Text style={Styles.text}>{text}</Text>
			</TouchableOpacity>
		);
	}
}

export default DrawerButton;
