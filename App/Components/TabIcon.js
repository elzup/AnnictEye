// @flow

import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
	tabText: {
		color: 'white'
	},
	tabTextActive: {
		color: 'gray'
	}
});

const TabIcon = (props: any) => (
	<Text
		style={
      props.selected ?
      styles.tebTextActive :
      styles.tabText
    }
		>
		{props.title}
	</Text>
  );

export default TabIcon;
