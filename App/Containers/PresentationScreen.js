// @flow

import React from 'react'
import { ScrollView, Text, View, StyleSheet, Linking } from 'react-native'
// import { Actions as NavigationActions } from 'react-native-router-flux'
import { Metrics, ApplicationStyles } from '../Themes/'
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
  }
})

export default class PresentationScreen extends React.Component {
  componentDidMount () {
  }

  handlerPressOauth () {
    Linking.openURL([
      'https://api.annict.com/oauth/authorize',
      '?response_type=code',
      '&client_id=' + CLIENT_ID,
      '&redirect_uri=urn:ietf:wg:oauth:2.0:oob',
      '&scope=read'
    ].join(''))
  }

  render () {
    return (
      <View style={Styles.mainContainer}>
        <ScrollView style={Styles.container}>
          <View style={Styles.section} >
            <Text style={Styles.sectionText} >
              認証画面から Annict にログインし、認証コードをコピーしてください。
            </Text>
            <DrawerButton text='認証画面を開く' onPress={this.handlerPressOauth} />
          </View>
        </ScrollView>
      </View>
    )
  }
}
