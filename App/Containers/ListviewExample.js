// @flow

import React from 'react'
import { View, Text, ListView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { ApplicationStyles, Metrics, Colors } from '../Themes/'

const Styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    backgroundColor: Colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginVertical: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.snow,
    marginBottom: Metrics.smallMargin
  },
  listContent: {
    marginTop: Metrics.baseMargin
  }
})

class ListviewExample extends React.Component {
  state: {
    dataSource: Object
  }

  constructor (props) {
    super(props)
    /* ***********************************************************
    * STEP 1
    * This is an array of objects with the properties you desire
    * Usually this should come from Redux mapStateToProps
    *************************************************************/
    const dataObjects = [
      {title: 'First Title', description: 'First Description'},
      {title: 'Second Title', description: 'Second Description'},
      {title: 'Third Title', description: 'Third Description'},
      {title: 'Fourth Title', description: 'Fourth Description'},
      {title: 'Fifth Title', description: 'Fifth Description'},
      {title: 'Sixth Title', description: 'Sixth Description'},
      {title: 'Seventh Title', description: 'Seventh Description'},
      {title: 'Eighth Title', description: 'Eighth Description'},
      {title: 'Ninth Title', description: 'Ninth Description'},
      {title: 'Tenth Title', description: 'Tenth Description'},
      {title: 'Eleventh Title', description: 'Eleventh Description'},
      {title: '12th Title', description: '12th Description'},
      {title: '13th Title', description: '13th Description'},
      {title: '14th Title', description: '14th Description'},
      {title: '15th Title', description: '15th Description'},
      {title: '16th Title', description: '16th Description'},
      {title: '17th Title', description: '17th Description'},
      {title: '18th Title', description: '18th Description'},
      {title: '19th Title', description: '19th Description'},
      {title: '20th Title', description: '20th Description'},
      {title: 'BLACKJACK!', description: 'BLACKJACK! Description'}
    ]

    /* ***********************************************************
    * STEP 2
    * Teach datasource how to detect if rows are different
    * Make this function fast!  Perhaps something like:
    *   (r1, r2) => r1.id !== r2.id}
    *************************************************************/
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(dataObjects)
    }
  }

  /* ***********************************************************
  * STEP 3
  * `renderRow` function -How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={rowData.title} description={rowData.description} />
  *************************************************************/
  renderRow (rowData) {
    return (
      <View style={Styles.row}>
        <Text style={Styles.boldLabel}>{rowData.title}</Text>
        <Text style={Styles.label}>{rowData.description}</Text>
      </View>
    )
  }

  /* ***********************************************************
  * STEP 4
  * If your datasource is driven by Redux, you'll need to
  * reset it when new data arrives.
  * DO NOT! place `cloneWithRows` inside of render, since render
  * is called very often, and should remain fast!  Just replace
  * state's datasource on newProps.
  *
  * e.g.
    componentWillReceiveProps (newProps) {
      if (newProps.someData) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newProps.someData)
        })
      }
    }
  *************************************************************/

  noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  render () {
    return (
      <View style={Styles.container}>
        <ListView
          contentContainerStyle={Styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          pageSize={15}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

export default connect(mapStateToProps)(ListviewExample)
