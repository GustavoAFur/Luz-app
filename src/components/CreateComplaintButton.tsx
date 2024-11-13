import { Pressable, Image, Text, PressableProps } from "react-native";
import IconPlus from '../../assets/img/plus.png'

interface ComplaintButton {
  navTo: () => void
}
export function CreateComplaintButton({navTo}: ComplaintButton & PressableProps) {
  return(
    <Pressable 
        onPress={navTo}
        style={{
          height: 32,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#4A68FF',
          flexDirection: 'row',
          zIndex: 2
        }}>
          <Image
            source={IconPlus}
            resizeMode='contain'
            style={{
              width: 18,
              height: 18,
              marginLeft: 12,
              marginRight: 10,
            }} />

          <Text style={{
            fontSize: 13,
            lineHeight: 15,
            marginRight: 15,
            fontFamily: 'GeneralSans-Medium',
            color: '#FFFFFF',
          }}>
            Criar denúncia
          </Text>
        </Pressable>
  )
}

