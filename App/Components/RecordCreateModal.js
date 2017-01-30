// @flow

import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  Slider,
  TouchableOpacity,
  Modal
} from 'react-native'
import { MKIconToggle } from 'react-native-material-kit'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import { Episode } from '../Services/Type'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../Themes/'
import NavigatorDummy from '../Components/NavigatorDummy'
import KeyboardSpacer from 'react-native-keyboard-spacer'

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

          <View style={Styles.footer}>
            <View style={Styles.footerSlider}>
              <View style={Styles.rating}>
                <Text>{this.state.rating}</Text>
              </View>
              <Slider
                style={Styles.slider}
                thumbImage={this.state.sliderThumb}
                minimumValue={0}
                maximumValue={5}
                step={0.1}
                onValueChange={value => {
                  const color = (value > 0.9) ? '#ff9800' : '#ccc'
                  FAIcon.getImageSource('star', 22, color)
                  .then(source => {
                    this.setState({ sliderThumb: source, rating: value })
                  })
                  .done()
                }}
                />
            </View>

            <View style={Styles.footerBottom}>
              <MKIconToggle
                style={Styles.toggle}
                checked={this.state.share_twitter}
                onCheckedChange={() => { this.setState({ share_twitter: !this.state.share_twitter }) }}
                >
                <FAIcon state_checked style={Styles.twitterOn} name='twitter' />
                <FAIcon style={Styles.twitterOff} name='twitter' />
              </MKIconToggle>

              <MKIconToggle
                style={Styles.toggle}
                checked={this.state.share_facebook}
                onCheckedChange={() => { this.setState({ share_facebook: !this.state.share_facebook }) }}
                >
                <FAIcon state_checked style={Styles.twitterOn} name='facebook-official' />
                <FAIcon style={Styles.twitterOff} name='facebook-official' />
              </MKIconToggle>
              <TouchableOpacity style={Styles.submitButton} onPress={this.props.handlerSubmit}>
                <Text style={Styles.buttonInner}>記録</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <KeyboardSpacer />
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

const iconStyles = {
  icon: {
    fontSize: Fonts.size.h4
  },
  iconOff: {
    color: Colors.disable
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

  footer: {
    height: Metrics.footerHeight,
    flexDirection: 'column',
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  footerSlider: {
    ...Metrics.footerRow,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    paddingHorizontal: Metrics.baseMargin
  },
  rating: {
    flex: 1,
    height: Metrics.footerRowHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ratingText: {
    color: '#666',
    justifyContent: 'center'
  },
  slider: {
    flex: 6,
    height: Metrics.footerRowHeight,
    justifyContent: 'center'
  },
  footerBottom: {
    paddingVertical: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  submitButton: {
    height: Metrics.footerRowHeight,
    flex: 3,
    justifyContent: 'center'
  },
  toggle: {
    height: Metrics.footerRowHeight,
    flex: 1,
    borderWidth: 0
  },
  ...iconStyles,
  twitterOn: {
    ...iconStyles.icon,
    color: Colors.twitter
  },
  twitterOff: {
    ...iconStyles.icon,
    ...iconStyles.iconOff
  },
  facebookOn: {
    ...iconStyles.icon,
    color: Colors.facebook
  },
  facebookOff: {
    ...iconStyles.icon,
    ...iconStyles.iconOff
  }
}

export default RecordCreateModal
