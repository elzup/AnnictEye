/* @flow */
'use strict'

import React from 'react'
import {
	View,
	ListView,
	StyleSheet} from 'react-native'
import moment from 'moment'

import ProgramCell from '../Components/ProgramCell'
import Indicator from '../Components/Indicator'

import {Actions} from 'react-native-router-flux'
import {ApplicationStyles, Metrics, Colors} from '../Themes/'
import {Program, Episode} from '../Services/Type'
import { Api } form '../Services/Api'

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
})

type HomeScreenProps = {
	programs: Array<Program>,
	loadProgram: () => void,
	setupEpisode: () => void,
}

class HomeScreen extends React.PureComponent {
	props: HomeScreenProps
	state: {
		dataSource: Object,
		loading: boolean
	}

	constructor(props) {
		super(props)

		const rowHasChanged = (r1: Program, r2: Program) => r1.id !== r2.id

		// DataSource configured
		const ds = new ListView.DataSource({rowHasChanged})

		// Datasource is always in state
		this.state = {
			loading: false,
			dataSource: ds.cloneWithRows(props.programs),
		}
	}

	componentDidMount = () => {
		this.init();
	}

	async init() {
		// TODO: Actions.loginScreen()
		await loadProgram();
	}

	async loadProgram() {
		// 放送済みのみ
		this.setState({loading: true})
		const progorams = await loadProgram();
		const finishFilter = (program: Program) => program.startedAt.isBefore()
		this.setState({
			loading: programs.length === 0,
			dataSource: this.state.dataSource.cloneWithRows(programs.filter(finishFilter))
		})
		this.setState({loading: false})
	}

	renderRow = (program: Program) => {
		return (
			<ProgramCell
				program={program}
				onPress={() => {
					this.pressRow(program)
				}}
				/>
		)
	}

	pressRow = (program: Program) => {
		const {episode, work} = program
		episode.work = work
		this.props.setupEpisode(episode)
		Actions.episodeScreen({title: `${work.title} ${episode.numberText}`})
	}

	noRowData = () => {
		return this.state.dataSource.getRowCount() === 0
	}

	render() {
		return (
			<View style={Styles.container}>
				<ListView
					contentContainerStyle={Styles.listContent}
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}
					renderFooter={this.renderFooter}
					pageSize={50}
					onEndReachedThreshold={10}
					enableEmptySections
					/>
			</View>
		)
	}

	renderFooter = () => (
		<Indicator loading={this.state.loading}/>
	)
}

export default HomeScreen
