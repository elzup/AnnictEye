// @flow

import React from 'react'
import {
  View,
  Text,
  ListView,
  StyleSheet,
  ScrollView,
  Linking,
  ActivityIndicator,
  TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'
import EpisodeActions, { selectEpisode, selectRecords, isSomeEpisode } from '../Redux/EpisodeRedux'
import moment from 'moment'

import { Actions, ActionConst } from 'react-native-router-flux'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../Themes/'
import type { Record, Episode } from '../Services/Type'

type EpisodeScreenProps = {
  dispatch: () => any,
  logout: () => void,
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

  constructor (props) {
    super(props)

    const rowHasChanged = (r1: Record, r2: Record) => r1.id !== r2.id

    // TODO: check
    if (props.episode === null) {
      Actions.homeScreen({ type: ActionConst.RESET })
    }
    const ds = new ListView.DataSource({rowHasChanged})
    this.state = {
      loading: false,
      dataSourceRecords: ds.cloneWithRows(props.isSomeEpisode ? props.records : [])
    }
  }

  componentDidMount = () => {
    console.log('componentDidMount')
    this.setState({ loading: true })
    this.props.loadEpisode(this.props.episode)
  }

  componentWillReceiveProps = (newProps) => {
    console.log('=> Receive', newProps)
    this.forceUpdate()
    const { isLoggedIn, records } = newProps
    if (!isLoggedIn) {
      Actions.homeScreen({ type: ActionConst.RESET })
      return
    }

    const filterHasComment = (record: Record) => record.comment && record.comment !== ''
    this.setState({
      loading: false,
      dataSourceRecords: this.state.dataSourceRecords.cloneWithRows(records.filter(filterHasComment))
    })
  }

  renderRow = (record: Record, sectionID: number, rowID: number) => {
    const { episode } = this.props
    const timeLabel = moment(record.created_at).format('MM/DD HH:mm')
    return (
      <View>
        <View style={Styles.recordCard}>
          <View style={Styles.recordHead}>
            <Text style={Styles.name}>{record.user.name}</Text>
            <Text style={Styles.timeLabel}>{timeLabel}</Text>
          </View>
          <View style={Styles.recordBody}>
            <Text style={Styles.comment}>{record.comment}</Text>
          </View>
          <View style={Styles.recordFooter}>
            <View style={Styles.recordFooterActions}>
              <TouchableHighlight onPress={() => { this.pressLike(record) }}>
                <View style={Styles.footerAction} >
                  <Icon name='heart' color={Colors.disable} />
                  <Text style={Styles.number}>{record.comments_count}</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => { this.pressReply(record) }}>
                <View style={Styles.footerAction} >
                  <Icon name='reply' color={Colors.disable} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => { this.pressGlobe(episode, record) }}>
                <View style={Styles.footerAction} >
                  <Icon name='globe' color={Colors.steel} />
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    )
  }

  pressLike = (record: Record) => {
    console.log(`like action: ${record.id}`)
  }

  pressReply = (record: Record) => {
    console.log(`reply action: ${record.id}`)
  }

  pressGlobe = (episode: Episode, record: Record) => {
    console.log(`open action: ${record.id}`)
    // HACK: move to model
    Linking.openURL(`https://annict.com/works/${episode.work.id}/episodes/${episode.id}/checkins/${record.id}`)
  }

  noRowData = () => {
    return this.state.dataSourceRecords.getRowCount() === 0
  }

  renderFooter () {
    if (!this.state.loading) {
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
            renderFooter={this.renderFooter.bind(this)}
            pageSize={50}
            />
        </View>
      </ScrollView>
    )
  }

  componentWillUnmount = () => {
    this.setState({
      dataSourceRecords: this.state.dataSourceRecords.cloneWithRows([])
    })
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: isLoggedIn(state.login),
    records: selectRecords(state.episode),
    episode: selectEpisode(state.episode),
    isSomeEpisode: isSomeEpisode(state.episode)
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
    flex: 3,
    flexDirection: 'column',
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
    marginVertical: Metrics.smallMargin,
    lineHeight: Fonts.size.input
  },
  recordFooter: {
    paddingTop: Metrics.smallMargin
  },
  recordFooterActions: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  footerAction: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  number: {
    marginLeft: Metrics.smallMargin,
    fontSize: Fonts.size.small
  }
})
