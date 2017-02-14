/* @flow */
'use strict'

import React, {PropTypes, Component} from 'react'
import Drawer from 'react-native-drawer'
import {DefaultRenderer, Actions as NavigationActions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import {Colors} from '../Themes/'

const Styles = {
	drawer: {
		backgroundColor: Colors.background
	},
	main: {
		backgroundColor: Colors.clear
	}
}

class NavigationDrawer extends Component {
	render() {
		const state = this.props.navigationState
		const children = state.children
		return (
			<Drawer
				type="displace"
				open={state.open}
				onOpen={() => NavigationActions.refresh({key: state.key, open: true})}
				onClose={() => NavigationActions.refresh({key: state.key, open: false})}
				styles={Styles}
				ftapToClose openDrawerOffset={0.2}
				panCloseMask={0.2}
				negotiatePan
				tweenHandler={ratio => ({
					main: {
						opacity: Math.max(0.54, 1 - ratio)
					}
				})}
				>
				<DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate}/>
			</Drawer>
		)
	}
}

NavigationDrawer.propTypes = {
	navigationState: PropTypes.object
}

const mapStateToProps = () => {
	return {}
}

const mapDispatchToProps = () => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer)
