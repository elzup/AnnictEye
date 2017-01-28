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
    </View>
  )
}

const Styles = {
  card: {
    ...ApplicationStyles.card,
    flex: 2,
    backgroundColor: Colors.snow
  },
  infos: {
    flex: 1
  },
  time: {
    fontSize: Fonts.size.small,
    color: Colors.green
  },
  workTitle: {
    fontWeight: 'bold',
    marginVertical: Metrics.smallMargin
  },
  title: {
    marginBottom: Metrics.smallMargin
  }
}

export default RecordCell
