// @flow

import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal
} from 'react-native'
import { Metrics } from '../Themes'
import { Episode } from '../Services/Type'

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
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        style={Styles.modal}
        visible={this.state.visible}
        onRequestClose={() => { console.log('Modal has been closed.') }}
        >
        <View>
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
  wrap: {
    marginTop: Metrics.doubleBaseMargin
  },
  modal: {
    paddingTop: Metrics.doubleBaseMargin
  }
}

export default RecordCreateModal
