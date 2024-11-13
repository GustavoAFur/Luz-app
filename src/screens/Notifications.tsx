import React, { useState } from 'react'
import { View, Text, ScrollView, StatusBar, Pressable } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import IconBack from '../../assets/svg/back.svg'

export function Notifications({ navigation }: { navigation: any }) {

  const [viewNotificationPage, setvVewNotificationPage] = useState('notification')

  return (
    <ScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false} style={{
      backgroundColor: '#ffff',
    }}>
      <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />

      <View style={{
        marginTop: getStatusBarHeight() + 24,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <View style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Pressable style={{
            width: 42,
            height: 42,
            alignItems: 'center',
            justifyContent: 'center',
          }}
            onPress={() => navigation.goBack()}
          >
            <IconBack />
          </Pressable>

          <Text style={{
            fontSize: 18,
            fontFamily: 'GeneralSans-Semibold',
            color: '#0F1121',
          }}>
            Notificações
          </Text>

          <View style={{
            width: 42,
            height: 42,
          }} />

        </View>


      </View>

      <View style={{
        marginTop: 24,
        paddingHorizontal: 30
      }}>
        <View style={{
          width: '100%',
          height: 52,
          borderRadius: 50,
          backgroundColor: '#F3F3FA',
          padding: 4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Pressable
            onPress={() => {

              setvVewNotificationPage('notification')
            }}
            style={{
              width: '50%',
              height: 44,
              borderRadius: 50,
              backgroundColor: viewNotificationPage == 'notification' ? '#FFFF' : '#F3F3FA',
              alignItems: 'center',
              justifyContent: 'center'
            }}>

            <Text style={{
              fontSize: 14,
              fontFamily: 'GeneralSans-Semibold',
              opacity: viewNotificationPage == 'notification' ? 1 : 0.5,
              color: '#0F1121',
            }}>
              Notificação
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {

              setvVewNotificationPage('processos')
            }}
            style={{
              width: '50%',
              height: 44,
              borderRadius: 50,
              backgroundColor: viewNotificationPage == 'processos' ? '#FFFF' : '#F3F3FA',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Text style={{
              fontSize: 14,
              opacity: viewNotificationPage == 'processos' ? 1 : 0.5,
              fontFamily: 'GeneralSans-Semibold',
              color: '#0F1121',
            }}>
              Processos
            </Text>
          </Pressable>

        </View>
      </View>

      <View style={{
        marginTop: 32,
        paddingHorizontal: 30
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Text style={{
            fontSize: 16,
            fontFamily: 'GeneralSans-Semibold',
            color: '#0F1121',
          }}>
            Recentes
          </Text>

          <Text style={{
            fontSize: 14,
            fontFamily: 'GeneralSans-Medium',
            color: '#FF3939',
          }}>
            Limpar todas
          </Text>
        </View>
      </View>
      
      <View style={{
        marginTop: 20,
      }}>

        <View style={{
          width: '100%',
          paddingVertical: 20,
          paddingHorizontal: 30,
          backgroundColor: '#FBFCFF',
          flexDirection: 'row',
          alignItems: 'flex-start',
          borderBottomWidth: 1,
          borderBottomColor: '#F3F3FA'
        }}>
        <View style={{
          width: 38,
          height: 38,
          borderRadius: 19,
          backgroundColor: '#F3F3FA'
        }}>

        </View>

        <View style={{
          marginLeft: 12
        }}>
        <Text style={{
          width: 220,
            fontSize: 14,
            fontFamily: 'GeneralSans-Semibold',
            color: '#4A68FF',
          }}>
            Account Verification
          </Text>

          <Text style={{
            width: 253,
            fontSize: 12,
            fontFamily: 'GeneralSans-Regular',
            color: '#0F1121',
            marginTop: 4
          }}>
            Please verify your account to gift an package to your friend.
          </Text>
        </View>

        <Text style={{
            fontSize: 12,
            fontFamily: 'GeneralSans-Medium',
            color: '#67697A',
          }}>
            9:41 Am
          </Text>
        </View>
      </View>

    </ScrollView>
  )
}