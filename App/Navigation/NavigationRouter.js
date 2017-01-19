// @flow

import React, {Component} from 'react'
import {Scene, Router} from 'react-native-router-flux'
import NavigationDrawer from './NavigationDrawer'
import {Colors} from '../Themes'

// screens identified by the router
import LoginScreen from '../Containers/LoginScreen'
import ListviewExample from '../Containers/ListviewExample'

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene initial key='loginScreen' component={LoginScreen} title='ログイン' />
            <Scene key='listviewExample' component={ListviewExample} title='Home' />
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
