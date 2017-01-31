'use strict'

import React, {PropTypes as T} from 'react'
import {TouchableOpacity} from 'react-native'
import {Colors} from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'

const ToggleIconButton = props => {
	const {iconName, colorActive, colorDisable, active, size, onPress} = props
	const color = active ? colorActive : colorDisable
	return (
		<TouchableOpacity onPress={onPress}>
			<Icon name={iconName} color={color} size={size}/>
		</TouchableOpacity>
	)
}

ToggleIconButton.propTypes = {
	iconName: T.string,
	colorActive: T.string,
	colorDisable: T.string,
	size: T.integer,
	active: T.boolean,
	onPress: T.func
}

ToggleIconButton.defaultProps = {
	iconName: 'shield',
	colorActive: Colors.black,
	colorDisable: Colors.disable,
	size: 22,
	onPress: () => {}
}

export default ToggleIconButton
