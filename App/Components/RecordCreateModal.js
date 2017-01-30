// @flow

import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal
} from 'react-native'
import { MKIconToggle, Slider } from 'react-native-material-kit'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import { Episode } from '../Services/Type'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../Themes/'
import NavigatorDummy from '../Components/NavigatorDummy'
import DrawerButton from '../Components/DrawerButton'

type RecordModalProps = {
  episode: Episode
}

class RecordCreateModal extends Component {
  props: RecordModalProps

  constructor (props) {
    super(props)
    this.state = {
      sliderThumb: null,
      visible: false,

      // request parameters
      comment: '',
      rating: 0,
      shareTwitter: false,
      shareFacebook: false
    }
  }

  setVisible (visible) {
    this.setState({ visible: visible })
  }

  render () {
    // const { episode } = this.props
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
          <TextInput
            ref='code'
            multiline
            style={Styles.commentForm}
            keyboardType='default'
            returnKeyType='next'
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            onSubmitEditing={this.handlerSubmit}
            onChangeText={this.handlerChangeText}
            placeholder='コメント' />
          <DrawerButton text='記録' onPress={this.handlerSubmit} />
          <View style={{flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#ddd'}}>
            <MKIconToggle
              checked={this.state.share_twitter}
              onCheckedChange={() => { this.setState({ share_twitter: !this.state.share_twitter }) }}
              >
              <FAIcon state_checked style={{fontSize: 22, color: '#00aced'}} name='twitter' />
              <FAIcon style={{fontSize: 22, color: '#ccc'}} name='twitter' />
            </MKIconToggle>
            <MKIconToggle

              checked={this.state.share_facebook}
              onCheckedChange={() => { this.setState({ share_facebook: !this.state.share_facebook }) }}
              >
              <FAIcon state_checked style={{fontSize: 22, color: '#305097'}} name='facebook-official' />
              <FAIcon style={{fontSize: 22, color: '#ccc'}} name='facebook-official' />
            </MKIconToggle>

            <View style={{justifyContent: 'center'}}>
              <Text style={{width: 22, color: '#666'}}>{this.state.rating}</Text>
            </View>

            <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 8}}>
              <Slider
                styles={Styles.slider}
                thumbRadius={6}
                min={0}
                max={5}
                step={0.1}
                onChange={value => {
                  const color = (value > 0.9) ? '#ff9800' : '#ccc'
                  FAIcon.getImageSource('star', 22, color)
                  .then(source => {
                    this.setState({ sliderThumb: source, rating: value })
                  })
                  .done()
                }}
                />
            </View>
          </View>
          <TouchableOpacity onPress={() => { this.setVisible(!this.state.visible) }}>
            <Text>キャンセル</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  handlerChangeText = (text) => {
    this.setState({ text: text })
  }

  handlerSubmit = () => {
    console.log('submit')
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
  commentForm: {
    flex: 1,
    height: 100,
    fontSize: Fonts.size.h6,
    paddingHorizontal: 15
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
  },
  slider: {
  }
}

export default RecordCreateModal
