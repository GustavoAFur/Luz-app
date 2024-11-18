import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import LottieView from 'lottie-react-native'
import { OrientationLocker, PORTRAIT } from 'react-native-orientation-locker'

export function SplashScreen() {

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffff'
    }}>

      <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />

      <OrientationLocker
        orientation={PORTRAIT}
      />

      <LottieView
        source={require('../../assets/json/loading.json')}
        autoPlay
        loop={true}
        speed={1}
        style={{
          width: 90,
          height: 90,
        }}
      />
    </View>
  )
}