import { View, Image, Text } from "react-native";

export function Complaint() {
  return(
    <View style={{
      width: 300,
      height: 130,
      borderRadius: 12,
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#F3F3FA',
      marginLeft: 30,
      padding: 16,
      justifyContent: 'space-between'
    }}>
      <View style={{
        width: '100%',
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Image
          resizeMode='contain'
          style={{
            width: 48,
            height: 32,
          }}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Enel_Group_logo.svg/2560px-Enel_Group_logo.svg.png',
          }}
        />

        <View style={{
          height: 32,
          borderRadius: 30,
          backgroundColor: 'rgba(255, 205, 76, 0.1)',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{
            fontSize: 12,
            lineHeight: 12,
            fontFamily: 'GeneralSans-Medium',
            color: 'rgba(240, 175, 7, 1)',
            marginHorizontal: 14
          }}>
            Em processamento
          </Text>
        </View>
      </View>

      <Text style={{
        fontSize: 12,
        lineHeight: 14,
        fontFamily: 'GeneralSans-Medium',
        color: '#0F1121',
      }}>


        <Text style={{
          fontSize: 12,
          lineHeight: 14,
          fontFamily: 'GeneralSans-Semibold',
          color: '#0F1121',
        }}>
          Nota:
        </Text> Minha energia ainda não voltou...
      </Text>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 14,
            lineHeight: 14,
            fontFamily: 'GeneralSans-Semibold',
            color: '#0F1121',
          }}>
            4h
          </Text>

          <Text style={{
            fontSize: 12,
            lineHeight: 11,
            fontFamily: 'GeneralSans-Medium',
            color: '#67697A',
            marginLeft: 2
          }}>
            /p resposta
          </Text>


        </View>

        <Text style={{
          fontSize: 14,
          lineHeight: 14,
          fontFamily: 'GeneralSans-Semibold',
          color: '#0F1121',
        }}>
          Falta de energia
        </Text>
      </View>
    </View>
  )
}