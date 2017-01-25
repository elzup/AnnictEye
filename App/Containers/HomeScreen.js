// @flow

import React from 'react'
import {
  View,
  Text,
  ListView,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight } from 'react-native'

import { connect } from 'react-redux'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'
import HomeActions, { selectPrograms, isFetching } from '../Redux/HomeRedux'
import EpisodeActions from '../Redux/EpisodeRedux'
import moment from 'moment'

import { Actions } from 'react-native-router-flux'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../Themes/'
import type { Program, Episode } from '../Services/Type'

type HomeScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  isLoggedIn: ?boolean,
  programs: Array<Program>,
  logout: () => void,
  loadProgram: () => void,
  setupEpisode: () => void
}

class HomeScreen extends React.Component {
  props: HomeScreenProps
  state: {
    dataSource: Object,
    fetching: boolean
  }

  constructor (props) {
    super(props)

    const rowHasChanged = (r1: Program, r2: Program) => r1.id !== r2.id

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(props.programs),
      fetching: false
    }
  }

  componentDidMount = () => {
    console.log('componentDidMount')
    this.setState({ fetching: true })
    this.props.loadProgram()
  }

  componentWillReceiveProps = (newProps) => {
    console.log('=> Receive', newProps)
    this.forceUpdate()
    const { isLoggedIn, isFetching, programs } = newProps
    if (isFetching) {
      return
    }
    if (!isLoggedIn) {
      Actions.loginScreen()
      return
    }

    // 放送済みのみ
    const finishFilter = (program: Program) => moment(program.started_at).isBefore()
    this.setState({
      fetching: isFetching,
      dataSource: this.state.dataSource.cloneWithRows(programs.filter(finishFilter))
    })
  }

  renderRow = (program: Program, sectionID: number, rowID: number) => {
    const label = program.episode.number_text + ' | ' + (program.episode.title || '---')
    const timeLabel = moment(program.started_at).format('MM/DD HH:mm')
    return (
      <TouchableHighlight onPress={() => { this.pressRow(rowID, program) }} >
        <View style={Styles.episodeCard}>
          <View style={Styles.infos}>
            <Text style={Styles.timeLabel}>{timeLabel}</Text>
            <Text style={Styles.boldLabel}>{program.work.title}</Text>
            <Text style={Styles.label}>{label}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  pressRow = (rowID: number, program: Program) => {
    const { episode, work } = program
    this.props.setupEpisode(episode.merge({ work }))
    Actions.episodeScreen({ title: `${work.title} ${episode.number_text}` })
  }

  noRowData = () => {
    return this.state.dataSource.getRowCount() === 0
  }

  renderFooter () {
    console.log(`fetching => ${this.state.fetching}`)
    if (!this.state.fetching) {
      return null
    }
    return (
      <ActivityIndicator
        animating
        style={ApplicationStyles.indicator}
        size='large'
        />
    )
  }

  render () {
    return (
      <View style={Styles.container}>
        <ListView
          contentContainerStyle={Styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderFooter={this.renderFooter.bind(this)}
          pageSize={50}
          onEndReachedThreshold={10}
          />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  // 監視対象はここ
  return {
    isLoggedIn: isLoggedIn(state.login),
    isFetching: isFetching(state.home),
    programs: selectPrograms(state.home)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logout()),
    loadProgram: () => dispatch(HomeActions.programRequest()),
    setupEpisode: (episode: Episode) => dispatch(EpisodeActions.episodeSetup(episode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const Styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.silver
  },
  timeLabel: {
    fontSize: Fonts.size.small,
    color: Colors.green
  },
  infos: {
    flex: 1
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
  },
  episodeCard: {
    ...ApplicationStyles.card,
    flex: 2,
    backgroundColor: Colors.snow
  }
})
