/* @flow */

import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {List, ListItem} from 'react-native-elements';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

import ProgramCell from '../Components/ProgramCell';
import Indicator from '../Components/Indicator';

import {ApplicationStyles, Metrics, Colors, Fonts} from '../Themes/';
import {Program, Episode} from '../Services/Type';
import {store} from '../Models/RealmManager';
import {client} from '../Services/AnnictApi';

const Styles = StyleSheet.create({
	...ApplicationStyles.screen,
	container: {
		flex: 1,
		marginTop: Metrics.navBarHeight,
		backgroundColor: Colors.silver
	},
	listContent: {
		marginTop: Metrics.baseMargin
	},
	card: {
		...ApplicationStyles.card,
		flexDirection: 'row',
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
});

type Props = {
}

type State = {
	loading: boolean,
	programs: Array<Program>
}

const rowHasChanged = (r1: Program, r2: Program) => r1.id !== r2.id;

class HomeScreen extends Component {
	props: Props
	state: State = {
		loading: true,
		programs: []
	}

	componentWillMount() {
		if (!store.isLogin()) {
			Actions.loginScreen();
		}
	}

	componentDidMount() {
		this.init();
	}

	async init() {
		try {
			await this.loadProgram();
		} catch (e) {
			if (e.message == 'no-auth') {
				store.deleteSession();
				Actions.loginScreen();
			} else {
				console.log(e.stack);
			}
		}
	}

	async loadProgram() {
		const programs = await client.getPrograms();
		console.log(programs);
		// 放送済みのみ
		this.setState({
			loading: false,
			programs
		});
	}

	render() {
		return (
			<View style={Styles.container}>
				<Text visible={false}>ロードできませんでした。</Text>
				<List>
					{
						this.state.programs.map((program, i) => {
							const label = `${program.episode.numberText}|${program.episode.title}`;
							const timeLabel = moment(program.startedAt).format('MM/DD HH:mm');
							return (
								<ListItem
									key={i}
									component={
										<View style={Styles.card}>
											<View style={Styles.infos}>
												<Text style={Styles.time}>{timeLabel}</Text>
												<Text style={Styles.workTitle}>{program.work.title}</Text>
												<Text style={Styles.title}>{label}</Text>
											</View>
											<View style={Styles.footer}>
												<View>
													<Icon name="bookmark" color={Colors.broccoli}/>
													<Text style={Styles.number}>{program.episode.recordsCount}</Text>
												</View>
												<View>
													<Text style={Styles.title}>{label}</Text>
												</View>
											</View>
										</View>
									}
									/>
							);
						})
					}
				</List>
			</View>
		);
	}
}

export default HomeScreen;
