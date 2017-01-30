'use strict'

import React from 'react'
import moment from 'moment'
import {
  View,
  Text
} from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../Themes/'
import IconButton from './IconButton'

import { Record } from '../Services/Type'

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
        <View style={Styles.buttons}>
          <IconButton
            iconName='heart'
            count={record.comments_count}
            onPress={onPressLike}
            />
          <IconButton iconName='reply' onPress={onPressReply} />
          <IconButton iconName='globe' onPress={onPressGlobe} />
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
  buttons: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
}

export default RecordCell
