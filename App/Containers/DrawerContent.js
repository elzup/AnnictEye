'use strict'

import React, {Component} from 'react'
import {ScrollView, BackAndroid} from 'react-native'
import DrawerButton from '../Components/DrawerButton'

const Styles = {
	container: {
		flex: 1,
		padding: 20
	},
	logo: {
		alignSelf: 'center'
	}
}

class DrawerContent extends Component {
	componentDidMount() {
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.context.drawer.props.open) {
				this.toggleDrawer()
				return true
			}
			return false
		})
	}

	toggleDrawer() {
		this.context.drawer.toggle()
	}

	handlePressPageA = () => {
		this.toggleDrawer()
		window.alert('PageA Open.')
    // NavigationActions.componentExamples()
	}

	render() {
		return (
			<ScrollView style={Styles.container}>
				<DrawerButton text="Page A" onPress={this.handlePressPageA}/>
			</ScrollView>
		)
	}
}

DrawerContent.contextTypes = {
	drawer: React.PropTypes.object
}

export default DrawerContent
