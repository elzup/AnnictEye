/* @flow */
'use strict'

import React, {Component} from 'react'
import moment from 'moment'
import {
  View,
  Text,
	Animated
} from 'react-native'
import {ApplicationStyles, Metrics, Colors, Fonts} from '../Themes/'
import IconButton from './IconButton'

import {Record} from '../Services/Type'

const Styles = {
	root: {
		...ApplicationStyles.card,
		flex: 3,
		flexDirection: 'column',
		backgroundColor: Colors.snow
	},
	head: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	userName: {
		fontSize: Fonts.size.small,
		color: Colors.green
	},
	postTime: {
		fontSize: Fonts.size.small,
		color: Colors.steel,
		textAlign: 'right'
	},
	body: {
		marginVertical: Metrics.smallMargin
	},
	comment: {
		lineHeight: Fonts.size.input
	},
	footer: {
		paddingTop: Metrics.smallMargin
	},
	buttons: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
}

type RecordCellProps = {
  record: Record,
  onPressLike: () => void,
  onPressReply: () => void,
  onPressGlobe: Record => void
}

class RecordCell extends Component {
	props: RecordCellProps

	constructor(props: RecordCellProps) {
		super(props)
	}

	render() {
		const {record, onPressLike, onPressReply, onPressGlobe} = this.props
		const timeLabel = moment(record.started_at).format('MM/DD HH:mm')
		return (
			<View style={Styles.root}>
				<View style={Styles.head}>
					<Text style={Styles.userName}>{record.user.name}</Text>
					<Text style={Styles.postTime}>{timeLabel}</Text>
				</View>
				<View style={Styles.body}>
					<Text style={Styles.comment}>{record.comment}</Text>
				</View>
				<View style={Styles.footer}>
					<View style={Styles.buttons}>
						<IconButton iconName="heart" onPress={onPressLike}/>
						<IconButton iconName="reply" onPress={onPressReply}/>
						<IconButton iconName="globe" onPress={onPressGlobe}/>
					</View>
				</View>
			</View>
		)
	}
}

export default RecordCell
