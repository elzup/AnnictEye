/* @flow */

import React, {Component} from 'react';
import {Actions, ActionConst} from 'react-native-router-flux';
import {
  View,
  Text,
  TextInput,
  Slider,
  TouchableOpacity
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {Episode, Record} from '../Services/Type';
import type {RecordFields} from '../Services/Type';
import {ApplicationStyles, Metrics, Colors, Fonts} from '../Themes/';
import {Icon} from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import {store} from '../Models/RealmManager';
import {client} from '../Services/AnnictApi';

const Styles = {
	...ApplicationStyles.screen,
	container: {
		flex: 1,
		marginTop: Metrics.navBarHeight,
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
};

type Props = {
  episode: Episode
}

type State = {
  sliderThumb: any,
  comment: string,
  rating: number,
  shareTwitter: boolean,
  shareFacebook: boolean
}

class RecordCreateModal extends Component {
	props: Props
	state: State = {
		sliderThumb: null,
		comment: '',
		rating: 0,
		shareTwitter: false,
		shareFacebook: false
	}

	componentWillMount() {
		if (!store.isLogin()) {
			Actions.loginScreen({type: ActionConst.REPLACE});
		}
	}

	componentDidMount() {
		this.init();
	}

	async init() {
		const sliderThumb = await FAIcon.getImageSource('star', 22, Colors.disable);
		this.setState({sliderThumb});
	}

	render() {
		return (
			<View style={Styles.container}>
				<TextInput
					multiline
					style={Styles.commentForm}
					keyboardType="default"
					returnKeyType="next"
					autoCapitalize="none"
					autoCorrect={false}
					underlineColorAndroid="transparent"
					onSubmitEditing={this.handleSubmit.bind(this)}
					onChangeText={this.handleText.bind(this)}
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
							onValueChange={this.handleChangeRate.bind(this)}
							/>
					</View>

					<View style={Styles.footerBottom}>
						<View style={Styles.toggle} >
							<Icon
								name="twitter"
								type="font-awesome"
								color={this.state.shareTwitter ? Colors.twitter : Colors.disable}
								onPress={this.handleToggleTwitter.bind(this)}
								/>
						</View>
						<View style={Styles.toggle} >
							<Icon
								name="facebook"
								type="font-awesome"
								color={this.state.shareFacebook ? Colors.facebook : Colors.disable}
								onPress={this.handleToggleFacebook.bind(this)}
								/>
						</View>
						<TouchableOpacity
							onPress={this.handleSubmit.bind(this)}
							style={Styles.submitButton}
							>
							<Text style={Styles.buttonInner}>記録</Text>
						</TouchableOpacity>
					</View>
				</View>
				<KeyboardSpacer/>
			</View>
		);
	}

	handleToggleTwitter() {
		console.log('share twitter toggle');
		this.setState({shareTwitter: !this.state.shareTwitter});
	}

	handleToggleFacebook() {
		console.log('share facebook toggle');
		this.setState({shareFacebook: !this.state.shareFacebook});
	}

	async handleChangeRate(value: number) {
		const color = value === 0 ? Colors.disable : Colors.star;
		const source = await FAIcon.getImageSource('star', 22, color);
		this.setState({sliderThumb: source, rating: value});
	}

	handleText(text: string) {
		this.setState({comment: text});
	}

	/* eslint camelcase: 0 */
	async handleSubmit() {
		const {comment, rating, shareTwitter, shareFacebook} = this.state;
		const fields: RecordFields = {
			episode_id: this.props.episode.id,
			comment,
			rating,
			share_twitter: shareTwitter ? 'true' : 'false',
			share_facebook: shareFacebook ? 'true' : 'false'
		};
		const res = await client.postRecord(fields);
		console.log(res);
		// this.props.postRecord(fields);
		window.alert('記録しました！');
		Actions.pop();
	}
}
export default RecordCreateModal;
