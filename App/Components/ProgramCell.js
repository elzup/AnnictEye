/* @flow */

import React from 'react';
import moment from 'moment';
import {
	TouchableOpacity,
	View,
	Text
} from 'react-native';
import {ApplicationStyles, Metrics, Colors, Fonts} from '../Themes/';
import {Icon} from 'react-native-elements';
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
	number_new: {
		color: Colors.bloodOrange,
		marginLeft: 5
	},
	number: {
		marginLeft: 10
	},
	row: {
		flex: 2,
		flexDirection: 'row'
	},
	space_row: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
};

type Props = {
	program: Program,
	onPress: () => void
}

class ProgramCell extends React.PureComponent {
	props: Props

	render() {
		const {program, onPress} = this.props;
		const label = `${program.episode.numberText}|${program.episode.safeTilte()}`;
		const timeLabel = moment(program.startedAt).format('MM/DD HH:mm');

		return (
			<TouchableOpacity onPress={onPress} >
				<View style={Styles.card}>
					<View style={Styles.infos}>
						<View style={Styles.space_row}>
							<View>
								<Text style={Styles.time}>{timeLabel}</Text>
								<Text style={Styles.workTitle}>{program.work.title}</Text>
							</View>
							<Icon
								name="check-circle"
								type="font-awesome"
								color={program.episode.isWatched ? Colors.checkGreen : Colors.disable}
								/>
						</View>
						<Text style={Styles.title}>{label}</Text>
					</View>
					<View style={Styles.footer}>
						<View style={Styles.row}>
							<Icon
								name="bookmark"
								size={18}
								type="font-awesome"
								color={Colors.broccoli}
								/>
							<Text style={Styles.number}>{program.episode.recordsCount}</Text>
						</View>
						<View style={Styles.row}>
							<Icon
								name="comment"
								size={18}
								type="font-awesome"
								color={Colors.broccoli}
								/>
							<Text style={Styles.number}>{program.episode.recordCommentsCount}</Text>
							<Text style={Styles.number_new}>{program.episode.newCommentCountLabel()}</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	static rowHasChanged(p1: Program, p2: Program) {
		// const res = `${p1.id}::${p1.episode.readedRecordCommentsCount}` != `${p2.id}::${p2.episode.readedRecordCommentsCount}`;
		return true;
	}
}

export default ProgramCell;
