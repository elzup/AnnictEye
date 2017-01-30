'use strict'

import React from 'react'
import {View, Text} from 'react-native'
import {Metrics, Colors} from '../Themes'

type NavigationDummyProps = {
  text: string
}

const NavigationDummy = (props: NavigationDummyProps) => (
  <View style={Styles.root}>
    <Text style={Styles.text}>{ props.text }</Text>
  </View>
)
const Styles = {
  root: {
    height: Metrics.navBarHeight,
    backgroundColor: Colors.pink,
    paddingTop: Metrics.statusBarHeight,
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    color: Colors.snow
  }
}

export default NavigationDummy
