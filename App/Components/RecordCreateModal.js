// @flow

import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal
} from 'react-native'
import { Episode } from '../Services/Type'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../Themes/'
import NavigatorDummy from '../Components/NavigatorDummy'

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
        <NavigatorDummy text={'記録する'} />
        <View style={Styles.container}>
          <View style={Styles.episodeHeader}>
            <Text style={Styles.subLabel}>{episode.work.title} {episode.number_text}</Text>
            <Text style={Styles.boldLabel}>{episode.title}</Text>
            <Text style={Styles.boldLabel}>Test</Text>
          </View>

          <Text>Hello World!</Text>
          <TouchableOpacity onPress={() => { this.setVisible(!this.state.visible) }}>
            <Text>Hide Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}

const Styles = {
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.silver
  },
  wrap: {
    marginTop: Metrics.doubleBaseMargin
  },
  navigationDummy: {
    backgroundColor: Colors.pink
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
