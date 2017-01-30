// @flow

import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal
} from 'react-native'
import { MKIconToggle } from 'react-native-material-kit'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import { Episode } from '../Services/Type'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../Themes/'
import NavigatorDummy from '../Components/NavigatorDummy'

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
          <View style={Styles.options}>
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

            <View style={{justifyContent: 'center'}}>
              <Text style={{width: 22, color: '#666'}}>{this.state.rating}</Text>
            </View>
            <TouchableOpacity onPress={this.props.onCancel}>
              <View style={{alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 16}}>
                <Text style={{color: '#f85b73'}}>記録</Text>
              </View>
            </TouchableOpacity>
          </View>
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
  slider: {
  },
  toggle: {
    height: Metrics.footerHeight,
    width: Metrics.footerHeight,
    borderWidth: 0
  },
  options: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd'
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
