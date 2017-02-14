/* @flow */
'use strict'

import React, {PropTypes as T} from 'react'
import {Text, TouchableOpacity} from 'react-native'
import {Metrics, Colors, Fonts} from '../Themes'

const Styles = {
	text: {
		...Fonts.style.h6,
		backgroundColor: Colors.green,
		color: Colors.snow,
		textAlign: 'center',
		paddingVertical: 5,
		marginVertical: Metrics.baseMargin
	}
}

const DrawerButton = (props: { onPress: () => void, text: string }) => (
	<TouchableOpacity onPress={props.onPress}>
		<Text style={Styles.text}>{props.text}</Text>
	</TouchableOpacity>
)

export default DrawerButton
