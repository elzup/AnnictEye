// @flow

import React from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
// import { Actions as NavigationActions } from 'react-native-router-flux'
import { Metrics, ApplicationStyles } from '../Themes/'

import { CLIENT_ID } from 'react-native-dotenv'
import simpleAuthClient from 'react-native-simple-auth'

simpleAuthClient.configure('annict', {
  client_id: CLIENT_ID,
  response_type: 'code'
}).then(() => {
  console.log('simpleAuthClient setuped.')
})

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
    simpleAuthClient.authorize('annict').then((info) => {
      console.log(info)
    })
  }

  render () {
    return (
      <View style={Styles.mainContainer}>
        <ScrollView style={Styles.container}>
          <View style={Styles.section} >
            <Text style={Styles.sectionText} >
              Top Page.
            </Text>
          </View>

          <View style={Styles.centered}>
            <Text style={Styles.subtitle}>Made with ❤️ by Infinite Red</Text>
          </View>

        </ScrollView>
      </View>
    )
  }
}
