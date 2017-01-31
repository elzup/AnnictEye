'use strict'

import React, {Component} from 'react'
import {View, StatusBar, StyleSheet} from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import {connect} from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import {Fonts, Metrics, Colors} from '../Themes/'

const Styles = StyleSheet.create({
	applicationView: {
		flex: 1
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: Colors.background
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		fontFamily: Fonts.type.base,
		margin: Metrics.baseMargin
	},
	myImage: {
		width: 200,
		height: 200,
		alignSelf: 'center'
	}
})

class RootContainer extends Component {
	componentDidMount() {
    // if redux persist is not active fire startup action
		this.props.startup()
	}

	render() {
		return (
			<View style={Styles.applicationView}>
				<StatusBar barStyle="light-content"/>
				<NavigationRouter/>
			</View>
		)
	}
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
	startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
