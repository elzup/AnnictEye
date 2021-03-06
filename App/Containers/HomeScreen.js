/* @flow */

import React, {Component} from 'react';
import {
	View,
	Text,
	ListView,
	StyleSheet} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';

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
	}
});

type Props = {
}

type State = {
	loading: boolean,
	programs: Array<Program>,
	dataSource: any
}

class HomeScreen extends React.PureComponent {
	props: Props
	state: State = {
		loading: true,
		programs: [],
		dataSource: new ListView.DataSource({rowHasChanged: ProgramCell.rowHasChanged}).cloneWithRows([])
	}

	componentWillMount() {
		SplashScreen.hide();
		if (!store.isLogin()) {
			Actions.loginScreen({type: ActionConst.REPLACE});
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
				Actions.loginScreen({type: ActionConst.REPLACE});
			} else {
				throw e;
			}
		}
	}

	async loadProgram() {
		const programs = await client.getPrograms();
		const episodeIDs = programs.map(e => e.episode.id);
		const episodes = store.getEpisodes(episodeIDs);
		const lib = {};
		episodes.forEach(e => {
			lib[e.episode_id] = e.comments_count;
		});
		console.log(lib);
		programs.forEach(p => {
			const oldCount = lib[p.episode.id] || 0;
			if (lib[p.episode.id] == null) {
				store.addEpisode(p.episode);
			}
			p.episode.readedRecordCommentsCount = oldCount;
		});
		this.setState({
			loading: false,
			programs,
			dataSource: this.state.dataSource.cloneWithRows(programs)
		});
	}

	pressRow(rowID: number) {
		const program = this.state.programs[rowID];
		const {episode, work} = program;
		episode.work = work;
		episode.readed();
		store.saveEpisodeReaded(episode);
		this.setState({
			programs: this.state.programs,
			dataSource: this.state.dataSource.cloneWithRows(this.state.programs)
		});
		Actions.episodeScreen({
			title: `${work.title} ${episode.numberText}`,
			episode
		});
	}

	noRowData = () => {
		return this.state.dataSource.getRowCount() === 0;
	}

	render() {
		return (
			<View style={Styles.container}>
				<ListView
					contentContainerStyle={Styles.listContent}
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)}
					renderFooter={this.renderFooter.bind(this)}
					pageSize={50}
					onEndReachedThreshold={10}
					enableEmptySections
					/>
			</View>
		);
	}

	renderRow(program: Program, sectionID: number, rowID: number) {
		return (
			<ProgramCell
				program={program}
				onPress={() => {
					this.pressRow(rowID);
				}}
				/>
		);
	}

	renderFooter() {
		return (
			<Indicator loading={this.state.loading}/>
		);
	}
}

export default HomeScreen;
