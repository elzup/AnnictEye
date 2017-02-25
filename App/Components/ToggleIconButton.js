/* @flow */
'use strict'

import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Colors } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'

type Props = {
	iconName: ?string,
	colorActive: ?string,
	colorDisable: ?string,
	size: ?number,
	active: ?boolean,
	onPress: () => void
}

class ToggleIconButton extends Component {
	props: Props = {
		iconName: 'shield',
		colorActive: Colors.black,
		colorDisable: Colors.disable,
		active: false,
		size: 22,
		onPress: () => {}
	}
	render = (
		<TouchableOpacity onPress={onPress}>
			<Icon name={iconName} color={active ? colorActive : colorDisable} size={size}/>
		</TouchableOpacity>
	)
}

export default ToggleIconButton
