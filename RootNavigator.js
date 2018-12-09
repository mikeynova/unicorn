import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'

import AuthLoadingScreen from './screens/AuthLoadingScreen'
import Home from './screens/Home'
import Register from './screens/Register'
import Login from './screens/Login'

const AppStack = createStackNavigator({ Home })
const AuthStack = createStackNavigator({
  Register,
  Login
}, {
  initialRouteName: 'Register'
})

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
))
