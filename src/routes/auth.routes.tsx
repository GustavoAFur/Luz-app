import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";

export function AuthRoutes() {

  const stack = createNativeStackNavigator();
  return(
    <stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <stack.Screen name="SignIn" component={SignIn} />
      <stack.Screen name="SignUp" component={SignUp} />
      
    </stack.Navigator>
  )
}