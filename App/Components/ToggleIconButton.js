'use strict'

import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Colors } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'

type ToggleIconButton = {
	iconName: string,
	colorActive: string,
	colorDisable: string,
	size: integer,
	active: boolean,
	onPress: () => void
}

const ToggleIconButton = (props: ToggleIconButton) => {
	const {iconName, colorActive, colorDisable, active, size, onPress} = props
	const color = active ? colorActive : colorDisable
	return (
		<TouchableOpacity onPress={onPress}>
			<Icon name={iconName} color={color} size={size} />
		</TouchableOpacity>
	)
}

ToggleIconButton.defaultProps = {
	iconName: 'shield',
	colorActive: Colors.black,
	colorDisable: Colors.disable,
	size: 22,
	onPress: () => { }
}

export default ToggleIconButton
