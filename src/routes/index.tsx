import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./app.routes";

export function Routes(){
  return(
    <NavigationContainer>
      <Navigation/>
    </NavigationContainer>
  )
}