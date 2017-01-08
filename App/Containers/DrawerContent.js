// @flow

import React, {Component} from 'react'
import {ScrollView, Image, BackAndroid} from 'react-native'
import {Images} from '../Themes'
import DrawerButton from '../Components/DrawerButton'
// import {Actions as NavigationActions} from 'react-native-router-flux'

class DrawerContent extends Component {

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  handlePressPageA = () => {
    this.toggleDrawer()
    window.alert('PageA Open.')
    // NavigationActions.componentExamples()
  }

  render () {
    return (
      <ScrollView style={Styles.container}>
        <Image source={Images.logo} style={Styles.logo} />
        <DrawerButton text='Page A' onPress={this.handlePressPageA} />
      </ScrollView>
    )
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

const Styles = {
  container: {
    flex: 1,
    padding: 20
  },
  logo: {
    alignSelf: 'center'
  }
}

export default DrawerContent
