'use strict'

import React, { PropTypes } from 'react'
import { TouchableOpacity } from 'react-native'
import { Colors } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'

const ToggleIconButton = (props) => {
	const { iconName, colorActive, colorDisable, active, size, onPress } = props
	const color = active ? colorActive : colorDisable
	return (
		<TouchableOpacity onPress={onPress}>
			<Icon name={iconName} color={color} size={size}/>
		</TouchableOpacity>
	)
}

ToggleIconButton.propTypes = {
	iconName: PropTypes.string,
	colorActive: PropTypes.string,
	colorDisable: PropTypes.string,
	size: PropTypes.integer,
	onPress: PropTypes.func
}

ToggleIconButton.defaultProps = {
	iconName: 'shield',
	colorActive: Colors.black,
	colorDisable: Colors.disable,
	size: 22,
	onPress: () => {}
}

export default ToggleIconButton
