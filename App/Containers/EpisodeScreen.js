/* @flow */
'use strict'

import React from 'react'
import {
  View,
  Text,
  ListView,
  StyleSheet,
  ScrollView,
  Linking
} from 'react-native'
import Indicator from '../Components/Indicator'
import RecordCell from '../Components/RecordCell'
import DrawerButton from '../Components/DrawerButton'

import {connect} from 'react-redux'
import LoginActions, {isLoggedIn} from '../Redux/LoginRedux'
import EpisodeActions, {selectEpisode, selectCommentRecords, isSomeEpisode} from '../Redux/EpisodeRedux'

import {Actions, ActionConst} from 'react-native-router-flux'
import {ApplicationStyles, Metrics, Colors, Fonts} from '../Themes/'
import {Record, Episode} from '../Services/Type'

const Styles = StyleSheet.create({
	...ApplicationStyles.screen,
	container: {
		flex: 1,
		marginTop: Metrics.navBarHeight,
		backgroundColor: Colors.silver
	},
	episodeHeader: {
		...ApplicationStyles.headerBox
	},
	infos: {
		flex: 1
	},
	subLabel: {
		marginVertical: Metrics.smallMargin,
		fontSize: Fonts.size.small
	},
	boldLabel: {
		fontWeight: 'bold',
		marginVertical: Metrics.smallMargin
	},
	label: {
		marginBottom: Metrics.smallMargin
	},
	listContent: {
		marginTop: Metrics.baseMargin
	}
})

type EpisodeScreenProps = {
  loadEpisode: () => void,
  isLoggedIn: ?boolean,
  records: Array<Record>,
  episode: Episode
}

class EpisodeScreen extends React.Component {
	props: EpisodeScreenProps
	state: {
    loading: boolean,
    dataSourceRecords: Object
  }

	constructor(props) {
		super(props)

		const rowHasChanged = (r1: Record, r2: Record) => r1.id !== r2.id

		if (props.episode === null) {
			Actions.homeScreen({type: ActionConst.RESET})
		}
		const ds = new ListView.DataSource({rowHasChanged})
		this.state = {
			loading: false,
			dataSourceRecords: ds.cloneWithRows(props.isSomeEpisode ? props.records : [])
		}
	}

	componentDidMount = () => {
		console.log('componentDidMount')
		this.setState({loading: true})
		this.props.loadEpisode(this.props.episode)
	}

	componentWillReceiveProps = newProps => {
		console.log('=> Receive', newProps)
		this.forceUpdate()
		const {isLoggedIn, records} = newProps
		if (!isLoggedIn) {
			Actions.homeScreen({type: ActionConst.RESET})
			return
		}

		this.setState({
			loading: false,
			dataSourceRecords: this.state.dataSourceRecords.cloneWithRows(records)
		})
	}

	noRowData = () => {
		return this.state.dataSourceRecords.getRowCount() === 0
	}

	render() {
		const {episode} = this.props
		return (
			<ScrollView
				automaticallyAdjustContentInsets={false}
				>
				<View style={Styles.container}>
					<View style={Styles.episodeHeader}>
						<Text style={Styles.subLabel}>{this.props.episode.work.title}</Text>
						<Text style={Styles.boldLabel}>{episode.numberText} {episode.title || '---'}</Text>
					</View>
					<DrawerButton text={'記録する'} onPress={this.handleOpenModal}/>
					<ListView
						contentContainerStyle={Styles.listContent}
						dataSource={this.state.dataSourceRecords}
						renderRow={this.renderRow}
						renderFooter={this.renderFooter}
						pageSize={50}
						enableEmptySections
						/>
				</View>
			</ScrollView>
		)
	}

	renderFooter = () => (
		<Indicator loading={this.state.loading}/>
  )

	handleOpenModal = () => {
		const { episode } = this.props
		Actions.recordCreateModal({title: `記録する ${episode.numberText}`})
	}

	renderRow = (record: Record) => (
		<RecordCell
			record={record}
			onPressLike={() => {
				this.handlePressLike(record)
			}}
			onPressReply={() => {
				this.handlePressReply(record)
			}}
			onPressGlobe={() => {
				this.handlePressGlobe(this.props.episode, record)
			}}
		/>
  )

	handlePressLike = (record: Record) => {
		console.log(`like action: ${record.id}`)
	}

	handlePressReply = (record: Record) => {
		console.log(`reply action: ${record.id}`)
	}

	handlePressGlobe = (episode: Episode, record: Record) => {
		console.log(`open action: ${record.id}`)
    // HACK: move to model
		Linking.openURL(`https://annict.com/works/${episode.work.id}/episodes/${episode.id}/checkins/${record.id}`)
	}

	componentWillUnmount = () => {
		this.setState({
			dataSourceRecords: this.state.dataSourceRecords.cloneWithRows([])
		})
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: isLoggedIn(state.login),
		records: selectCommentRecords(state.episode),
		episode: selectEpisode(state.episode),
		isSomeEpisode: isSomeEpisode(state.episode)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(LoginActions.logout()),
		loadEpisode: episode => dispatch(EpisodeActions.episodeRequest(episode))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeScreen)
