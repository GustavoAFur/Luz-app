import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { Home } from '../screens/Home'
import { Complaints } from '../screens/Complaints'
import { CreateComplaint } from '../screens/CreateComplaint'
import { AnonymousReport } from '../screens/AnonymousReport'
import { Manifestation } from '../screens/Manifestation'

export function Navigation() {

  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Stack.Screen
        name="CreateComplaint"
        component={CreateComplaint}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Stack.Screen
        name="AnonymousReport"
        component={AnonymousReport}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Stack.Screen
        name="Manifestation"
        component={Manifestation}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

    </Stack.Navigator>
  );
}
