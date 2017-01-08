// @flow

import React from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
// import { Actions as NavigationActions } from 'react-native-router-flux'
import { Metrics, ApplicationStyles } from '../Themes/'

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
