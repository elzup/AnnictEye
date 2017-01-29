// @flow

import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Navigator
} from 'react-native'
import { Episode } from '../Services/Type'
import { ApplicationStyles, Metrics, Fonts } from '../Themes/'

type RecordModalProps = {
  episode: Episode
}

class RecordCreateModal extends Component {
  props: RecordModalProps
  state = {
    visible: false
  }

  setVisible (visible) {
    this.setState({ visible: visible })
  }

  render () {
    const { episode } = this.props
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        style={Styles.modal}
        visible={this.state.visible}
        onRequestClose={() => { console.log('Modal has been closed.') }}
        >
        <Navigator
          initialRoute={{ title: '記録する', index: 0 }}
          renderScene={(route, navigator) =>
            <View>
              <View style={Styles.episodeHeader}>
                <Text style={Styles.subLabel}>{episode.work.title} {episode.number_text}</Text>
                <Text style={Styles.boldLabel}>{episode.title}</Text>
              </View>

              <Text>Hello World!</Text>
              <TouchableOpacity onPress={() => { this.setVisible(!this.state.visible) }}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          }
          />
      </Modal>
    )
  }
}

const Styles = {
  wrap: {
    marginTop: Metrics.doubleBaseMargin
  },
  episodeHeader: {
    ...ApplicationStyles.headerBox
  },
  subLabel: {
    marginVertical: Metrics.smallMargin,
    fontSize: Fonts.size.small
  },
  boldLabel: {
    fontWeight: 'bold',
    marginVertical: Metrics.smallMargin
  },
  modal: {
    paddingTop: Metrics.doubleBaseMargin
  }
}

export default RecordCreateModal
