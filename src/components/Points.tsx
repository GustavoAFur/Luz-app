import { View, Text, Pressable } from "react-native";

import IconGlobo from '../../assets/svg/globo.svg'
import IconArrowRight from '../../assets/svg/arrow-right.svg'
export function Points() {
  return(
    <View style={{
      marginTop: 24,
      paddingHorizontal: 30,
    }}>
      <View style={{
        width: '100%',
        height: 234,
        position: 'absolute',
        zIndex: 1,
        left: 30,
        right: 30,
        padding: 16
      }}>
        <View style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <View style={{
            alignItems: 'flex-start'
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'flex-end'
            }}>
              <Text style={{
                fontSize: 24,
                lineHeight: 24,
                fontFamily: 'GeneralSans-Semibold',
                color: '#FFFFFF',
              }}>
                points
              </Text>

              <Text style={{
                fontSize: 12,
                marginLeft: 5,
                lineHeight: 24,
                fontFamily: 'GeneralSans-Regular',
                color: '#FFFFFF',
              }}>
                Pts
              </Text>
            </View>

            <Text style={{
              fontSize: 12,
              lineHeight: 24,
              opacity: 0.8,
              fontFamily: 'GeneralSans-Regular',
              color: '#FFFFFF',
            }}>
              Pontos acomulados
            </Text>
          </View>

          <Pressable
            onPress={() => {
            }}
            style={{
              borderRadius: 50,
              height: 36,
              backgroundColor: '#FDE933',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Text style={{
              fontSize: 12,
              lineHeight: 18,
              marginHorizontal: 16,
              fontFamily: 'GeneralSans-Semibold',
              color: '#0F1121',
            }}>
              Ver pontos
            </Text>
          </Pressable>
        </View>

        <View style={{
          width: '100%',
          height: 1,
          backgroundColor: '#6881FF',
          marginVertical: 16
        }} />

        <View style={{
          height: 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>

            <View style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: '#6881FF',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
                <IconGlobo width={20} height={20} />

            </View>

            <View style={{
              marginLeft: 12,
            }}>
              <Text style={{
                fontSize: 14,
                lineHeight: 18,
                fontFamily: 'GeneralSans-Medium',
                color: '#FFFFFF',
              }}>
                Direitos do consumidor
              </Text>

              <Text style={{
                fontSize: 10,
                lineHeight: 14,
                fontFamily: 'GeneralSans-Regular',
                color: '#FFFFFF',
              }}>
                E como proseguir com acompanhamento.
              </Text>
            </View>
          </View>

          <Text style={{
            fontSize: 14,
            lineHeight: 18,
            fontFamily: 'GeneralSans-Semibold',
            color: '#FFFFFF',
          }}>
            20 min
          </Text>
        </View>


        <View style={{
          width: '100%',
          height: 6,
          borderRadius: 10,
          backgroundColor: '#6881FF',
          marginVertical: 16
        }}>
          <View
            style={{
              width: '65%',
              height: '100%',
              borderRadius: 10,
              backgroundColor: '#FDE933',
            }}
          />
        </View>

        <View style={{
          width: '100%',
          height: 42,
          borderRadius: 8,
          flexDirection: 'row',
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#6881FF'
        }}>
          <Text style={{
            fontSize: 12,
            lineHeight: 20,
            fontFamily: 'GeneralSans-Medium',
            color: '#FFFFFF',
          }}>
            Continuar de onde parou
          </Text>
          <IconArrowRight width={24} height={24} />
        </View>
      </View>

      <View style={{
        width: '100%',
        height: 234,
        borderRadius: 14,
        overflow: 'hidden',
        backgroundColor: '#4A68FF',
      }}>
      </View>

    </View>
  )
}