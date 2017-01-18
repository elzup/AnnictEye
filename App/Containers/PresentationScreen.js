// @flow

import React from 'react'
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Linking,
  TextInput } from 'react-native'
import LoginActions from '../Redux/LoginRedux'
import { connect } from 'react-redux'

// import { Actions as NavigationActions } from 'react-native-router-flux'
import { Metrics, Colors, ApplicationStyles } from '../Themes/'
import DrawerButton from '../Components/DrawerButton'

import { CLIENT_ID } from 'react-native-dotenv'

const Styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    color: Colors.coal
  }
})

type PresentationScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptLogin: () => void
}

class PresentationScreen extends React.Component {

  props: PresentationScreenProps

  isAttempting: boolean

  state: {
    code: string
  }

  constructor () {
    super()
    this.state = {
      code: ''
    }
    this.isAttempting = false
  }

  componentDidMount () {
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    if (this.isAttempting && !newProps.fetching) {
      console.log('login')
      console.log(newProps)
      // NavigationActions.pop()
    }
  }

  handlerPressOauth = () => {
    Linking.openURL([
      'https://api.annict.com/oauth/authorize',
      '?response_type=code',
      '&client_id=' + CLIENT_ID,
      '&redirect_uri=urn:ietf:wg:oauth:2.0:oob',
      '&scope=read'
    ].join(''))
  }

  handleChangeCode = (text) => {
    this.setState({ code: text })
  }

  handlerSubmitCode = () => {
    const { code } = this.state
    this.isAttempting = true
    console.log(code)
  }

  render () {
    const { code } = this.state
    return (
      <View style={Styles.mainContainer}>
        <ScrollView style={Styles.container}>
          <View style={Styles.section} >
            <Text>
              認証画面から Annict にログインし、認証コードをコピーしてください。
            </Text>
            <DrawerButton text='認証画面を開く' onPress={this.handlerPressOauth} />
          </View>
          <View style={Styles.section} >
            <TextInput
              ref='code'
              value={code}
              style={Styles.textInput}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.handleChangeCode}
              underlineColorAndroid='transparent'
              onSubmitEditing={this.handlerSubmitCode}
              placeholder='認証コード' />
            <DrawerButton text='ログイン' onPress={this.handlerSubmitCode} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (code) => dispatch(LoginActions.loginRequest(code))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)
