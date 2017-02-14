/* @flow */
'use strict'

import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { Metrics, Colors, Fonts } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'

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
}

function Echo({ message, times = 2 }: { message: string, times?: number }) {
  var messages = new Array(times).fill(<p>{message}</p>);

  return (
    <div>
      {messages}
    </div>
  );
}


type IconButtonProps = {
	iconName: string,
	onPress: void,
	text?: string,
	color?: string
}

function IconButton({ iconName, onPress, text = '', color = Colors.disable }
	: IconButtonProps) {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={Styles.action}>
				<Icon name={iconName} color={color}/>
				<Text style={Styles.count}>{text}</Text>
			</View>
		</TouchableOpacity>
	)
}

export default IconButton
