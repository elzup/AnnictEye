// @flow

import React from 'react'
import { View, Text, ListView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'
import HomeActions, { selectPrograms } from '../Redux/HomeRedux'
import moment from 'moment'

import { Actions as NavigationActions } from 'react-native-router-flux'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../Themes/'
import type { Program } from '../Services/Type'

type HomeScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  syncLogin: () => void,
  loggedIn: boolean,
  programs: Array<Program>
}

class HomeScreen extends React.Component {
  props: HomeScreenProps
  isAttempting: boolean
  isLoaded: boolean

  state: {
    dataSource: Object
  }

  constructor (props) {
    super(props)

    const rowHasChanged = (r1: Program, r2: Program) => r1.id !== r2.id

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(props.programs)
    }
    this.isAttempting = false
    this.isLoaded = false
  }

  componentDidMount = () => {
    this.props.syncLogin()
    this.isAttempting = true
  }

  componentWillReceiveProps = (newProps) => {
    this.forceUpdate()
    const {loggedIn, fetching, programs} = newProps
    if (!this.isAttempting || fetching) {
      return
    }
    if (!loggedIn) {
      NavigationActions.loginScreen()
      return
    }
    if (!this.isLoaded) {
      this.props.loadProgram()
      this.isAttempting = true
      this.isLoaded = true
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(programs)
    })
  }

  renderRow = (program: Program) => {
    const label = program.episode.number_text + ' | ' + (program.episode.title || '---')
    const timeLabel = moment(program.started_at).format('MM/DD HH:mm')
    return (
      <View style={Styles.episodeCard}>
        <View style={Styles.infos}>
          <Text style={Styles.timeLabel}>{timeLabel}</Text>
          <Text style={Styles.boldLabel}>{program.work.title}</Text>
          <Text style={Styles.label}>{label}</Text>
        </View>
      </View>
    )
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
          pageSize={15}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: isLoggedIn(state.login),
    programs: selectPrograms(state.home)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    syncLogin: () => dispatch(LoginActions.syncLogin()),
    loadProgram: () => dispatch(HomeActions.programRequest())
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
