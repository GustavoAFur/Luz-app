import { BlurView } from "@react-native-community/blur";
import { View, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { ProgressBar } from "react-native-paper";

export function ContinueToWatch() {
  return(
    <View
        style={{
          width: 250,
          height: 135,
          borderRadius: 12,
          marginLeft: 30,
          overflow: 'hidden',
        }}>
        <LinearGradient
          colors={['#00000000', '#0009']}
          style={{
            width: '100%',
            height: '100%',
            zIndex: 1,
            position: 'absolute',
            borderRadius: 12,
            overflow: 'hidden',
            padding: 16,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: 40,
              height: 25,
              overflow: 'hidden',
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                position: 'absolute',
                zIndex: 1,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 17,
                  fontFamily: 'GeneralSans-Regular',
                  color: '#fff',
                }}>
                episode
              </Text>
            </View>

            <View
              style={{
                width: 40,
                height: 30,
                overflow: 'hidden',
                borderRadius: 30,
                borderWidth: 1,
                position: 'absolute',
                zIndex: 0,
                borderColor: '#FFF2',
              }}>
              <BlurView
                blurType="light"
                blurAmount={10}
                style={{
                  width: 40,
                  height: 30,
                  opacity: 0.5,
                }}
                reducedTransparencyFallbackColor="dark"
              />
            </View>
          </View>

          

          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'GeneralSans-Medium',
                color: '#FFFFF5',
              }}>
              temp
              
            </Text>

            <ProgressBar
              progress={0.6}
              style={{
                width: 210,
                height: 3,
                alignSelf: 'center',
                backgroundColor: '#FFF3',
                marginTop: 4,
                borderRadius: 10,
              }}
              color={'#FFF'}
            />
          </View>
        </LinearGradient>

        <View
          style={{
            width: '100%',
            height: '100%',
            zIndex: 0,
            position: 'absolute',
            borderRadius: 12,
            overflow: 'hidden',
          }}>
          <Image
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 12,
            }}
            source={{
              uri: 'https://www.designi.com.br/images/preview/10068142-m.jpg',
            }}
          />
        </View>
      </View>
  )
}