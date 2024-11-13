import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Home} from '../screens/Home';
import {Complaints} from '../screens/Complaints';
import {Image} from 'react-native';
import {CreateComplaint} from '../screens/CreateComplaint';
import {ChoosePlace} from '../screens/ChoosePlace';

export function Navigation() {
  function MyTab() {
    const Tab = createBottomTabNavigator();

    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Inicio"
          component={Home}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image
                  source={require('../../assets/img/home-focused.png')}
                  style={{width: 24, height: 24}}
                />
              ) : (
                <Image
                  source={require('../../assets/img/home.png')}
                  style={{width: 24, height: 24}}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Denuncias"
          component={Complaints}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image
                  source={require('../../assets/img/request-focused.png')}
                  style={{width: 24, height: 24}}
                />
              ) : (
                <Image
                  source={require('../../assets/img/request.png')}
                  style={{width: 24, height: 24}}
                />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="myTabs"
        component={MyTab}
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
    </Stack.Navigator>
  );
}
