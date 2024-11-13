import { View, Text, Image } from "react-native";
import ImageWoman from '../../assets/img/happy_woman.png'
import BaseBackground from '../../assets/svg/base.svg'

export function Banner() {
  return (
    <View style={{
      marginTop: 32,
      paddingHorizontal: 30
    }}>

      <View style={{
        width: '100%',
        height: 122,
        position: 'absolute',
        zIndex: 1,
        left: 30,
        right: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
      }}>

        <View style={{
          width: '50%',
          marginLeft: 30
        }}>
          <Text style={{
            fontSize: 16,
            fontFamily: 'GeneralSans-Semibold',
            color: '#FFFFFF',
          }}>
            Seus direitos na palma da sua mão.
          </Text>

          <Text style={{
            fontSize: 12,
            lineHeight: 14,
            marginTop: 8,
            fontFamily: 'GeneralSans-Regular',
            color: '#FFFFFF',
          }}>
            Responda os Quizzes, e{`\n`}
            saiba mais!
          </Text>
        </View>

        

      </View>

      <Image
          source={ImageWoman}
          resizeMode='contain'
          style={{
            width: 160,
            height: 160,
            position: 'absolute',
            bottom: 0,
            right: 10,
            zIndex: 2
          }} />

      <View style={{
        width: '100%',
        height: 122,
        borderRadius: 14,
        overflow: 'hidden',
        backgroundColor: 'rgba( 74, 104, 255, 1)',
      }}>
        <BaseBackground width={'100%'} height={234} />
      </View>

    </View>
  )
}