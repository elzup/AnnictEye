// @flow

import React from 'react'
import { View, Text, ListView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'
import CommentsActions, { selectPrograms } from '../Redux/CommentsRedux'
import moment from 'moment'

import { Actions as NavigationActions } from 'react-native-router-flux'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../Themes/'
import type { Program, Comment, Episode } from '../Services/Type'

type CommentsScreenProps = {
  dispatch: () => any,
  logout: () => void,
  loadComments: () => void,
  fetching: boolean,
  isLoggedIn: ?boolean,
  comments: Array<Comment>,
  episode: Episode
}

class CommentsScreen extends React.Component {
  props: CommentsScreenProps
  state: {
    dataSourceComments: Object
  }

  constructor (props) {
    super(props)

    const rowHasChanged = (r1: Comment, r2: Comment) => r1.id !== r2.id

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSourceComments: ds.cloneWithRows(props.comments)
    }
  }

  componentDidMount = () => {
    console.log('componentDidMount')
    this.props.loadProgram()
  }

  componentWillReceiveProps = (newProps) => {
    console.log('=> Receive', newProps)
    this.forceUpdate()
    const { isLoggedIn, fetching, comments } = newProps
    if (fetching) {
      return
    }
    if (!isLoggedIn) {
      NavigationActions.loginScreen()
      return
    }

    // 放送済みのみ
    const finishFilter = (program: Program) => moment(program.started_at).isBefore()
    this.setState({
      dataSourceComments: this.state.dataSourceComments.cloneWithRows(comments.filter(finishFilter))
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
    return this.state.dataSourceComments.getRowCount() === 0
  }

  render () {
    return (
      <View style={Styles.container}>
        <View style={Styles.episodeHeader}>
          <Text style={Styles.boldLabel}>{this.props.episode.title}</Text>
        </View>
        <ListView
          contentContainerStyle={Styles.listContent}
          dataSource={this.state.dataSourceComments}
          renderRow={this.renderRow}
          pageSize={15}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  // 監視対象はここ
  return {
    isLoggedIn: isLoggedIn(state.login),
    comments: selectPrograms(state.comments)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logout()),
    loadEpisodes: () => dispatch(CommentsActions.programRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsScreen)

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
