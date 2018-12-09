import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, AsyncStorage, Alert } from 'react-native'
import * as Yup from 'yup'

import Form from '../components/Form'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('please! email?')
    .email("well that's not an email"),
  password: Yup.string()
    .required()
    .min(6, 'pretty sure this will be hacked')
});

export default class Login extends PureComponent {
  handleSubmit = value => {
    this._checkUser(value)
  }

  _checkUser = async (user) => {
    try {
      const value = await AsyncStorage.getItem(user.email)
      if (value !== null) {
        if (user.password === value.password) {
          this.login(value)
        } else {
          Alert.alert("Email and password didn't match")
        }
      }
      Alert.alert("Email doesn't exist")
    } catch (error) {
      console.log(error)
    }
  }

  _login = async ({ password, name, email }) => {
    try {
      await AsyncStorage.multiSet([
        [email, JSON.stringify({ name, password })], ['currentUser', email]
      ]);
      this.props.navigation.navigate('App')
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>
          Login to Unicorn
        </Text>
        <Form
          _handleSubmit={this.handleSubmit}
          inputs={['email', 'password']}
          buttonName={'Login'}
          validationSchema={validationSchema}
          initialValues={{
            email: '',
            password: ''
          }}
        />
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
