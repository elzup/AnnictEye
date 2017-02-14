/* @flow */
'use strict'

import React from 'react'
import moment from 'moment'
import {
	TouchableOpacity,
	View,
	Text
} from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../Themes/'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Program } from '../Services/Type'

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
	},
	footer: {
	},
	number: {
	}
}

const ProgramCell = (props: { program: Program, onPress: () => void }) => {
	const { program, onPress } = props
	const label = `${program.episode.number_text}|${program.episode.title}`
	const timeLabel = moment(program.startedAt).format('MM/DD HH:mm')
	return (
		<TouchableOpacity onPress={onPress} >
			<View style={Styles.card}>
				<View style={Styles.infos}>
					<Text style={Styles.time}>{timeLabel}</Text>
					<Text style={Styles.workTitle}>{program.work.title}</Text>
					<Text style={Styles.title}>{label}</Text>
				</View>
				<View style={Styles.footer}>
					<View>
						<Icon
							<Icon name="" color={props.color}/>
						<Text style={Styles.number}>{program.episode}</Text>
					</View>
					<View>
						<Text style={Styles.title}>{label}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default ProgramCell
