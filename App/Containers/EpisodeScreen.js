// @flow

import React from 'react'
import {
  View,
  Text,
  ListView,
  StyleSheet,
  ScrollView,
  TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'
import EpisodeActions, { selectEpisode, selectRecords } from '../Redux/EpisodeRedux'
import moment from 'moment'

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

    const filterHasComment = (record: Record) => record.comment && record.comment !== ''
    this.setState({
      dataSourceRecords: this.state.dataSourceRecords.cloneWithRows(records.filter(filterHasComment))
    })
  }

  renderRow = (record: Record, sectionID: number, rowID: number) => {
    const timeLabel = moment(record.created_at).format('MM/DD HH:mm')
    return (
      <TouchableHighlight onPress={() => { this.pressRow(rowID) }} >
        <View style={Styles.recordCard}>
          <View style={Styles.recordHead}>
            <Text style={Styles.name}>{record.user.name}</Text>
            <Text style={Styles.timeLabel}>{timeLabel}</Text>
          </View>
          <View style={Styles.recordBody}>
            <Text style={Styles.comment}>{record.comment}</Text>
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
    const { episode } = this.props
    const episodeLabel = episode.number_text + ' | ' + (episode.title || '---')
    return (
      <ScrollView
        ref='scrollView'
        automaticallyAdjustContentInsets={false} >
        <View style={Styles.container}>
          <View style={Styles.episodeHeader}>
            <Text style={Styles.subLabel}>{this.props.episode.work.title}</Text>
            <Text style={Styles.boldLabel}>{episodeLabel}</Text>
          </View>
          <ListView
            contentContainerStyle={Styles.listContent}
            dataSource={this.state.dataSourceRecords}
            renderRow={this.renderRow}
            pageSize={15}
            />
        </View>
      </ScrollView>
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
  },
  recordCard: {
    ...ApplicationStyles.card,
    flex: 1,
    backgroundColor: Colors.snow
  },
  recordHead: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: {
    fontSize: Fonts.size.small,
    color: Colors.green
  },
  timeLabel: {
    fontSize: Fonts.size.small,
    color: Colors.steel,
    textAlign: 'right'
  },
  recordBody: {
    paddingTop: Metrics.baseMargin
  }
})
