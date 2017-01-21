// @flow

import React, {Component} from 'react'
import {Scene, Router} from 'react-native-router-flux'
import {Colors} from '../Themes'

// screens identified by the router
import LoginScreen from '../Containers/LoginScreen'
import HomeScreen from '../Containers/HomeScreen'

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene initial key='homeScreen' component={HomeScreen} title='ホーム' />
            <Scene key='loginScreen' component={LoginScreen} title='ログイン' hideBackImage />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

const Styles = {
  container: {
    flex: 1
  },
  navBar: {
    backgroundColor: Colors.pink
  },
  title: {
    color: Colors.snow
  },
  leftButton: {
    tintColor: Colors.snow
  },
  rightButton: {
    color: Colors.snow
  }
}

export default NavigationRouter
