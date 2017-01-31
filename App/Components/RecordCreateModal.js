'use strict'

import React, {Component} from 'react'
import {
  View,
  Text,
  TextInput,
  Slider,
  TouchableOpacity,
  Modal
} from 'react-native'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import {Episode} from '../Services/Type'
import {ApplicationStyles, Metrics, Colors, Fonts} from '../Themes/'
import NavigatorDummy from '../Components/NavigatorDummy'
import ToggleIconButton from '../Components/ToggleIconButton'
import KeyboardSpacer from 'react-native-keyboard-spacer'

const Styles = {
	...ApplicationStyles.screen,
	container: {
		flex: 1,
		backgroundColor: Colors.silver
	},
	wrap: {
		marginTop: Metrics.doubleBaseMargin
	},
	commentForm: {
		flex: 1,
		height: 100,
		fontSize: Fonts.size.h6,
		paddingHorizontal: 15
	},
	navigationDummy: {
		backgroundColor: Colors.pink
	},
	episodeHeader: {
		...ApplicationStyles.headerBox
	},
	subLabel: {
		marginVertical: Metrics.smallMargin,
		fontSize: Fonts.size.small
	},
	boldLabel: {
		fontWeight: 'bold',
		marginVertical: Metrics.smallMargin
	},
	modal: {
		paddingTop: Metrics.doubleBaseMargin
	},

	footer: {
		height: Metrics.footerHeight,
		flexDirection: 'column',
		borderTopWidth: 1,
		borderTopColor: '#ddd'
	},
	footerSlider: {
		...Metrics.footerRow,
		flex: 1,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
		flexDirection: 'row',
		paddingHorizontal: Metrics.baseMargin
	},
	rating: {
		flex: 1,
		height: Metrics.footerRowHeight,
		alignItems: 'center',
		justifyContent: 'center'
	},
	ratingText: {
		color: '#666',
		justifyContent: 'center'
	},
	slider: {
		flex: 6,
		height: Metrics.footerRowHeight,
		justifyContent: 'center'
	},
	footerBottom: {
		paddingVertical: 5,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	submitButton: {
		height: Metrics.footerRowHeight,
		flex: 3,
		alignItems: 'flex-end',
		justifyContent: 'center'
	},
	toggle: {
		height: Metrics.footerRowHeight,
		flex: 1,
		borderWidth: 0,
		justifyContent: 'center',
		alignItems: 'center'
	},
	icon: {
		fontSize: Fonts.size.h4
	},
	iconOff: {
		color: Colors.disable
	}
}

type RecordModalProps = {
  episode: Episode
}

class RecordCreateModal extends Component {
	props: RecordModalProps

	constructor(props) {
		super(props)
		this.state = {
			sliderThumb: null,
			visible: false,

      // request parameters
			comment: '',
			rating: 0,
			shareTwitter: false,
			shareFacebook: false
		}
		FAIcon.getImageSource('star', 22, Colors.disable)
    .then(source => {
	this.setState({sliderThumb: source})
})
	}

	setVisible(visible) {
		this.setState({visible: visible})
	}

	render() {
		const {episode} = this.props
		console.log(episode.title)
		return (
			<Modal
				animationType={'slide'}
				transparent={false}
				style={Styles.modal}
				visible={this.state.visible}
				>
				<NavigatorDummy text={'記録する'}/>
				<View style={Styles.container}>
					<TextInput
						multiline
						style={Styles.commentForm}
						keyboardType="default"
						returnKeyType="next"
						autoCapitalize="none"
						autoCorrect={false}
						underlineColorAndroid="transparent"
						onSubmitEditing={this.handleSubmit}
						onChangeText={this.handleText}
						placeholder="コメント"
						/>

					<View style={Styles.footer}>
						<View style={Styles.footerSlider}>
							<View style={Styles.rating}>
								<Text>{this.state.rating}</Text>
							</View>
							<Slider
								style={Styles.slider}
								thumbImage={this.state.sliderThumb}
								minimumValue={0}
								maximumValue={5}
								step={0.1}
								onValueChange={this.handleChangeRate}
								/>
						</View>

						<View style={Styles.footerBottom}>
							<View style={Styles.toggle} >
								<ToggleIconButton
									iconName="twitter"
									size={Fonts.size.h4}
									active={this.state.shareTwitter}
									colorActive={Colors.twitter}
									onPress={this.handleToggleTwitter}
									/>
							</View>
							<View style={Styles.toggle} >
								<ToggleIconButton
									iconName="facebook"
									size={Fonts.size.h4}
									active={this.state.shareFacebook}
									colorActive={Colors.facebook}
									onPress={this.handleToggleFacebook}
									/>
							</View>
							<TouchableOpacity style={Styles.submitButton} onPress={this.props.handleSubmit}>
								<Text style={Styles.buttonInner}>記録</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<KeyboardSpacer/>
			</Modal>
		)
	}

	handleToggleTwitter = () => {
		console.log('share twitter toggle')
		this.setState({shareTwitter: !this.state.shareTwitter})
	}
	handleToggleFacebook = () => {
		console.log('share facebook toggle')
		this.setState({shareFacebook: !this.state.shareFacebook})
	}

	handleChangeRate = value => {
		const color = value === 0 ? Colors.disable : Colors.star
		FAIcon.getImageSource('star', 22, color)
    .then(source => {
	this.setState({sliderThumb: source, rating: value})
}).done()
	}

	handleText = text => {
		this.setState({text: text})
	}

	handleSubmit = () => {
		console.log('submit')
	}
}

export default RecordCreateModal
