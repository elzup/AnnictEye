// @flow

import React, {Component} from 'react'
import {Scene, Router} from 'react-native-router-flux'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import {Colors} from '../Themes'

// screens identified by the router
import PresentationScreen from '../Containers/PresentationScreen'
import ListviewExample from '../Containers/ListviewExample'

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene initial key='presentationScreen' component={PresentationScreen} title='Ignite' renderLeftButton={NavItems.hamburgerButton} />
            <Scene key='listviewExample' component={ListviewExample} title='Listview Example' />
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
    backgroundColor: Colors.background
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
