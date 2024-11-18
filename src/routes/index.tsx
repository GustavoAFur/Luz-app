import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { useAuth } from '../hooks/auth'

import { SplashScreen } from '../screens/SplashScreen'
import { CompleteRegistration } from '../screens/CompleteRegistration'
import { Navigation } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Routes() {
  
  const { userRegistration, loading, user } = useAuth()

  return (
  
    <NavigationContainer>

     {
       
       loading ? <SplashScreen /> : user ? ( Object.keys((userRegistration as object) || undefined).length == 0 ? <CompleteRegistration /> : <Navigation /> ) : <AuthRoutes />
        
      }

    </NavigationContainer>
  )
}