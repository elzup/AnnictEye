/* @flow */
'use strict'

import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Colors } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'

type Props = {
	iconName?: string,
	colorActive?: string,
	colorDisable?: string,
	size?: number,
	active?: boolean,
	onPress?: void
}

const ToggleIconButton = ({
	iconName = 'shield',
	colorActive = Colors.black,
	colorDisable = Colors.disable,
	active = false,
	size = 22,
	onPress = () => {}
}: Props) => (
	<TouchableOpacity onPress={onPress}>
		<Icon name={iconName} color={active ? colorActive : colorDisable} size={size} />
	</TouchableOpacity>
)

ToggleIconButton.defaultProps = {
	iconName: 'shield',
	colorActive: Colors.black,
	colorDisable: Colors.disable,
	size: 22,
	onPress: () => { }
}

export default ToggleIconButton
