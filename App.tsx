import 'react-native-gesture-handler'

import { Routes } from "./src/routes"
import { AuthProvider } from "./src/hooks/auth"
import { LocationProvider } from './src/contexts/locationContext'

export default function App() {
  return (
    <LocationProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </LocationProvider>
  )
}