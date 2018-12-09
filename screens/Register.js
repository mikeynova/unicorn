import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, AsyncStorage, Alert, Button } from 'react-native'
import * as Yup from 'yup'

import Form from '../components/Form'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('please! email?')
    .email("well that's not an email"),
  password: Yup.string()
    .required()
    .min(6, 'pretty sure this will be hacked'),
  name: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'only letters')
    .required('name required')
});

export default class Register extends PureComponent {
  handleSubmit = value => {
    this._checkUser(value)
  }

  _checkUser = async (user) => {
    try {
      const value = await AsyncStorage.getItem(user.email)
      if (value !== null) {
        return Alert.alert(`User with email: ${user.email} already exists`)
      }
      return this._storeData(user)
    } catch (error) {
      console.log(error)
    }
  }

  _storeData = async ({ password, name, email }) => {
    try {
      await AsyncStorage.multiSet([
        [email, JSON.stringify({ name, password })], ['currentUser', email]
      ]);
      this.props.navigation.navigate('App')
    } catch (error) {
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>
          Unicorn
        </Text>
        <Form
          _handleSubmit={this.handleSubmit}
          inputs={['email', 'password', 'name']}
          buttonName={'Register'}
          validationSchema={validationSchema}
          initialValues={{
            email: '',
            password: '',
            name: ''
          }}
        />
        <Button
          onPress={() => this.props.navigation.navigate('Login')}
          title="Already a member? Login here!"
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
