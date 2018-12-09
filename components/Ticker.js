import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, View, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export default class Ticker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPosition: 0,
      items: ['🦄', '🦄', '🦄']
    }
    this.scrolling = this.scrolling.bind(this)
  }

  componentDidMount(){
    this.activeInterval = setInterval(this.scrolling, 100)
  }
  componentWillUnmount(){
    clearInterval(this.activeInterval);
  }

  scrolling = () => {
    if (this.props.playing) {
      position = this.state.currentPosition + 5
      this.ticker.scrollTo({ x: position, animated: true });
      let maxOffset = 680
      if (this.state.currentPosition > maxOffset) {
        this.ticker.scrollTo({ x: - width / 2, animated: false })
        this.setState({ currentPosition: - width / 2 })
      }
      else {
        this.setState({ currentPosition: position });
      }
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollview}
          horizontal={true}
          ref={(ref) => this.ticker = ref}
          bounces={true}
        >
          {this.state.items.map((item, index) => (
            <View key={index}>
              <View style={styles.hr} />
                <Text style={styles.text}>
                  {item}
                </Text>
              <View style={styles.hr} />
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingTop: 5,
    paddingRight: width / 3,
    color: 'yellow',
    fontSize: 20,
    fontWeight: 'bold'
  },
  scrollview: {
    paddingLeft: width / 2,
    backgroundColor: 'black',

  },
  view: {
    paddingTop: height / 2 - 75
  },
  hr: {
    borderBottomColor: 'yellow',
    borderBottomWidth: 2
  }
})
