import { View, Text, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { CreateComplaintButton } from "../components/CreateComplaintButton";

export function Complaints({navigation}: {navigation: any}) {
  return (
    <ScrollView 
      keyboardShouldPersistTaps="always" 
      showsVerticalScrollIndicator={false} 
      style={{
        backgroundColor: '#ffff',
      }}
    >
      <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />

      <View style={{
        marginTop: getStatusBarHeight() + 24,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>

        <Text style={{
          fontSize: 24,
          fontFamily: 'GeneralSans-Semibold',
          color: '#0F1121',
        }}>
          Denuncias
        </Text>
        <CreateComplaintButton 
          navTo={() => {
            navigation.navigate('CreateComplaint')
          }}
        />
      </View>
    </ScrollView>
  );
}