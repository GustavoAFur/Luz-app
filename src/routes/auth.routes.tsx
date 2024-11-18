import React from 'react'
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'

import { SignUp } from '../screens/SignUp'
import { SignIn } from '../screens/SignIn'
import { Onboard } from '../screens/Onboard'
import { AccountRecover } from '../screens/AccountRecover'

type Nav = {
  navigate: (value: string) => void;
}

export function AuthRoutes() {

  const { Navigator, Screen } = createStackNavigator()

  return (
    <Navigator
      initialRouteName={'Onboard'}
      screenOptions={{
        headerShown: false,
      }}>
        
      <Screen
        name="Onboard"
        component={Onboard}
      />

      <Screen
        name="SignIn"
        component={SignIn}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Screen
        name="AccountRecover"
        component={AccountRecover}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Screen
        name="SignUp"
        component={SignUp}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

    </Navigator>
  )
}