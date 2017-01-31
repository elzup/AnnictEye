'use strict'

import React from 'react'
import moment from 'moment'
import {
  TouchableOpacity,
  View,
  Text
} from 'react-native'
import {ApplicationStyles, Metrics, Colors, Fonts} from '../Themes/'
import {Program} from '../Services/Type'

const Styles = {
	card: {
		...ApplicationStyles.card,
		flex: 2,
		backgroundColor: Colors.snow
	},
	infos: {
		flex: 1
	},
	time: {
		fontSize: Fonts.size.small,
		color: Colors.green
	},
	workTitle: {
		fontWeight: 'bold',
		marginVertical: Metrics.smallMargin
	},
	title: {
		marginBottom: Metrics.smallMargin
	}
}

const ProgramCell = (props: { program: Program, onPress: () => void }) => {
	const {program, onPress} = props
	const label = `${program.episode.number_text}|${program.episode.title}`
	const timeLabel = moment(program.started_at).format('MM/DD HH:mm')
	return (
		<TouchableOpacity onPress={onPress} >
			<View style={Styles.card}>
				<View style={Styles.infos}>
					<Text style={Styles.time}>{timeLabel}</Text>
					<Text style={Styles.workTitle}>{program.work.title}</Text>
					<Text style={Styles.title}>{label}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default ProgramCell
