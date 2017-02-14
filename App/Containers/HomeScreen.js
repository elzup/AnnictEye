'use strict'

import React from 'react'
import {
	View,
	ListView,
	StyleSheet} from 'react-native'

import ProgramCell from '../Components/ProgramCell'
import Indicator from '../Components/Indicator'

import {connect} from 'react-redux'
import LoginActions, {isLoggedIn} from '../Redux/LoginRedux'
import HomeActions, {selectPrograms} from '../Redux/HomeRedux'
import EpisodeActions from '../Redux/EpisodeRedux'
import moment from 'moment'

import {Actions} from 'react-native-router-flux'
import {ApplicationStyles, Metrics, Colors} from '../Themes/'
import {Program, Episode} from '../Services/Type'

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

class HomeScreen extends React.Component {
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
			dataSource: ds.cloneWithRows(props.programs)
		}
	}

	componentDidMount = () => {
		this.setState({loading: true})
		this.props.loadProgram()
	}

	componentWillReceiveProps = (newProps: any) => {
		this.forceUpdate()
		if (!newProps.isLoggedIn) {
			Actions.loginScreen()
			return
		}

		// 放送済みのみ
		const finishFilter = (program: Program) => moment(program.started_at).isBefore()
		this.setState({
			loading: newProps.programs.length === 0,
			dataSource: this.state.dataSource.cloneWithRows(newProps.programs.filter(finishFilter))
		})
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
		this.props.setupEpisode(episode.merge({work}))
		Actions.episodeScreen({title: `${work.title} ${episode.number_text}`})
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

const mapStateToProps = state => {
	// 監視対象はここ
	return {
		isLoggedIn: isLoggedIn(state.login),
		programs: selectPrograms(state.home)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(LoginActions.logout()),
		loadProgram: () => dispatch(HomeActions.programRequest()),
		setupEpisode: (episode: Episode) => dispatch(EpisodeActions.episodeSetup(episode))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
