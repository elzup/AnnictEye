// @flow

import React from 'react'
import {
  View,
  Text,
  ListView,
  StyleSheet,
  TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'
import EpisodeActions, { selectEpisode, selectRecords } from '../Redux/EpisodeRedux'
// import moment from 'moment'

import { Actions, ActionConst } from 'react-native-router-flux'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../Themes/'
import type { Record, Episode } from '../Services/Type'

type EpisodeScreenProps = {
  dispatch: () => any,
  logout: () => void,
  loadEpisode: () => void,
  fetching: boolean,
  isLoggedIn: ?boolean,
  records: Array<Record>,
  episode: Episode
}

class EpisodeScreen extends React.Component {
  props: EpisodeScreenProps
  state: {
    dataSourceRecords: Object
  }

  constructor (props) {
    super(props)

    const rowHasChanged = (r1: Record, r2: Record) => r1.id !== r2.id

    // TODO: check
    if (props.episode === null) {
      Actions.homeScreen({ type: ActionConst.RESET })
    }
    const ds = new ListView.DataSource({rowHasChanged})
    this.state = {
      dataSourceRecords: ds.cloneWithRows(props.records)
    }
  }

  componentDidMount = () => {
    console.log('componentDidMount')
    this.props.loadEpisode(this.props.episode)
  }

  componentWillReceiveProps = (newProps) => {
    console.log('=> Receive', newProps)
    this.forceUpdate()
    const { isLoggedIn, fetching, records } = newProps
    if (fetching) {
      return
    }
    if (!isLoggedIn) {
      Actions.homeScreen({ type: ActionConst.RESET })
      return
    }

    this.setState({
      dataSourceRecords: this.state.dataSourceRecords.cloneWithRows(records)
    })
  }

  renderRow = (record: Record, sectionID: number, rowID: number) => {
    const label = record.episode.number_text + ' | ' + (record.episode.title || '---')
    const timeLabel = '----'
    return (
      <TouchableHighlight onPress={() => { this.pressRow(rowID) }} >
        <View style={Styles.episodeCard}>
          <View style={Styles.infos}>
            <Text style={Styles.timeLabel}>{timeLabel}</Text>
            <Text style={Styles.boldLabel}>{record.work.title}</Text>
            <Text style={Styles.label}>{label}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  pressRow = (rowID: number) => {
    console.log(rowID)
  }

  noRowData = () => {
    return this.state.dataSourceRecords.getRowCount() === 0
  }

  render () {
    // const timeLabel = moment(program.started_at).format('MM/DD HH:mm')
    return (
      <View style={Styles.container}>
        <View style={Styles.episodeHeader}>
          <Text style={Styles.subLabel}>{this.props.episode.work.title}</Text>
          <Text style={Styles.boldLabel}>{this.props.episode.title}</Text>
        </View>
        <ListView
          contentContainerStyle={Styles.listContent}
          dataSource={this.state.dataSourceRecords}
          renderRow={this.renderRow}
          pageSize={15}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: isLoggedIn(state.login),
    records: selectRecords(state.episode),
    episode: selectEpisode(state.episode)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logout()),
    loadEpisode: (episode) => dispatch(EpisodeActions.episodeRequest(episode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeScreen)

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
  subLabel: {
    marginVertical: Metrics.smallMargin
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
