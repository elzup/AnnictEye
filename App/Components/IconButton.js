// @flow

import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import {Metrics, Colors, Fonts} from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'

type IconButtonProps = {
  iconName: string,
  count: number,
  color: Colors.disable,
  onPress: () => void
}

const IconButton = (props: IconButtonProps) => {
  const { iconName, color, onPress } = props
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={Styles.action}>
        <Icon name={iconName} color={color} />
        <Text style={Styles.count}>{props.count}</Text>
      </View>
    </TouchableOpacity>
  )
}

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

export default IconButton
