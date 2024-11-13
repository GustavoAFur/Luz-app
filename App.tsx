import { NavigationContainer } from "@react-navigation/native";

import { Routes } from "./src/routes";
import 'react-native-gesture-handler'
import LocationProvider from "./src/contexts/locationContext";

export default function App(){
  return(
    <LocationProvider>
      <Routes/>
    </LocationProvider>
  )
}