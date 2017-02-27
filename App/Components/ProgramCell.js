/* @flow */

import React from 'react';
import moment from 'moment';
import {
	TouchableOpacity,
	View,
	Text
} from 'react-native';
import {ApplicationStyles, Metrics, Colors, Fonts} from '../Themes/';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Program} from '../Services/Type';

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
		flex: 3,
		flexDirection: 'row'
	},
	number: {
	},
	row: {
		flex: 2,
		flexDirection: 'row'
	}
};

type Prop = {
	program: Program,
	onPress: () => void
}

const ProgramCell = ({program, onPress}: Prop) => {
	const label = `${program.episode.numberText}|${program.episode.safeTilte()}`;
	const timeLabel = moment(program.startedAt).format('MM/DD HH:mm');
	return (
		<TouchableOpacity onPress={onPress} >
			<View style={Styles.card}>
				<View style={Styles.infos}>
					<Text style={Styles.time}>{timeLabel}</Text>
					<Text style={Styles.workTitle}>{program.work.title}</Text>
					<Text style={Styles.title}>{label}</Text>
				</View>
				<View style={Styles.footer}>
					<View style={Styles.row}>
						<Icon style={{fontSize: 15, marginRight: 5}} name="bookmark" color={Colors.broccoli}/>
						<Text style={Styles.number}>{program.episode.recordsCount}</Text>
					</View>
					<View style={Styles.row}>
						<Icon style={{fontSize: 15, marginRight: 5}} name="comment" color={Colors.broccoli}/>
						<Text style={Styles.number}>{program.episode.recordCommentsCount}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ProgramCell;
