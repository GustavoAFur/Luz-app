import { View, Text } from 'react-native'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'

import { COLLECTION_CITY, COLLECTION_REGISTRATION } from '../configs/database'

type AuthContextData = {
  user: object
  loading: boolean
  city: object
  setCity: React.Dispatch<React.SetStateAction<object>>
  userRegistration: object
  setUserRegistration: React.Dispatch<React.SetStateAction<object>>;
}
type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<object>({})
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState({})
  const [userRegistration, setUserRegistration] = useState<object>({})

  async function onAuthStateChanged(user: any) {
    setUser(user)

    const city = await AsyncStorage.getItem(COLLECTION_CITY)
    const registration = await AsyncStorage.getItem(COLLECTION_REGISTRATION)

    if (city && registration) {
      const userCity = JSON.parse(city)
      const userRegistration = JSON.parse(registration)

      setUserRegistration(userRegistration)
      setCity(userCity)
    }

    setLoading(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

    return subscriber
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        city,
        setCity,
        userRegistration,
        setUserRegistration
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export {
  AuthProvider,
  useAuth
}