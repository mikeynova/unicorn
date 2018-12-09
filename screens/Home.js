import React, { PureComponent } from 'react'
import { View, Text, Button, AsyncStorage, TouchableHighlight, Dimensions, Alert, SafeAreaView } from 'react-native'
import SoundPlayer from 'react-native-sound-player'
import { Icon } from 'native-base'
import Ticker from '../components/Ticker'

const { width } = Dimensions.get('screen')

export default class Home extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      currentUser: {},
      playing: null,
      icons: 'play'
    }
  }
  async componentDidMount() {
    const currentUser = await AsyncStorage.getItem('currentUser')
    this.setState({ currentUser: JSON.parse(currentUser) })
    SoundPlayer.onFinishedPlaying((success: boolean) => {
      this.setState({
        playing: null,
        icons: 'play'
      })
    })
  }

  handleStop = () => {
    this.setState({
      playing: null,
      icons: 'play'
    }, () => {
      SoundPlayer.stop()
    })
  }

  handlePlay = () => {
    if (this.state.playing === null) {
      this.setState({
        playing: true,
        icons: 'pause'
      }, () => {
        SoundPlayer.playUrl('https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3')
      })
    }
    if (this.state.playing) {
      this.setState({
        playing: false,
        icons: 'play'
      }, () => {
        SoundPlayer.pause()
      })
    } else if (this.state.playing === false) {
      this.setState({
        playing: true,
        icons: 'pause'
      }, () => {
        SoundPlayer.resume()
      })
    }
  }
  render () {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{`Welcome ${this.state.currentUser.name} to 🦄​ paradise!`}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width, backgroundColor: '#f1f1f1' }}>
          <TouchableHighlight onPress={() => this.handlePlay()}>
            <Icon type="FontAwesome" name={this.state.icons} />
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.handleStop()}>
            <Icon type="FontAwesome" name="stop"/>
          </TouchableHighlight>
        </View>
        <Ticker
          playing={this.state.playing}
        />
        <Button
          onPress={() => this._signOut()}
          title={'Sign Out'}
        />
      </SafeAreaView>
    )
  }

  _signOut = async () => {
    Alert.alert('You got logged out!')
    await AsyncStorage.removeItem('currentUser')
    this.props.navigation.navigate('Auth')
  }
}
