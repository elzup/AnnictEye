'use strict'

import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import {Metrics, Colors, Fonts} from '../Themes'
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

type IconButtonProps = {
  iconName: string,
  count: number,
  color: Colors.disable,
  onPress: () => void
}

const IconButton = (props: IconButtonProps) => {
	return (
		<TouchableOpacity onPress={props.onPress}>
			<View style={Styles.action}>
				<Icon name={props.iconName} color={props.color}/>
				<Text style={Styles.count}>{props.count}</Text>
			</View>
		</TouchableOpacity>
	)
}

export default IconButton
