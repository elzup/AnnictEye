// @flow

import React, {Component} from 'react'
import {Text, TouchableOpacity} from 'react-native'
import {Metrics, Colors, Fonts} from '../../Themes'

type DrawerButtonProps = {
  text: string,
  onPress: () => void
}

class DrawerButton extends Component {
  props : DrawerButtonProps

  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={Styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}

const Styles = {
  text: {
    ...Fonts.style.h5,
    color: Colors.snow,
    marginVertical: Metrics.baseMargin
  }
}

export default DrawerButton
