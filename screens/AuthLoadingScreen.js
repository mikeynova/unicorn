import React, { PureComponent } from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'

export default class AuthLoadingScreen extends PureComponent {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    const currentUser = await AsyncStorage.getItem('currentUser')
    this.props.navigation.navigate(currentUser ? 'App' : 'Auth')
  }

  render() {
    return (
      <View style={styles.contianer}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
