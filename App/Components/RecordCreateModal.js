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
    modalVisible: true
  }

  setModalVisible (visible) {
    this.setState({ modalVisible: visible })
  }

  render () {
    return (
      <View style={Styles.wrap}>
        <Modal
          animationType={'slide'}
          transparent={false}
          style={Styles.modal}
          visible={this.state.modalVisible}
          onRequestClose={() => { console.log('Modal has been closed.') }}
          >
          <View>
            <Text>Hello World!</Text>
            <TouchableOpacity onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
              <Text>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
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
