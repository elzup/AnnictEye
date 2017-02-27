/* @flow */

import React, {Component} from 'react';
import {
	View,
	ListView,
	Text,
	StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';

import ProgramCell from '../Components/ProgramCell';
import Indicator from '../Components/Indicator';

import {ApplicationStyles, Metrics, Colors} from '../Themes/';
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
	dataSource: any
}

const rowHasChanged = (r1: Program, r2: Program) => r1.id !== r2.id;

class HomeScreen extends Component {
	props: Props
	state: State = {
		loading: true,
		dataSource: new ListView.DataSource({rowHasChanged}).cloneWithRows([])
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
			dataSource: this.state.dataSource.cloneWithRows(programs)
		});
	}

	renderRow = (program: Program) => {
		return (
			<ProgramCell
				program={program}
				onPress={() => {
					this.pressRow(program);
				}}
				/>
		);
	}

	pressRow = (program: Program) => {
		const {episode, work} = program;
		episode.work = work;
		Actions.episodeScreen({title: `${work.title} ${episode.numberText}`});
	}

	noRowData = () => {
		return this.state.dataSource.getRowCount() === 0;
	}

	render() {
		return (
			<View style={Styles.container}>
				<Text visible={false}>ロードできませんでした。</Text>
				<ListView
					contentContainerStyle={Styles.listContent}
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}
					pageSize={50}
					onEndReachedThreshold={10}
					enableEmptySections
					/>
			</View>
		);
	}
}

export default HomeScreen;
