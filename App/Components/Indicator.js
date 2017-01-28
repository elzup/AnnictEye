// @flow

import React from 'react'
import { ActivityIndicator } from 'react-native'

const Indicator = (props: { loading: boolean }) => props.loading ? (
  <ActivityIndicator
    animating
    style={Styles.indicator}
    size='large'
    />
) : null

const Styles = {
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  }
}

export default Indicator
