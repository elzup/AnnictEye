'use strict'

import React from 'react'
import {
  View,
  ListView,
  StyleSheet } from 'react-native'

import ProgramCell from '../Components/ProgramCell'
import Indicator from '../Components/Indicator'

import { connect } from 'react-redux'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'
import HomeActions, { selectPrograms } from '../Redux/HomeRedux'
import EpisodeActions from '../Redux/EpisodeRedux'
import moment from 'moment'

import { Actions } from 'react-native-router-flux'
import { ApplicationStyles, Metrics, Colors } from '../Themes/'
import { Program, Episode } from '../Services/Type'

type HomeScreenProps = {
  dispatch: () => any,
  loading: boolean,
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
    loading: boolean
  }

  constructor (props) {
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
    console.log('componentDidMount')
    this.setState({ loading: true })
    this.props.loadProgram()
  }

  componentWillReceiveProps = (newProps) => {
    console.log('=> Receive', newProps)
    this.forceUpdate()
    const { isLoggedIn, programs } = newProps
    if (!isLoggedIn) {
      Actions.loginScreen()
      return
    }

    // 放送済みのみ
    const finishFilter = (program: Program) => moment(program.started_at).isBefore()
    this.setState({
      loading: programs.length === 0,
      dataSource: this.state.dataSource.cloneWithRows(programs.filter(finishFilter))
    })
  }

  renderRow = (program: Program, sectionID: number, rowID: number) => {
    return (
      <ProgramCell
        program={program}
        onPress={() => { this.pressRow(rowID, program) }} />
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

  render () {
    return (
      <View style={Styles.container}>
        <ListView
          contentContainerStyle={Styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderFooter={() => <Indicator loading={this.state.loading} />}
          pageSize={50}
          onEndReachedThreshold={10}
          enableEmptySections
          />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  // 監視対象はここ
  return {
    isLoggedIn: isLoggedIn(state.login),
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
  listContent: {
    marginTop: Metrics.baseMargin
  }
})
