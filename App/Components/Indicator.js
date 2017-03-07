import React from 'react';
import {View} from 'react-native';
import Spinner from 'react-native-spinkit';

import {Colors} from '../Themes/';

const Styles = {
	indicator: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 8
	}
};

function Indicator({loading}) {
	if (!loading) {
		return null;
	}
	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
			<Spinner size={100} type="WanderingCubes" color={Colors.green}/>
		</View>
	);
}

Indicator.propTypes = {
	loading: React.PropTypes.bool
};

Indicator.defaultProps = {
	loading: true
};

export default Indicator;
