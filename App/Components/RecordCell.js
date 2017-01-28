// @flow

import React from 'react'
import moment from 'moment'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../Themes/'
import Icon from 'react-native-vector-icons/FontAwesome'

import type { Record } from '../Services/Type'

type RecordCellProps = {
  record: Record,
  onPressLike: () => void,
  onPressReply: () => void,
  onPressGlobe: () => void
}

const RecordCell = (props: RecordCellProps) => {
  const { record, onPressLike, onPressReply, onPressGlobe } = props
  const timeLabel = moment(record.started_at).format('MM/DD HH:mm')
  return (
    <View style={Styles.root}>
      <View style={Styles.head}>
        <Text style={Styles.userName}>{record.user.name}</Text>
        <Text style={Styles.postTime}>{timeLabel}</Text>
      </View>
      <View style={Styles.body}>
        <Text style={Styles.comment}>{record.comment}</Text>
      </View>
      <View style={Styles.footer}>
        <View style={Styles.footerActions}>
          <TouchableOpacity onPress={onPressLike}>
            <View style={Styles.footerAction} >
              <Icon name='heart' color={Colors.disable} />
              <Text style={Styles.number}>{record.comments_count}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressReply}>
            <View style={Styles.footerAction} >
              <Icon name='reply' color={Colors.disable} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressGlobe}>
            <View style={Styles.footerAction} >
              <Icon name='globe' color={Colors.steel} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const Styles = {
  root: {
    ...ApplicationStyles.card,
    flex: 3,
    flexDirection: 'column',
    backgroundColor: Colors.snow
  },
  head: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userName: {
    fontSize: Fonts.size.small,
    color: Colors.green
  },
  postTime: {
    fontSize: Fonts.size.small,
    color: Colors.steel,
    textAlign: 'right'
  },
  body: {
    marginVertical: Metrics.smallMargin
  },
  comment: {
    lineHeight: Fonts.size.input
  },
  footer: {
    paddingTop: Metrics.smallMargin
  },
  footerActions: {
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
}

export default RecordCell
