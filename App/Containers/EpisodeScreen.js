/* @flow */

import React from 'react';
import {
  View,
  ListView,
  StyleSheet,
  ScrollView,
  Linking
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import {Button, Text} from 'native-base';

import Indicator from '../Components/Indicator';
import RecordCell from '../Components/RecordCell';
import {Record, Episode} from '../Services/Type';

import {ApplicationStyles, Metrics, Colors, Fonts} from '../Themes/';

import {store} from '../Models/RealmManager';
import {client} from '../Services/AnnictApi';

const Styles = StyleSheet.create({
	...ApplicationStyles.screen,
	container: {
		flex: 1,
		marginTop: Metrics.navBarHeight,
		backgroundColor: Colors.silver
	},
	episodeHeader: {
		...ApplicationStyles.headerBox
	},
	infos: {
		flex: 1
	},
	subLabel: {
		marginVertical: Metrics.smallMargin,
		fontSize: Fonts.size.small
	},
	boldLabel: {
		fontWeight: 'bold',
		marginVertical: Metrics.smallMargin
	},
	label: {
		marginBottom: Metrics.smallMargin
	},
	listContent: {
		marginTop: Metrics.baseMargin
	}
});

type Props = {
	episode: Episode
}

type State = {
	loading: boolean,
	dataSourceRecords: Object
}
const notSomeID = (r1: Record, r2: Record) => r1.id !== r2.id;
class EpisodeScreen extends React.Component {
	props: Props
	state: State = {
		loading: true,
		dataSourceRecords: new ListView.DataSource({notSomeID}).cloneWithRows([])
	}

	componentWillMount() {
		if (!store.isLogin()) {
			Actions.loginScreen();
		}
	}

	componentDidMount = () => {
		this.init();
	}

	async init() {
		try {
			await this.loadRecords();
		} catch (e) {
			if (e.message == 'no-auth') {
				store.deleteSession();
				Actions.loginScreen();
			}
		}
	}
	async loadRecords() {
		const records = client.getRecords(this.props.episode.id);
		this.setState({
			loading: false,
			dataSourceRecords: this.state.dataSourceRecords.cloneWithRows(records)
		});
	}

	noRowData = () => {
		return this.state.dataSourceRecords.getRowCount() === 0;
	}

	render() {
		const {episode} = this.props;
		return (
			<ScrollView
				automaticallyAdjustContentInsets={false}
				>
				<View style={Styles.container}>
					<View style={Styles.episodeHeader}>
						<Text style={Styles.subLabel}>{this.props.episode.work.title}</Text>
						<Text style={Styles.boldLabel}>{episode.numberText} {episode.title || '---'}</Text>
					</View>
					<Button onPress={this.handleOpenModal}>
						<Text>記録する</Text>
					</Button>
					<ListView
						contentContainerStyle={Styles.listContent}
						dataSource={this.state.dataSourceRecords}
						renderRow={this.renderRow}
						renderFooter={this.renderFooter}
						pageSize={50}
						enableEmptySections
						/>
				</View>
			</ScrollView>
		);
	}

	renderFooter = () => (
		<Indicator loading={this.state.loading}/>
  )

	handleOpenModal = () => {
		const {episode} = this.props;
		Actions.recordCreateModal({title: `記録する ${episode.numberText}`});
	}

	renderRow = (record: Record) => (
		<RecordCell
			record={record}
			onPressLike={() => {
				this.handlePressLike(record);
			}}
			onPressReply={() => {
				this.handlePressReply(record);
			}}
			onPressGlobe={() => {
				this.handlePressGlobe(this.props.episode, record);
			}}
			/>
  )

	handlePressLike = (record: Record) => {
		console.log(`like action: ${record.id}`);
	}

	handlePressReply = (record: Record) => {
		console.log(`reply action: ${record.id}`);
	}

	handlePressGlobe = (episode: Episode, record: Record) => {
		console.log(`open action: ${record.id}`);
    // HACK: move to model
		Linking.openURL(`https://annict.com/works/${episode.work.id}/episodes/${episode.id}/checkins/${record.id}`);
	}
}

export default EpisodeScreen;
