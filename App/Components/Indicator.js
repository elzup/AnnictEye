/* @flow */
'use strict'

import React from 'react'
import {ActivityIndicator} from 'react-native'

const Styles = {
	indicator: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 8
	}
}

const Indicator = (props: { loading: boolean }) => props.loading ? (
	<ActivityIndicator
		animating
		style={Styles.indicator}
		size="large"
		/>
) : null

export default Indicator
