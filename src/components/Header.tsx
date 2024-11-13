import { Pressable, Text, View } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import IconCount from '../../assets/svg/count.svg'
import IconNotification from '../../assets/svg/notification.svg'
export function Header() {

  const horaAtual = new Date().getHours()
  let saudacaoApp

  if (horaAtual >= 5 && horaAtual < 12) {
    saudacaoApp = 'Bom dia,'
  } else if (horaAtual >= 12 && horaAtual < 18) {
    saudacaoApp = 'Boa tarde,'
  } else {
    saudacaoApp = 'Boa noite,'
  }

  return (
    <View
      style={{
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            borderWidth: 2,
            borderColor: '#FDE933',
            backgroundColor: '#4A68FF',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <IconCount width={34} height={34} />
        </View>

        <View
          style={{
            marginLeft: 12,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: 'GeneralSans-Medium',
              color: '#67697A',
            }}>
            {saudacaoApp}
          </Text>

          <Text
            style={{
              fontSize: 15,
              fontFamily: 'GeneralSans-Semibold',
              color: '#0F1121',
            }}>
            Bem vindo(a)
          </Text>
        </View>
      </View>

      <Pressable
        style={{
          width: 42,
          height: 42,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={()=>{}}>
          <IconNotification />
      </Pressable>
    </View>
  );
}
