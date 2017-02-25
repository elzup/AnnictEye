/* @flow */
'use strict';

import React, {Component} from 'react';
import RootContainer from './RootContainer';
import applyConfigSettings from '../Config';

applyConfigSettings();

class App extends Component {
	render() {
		return (
			<RootContainer/>
		);
	}
}

export default App;
