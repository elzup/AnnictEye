/* @flow */

import React, {Component} from 'react';
import {Scene, Router} from 'react-native-router-flux';
import {Colors} from '../Themes';

// screens identified by the router
import LoginScreen from '../Containers/LoginScreen';
import HomeScreen from '../Containers/HomeScreen';
import EpisodeScreen from '../Containers/EpisodeScreen';
import RecordCreateModal from '../Containers/RecordCreateModal';
import TabIcon from '../Components/TabIcon';

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
	},
	tabBarStyle: {
		backgroundColor: Colors.pink
	}
};

class NavigationRouter extends Component {
	render() {
		return (
			<Router>
				<Scene key="drawer" open={false}>
					<Scene key="drawerChildrenWrapper" navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
						<Scene initial key="tabbar" tabs tabBarStyle={Styles.tabBarStyle}>
							<Scene
								initial key="homeScreen"
								navigationBarStyle={Styles.navBar}
								titleStyle={Styles.title}
								component={HomeScreen}
								title="Home"
								iconName="home"
								icon={TabIcon}
								/>
							<Scene
								key="profileScreen"
								navigationBarStyle={Styles.navBar}
								titleStyle={Styles.title}
								component={HomeScreen}
								title="('ω')"
								iconName="person"
								icon={TabIcon}
								/>
						</Scene>
						<Scene key="loginScreen" component={LoginScreen} title="ログイン" hideBackImage/>
						<Scene key="episodeScreen" component={EpisodeScreen} title="エピソード"/>
						<Scene key="recordCreateModal" component={RecordCreateModal} title="記録"/>
					</Scene>
				</Scene>
			</Router>
		);
	}
}

export default NavigationRouter;
