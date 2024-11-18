import React from 'react'
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { useAuth } from '../hooks/auth'
import { COLLECTION_CITY } from '../configs/database'

export function Onboard({ navigation }: { navigation: any }) {

  const { setCity, city } = useAuth()

  return (
    <View style={{
      width: '100%',
      height: '100%',
      paddingTop: getStatusBarHeight() + 24,
      justifyContent: 'space-between',
      backgroundColor: '#ffff'
    }}>

      <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />

      <View style={{
        alignItems: 'center'
      }}>

        <Text style={{
          color: '#323232',
          textAlign: 'center',
          letterSpacing: -1,
          fontSize: 28,
          lineHeight: 32,
          fontFamily: 'GeneralSans-Medium',
          textAlignVertical: 'center',
        }}>

          Onde você se <Text style={{ color: '#0077FF', fontFamily: 'GeneralSans-Semibold', }}>encontra</Text>, e{'\n'}
          selecione umas das cidades.

        </Text>

        <Text style={{
          fontSize: 14,
          width: '80%',
          textAlign: 'center',
          fontFamily: 'GeneralSans-Regular',
          color: '#323232',
          opacity: 0.75,
          alignSelf: 'center',
          marginTop: 5
        }}>
          Para melhorar sua experiência informe a cidade.
        </Text>

        <View style={{
          width: '100%',
          paddingHorizontal: 40,
          marginTop: 30,
          gap: 20
        }}>
          <TouchableOpacity
            onPress={async () => {

              const LogCity = {
                city: 'reriutaba'
              }

              await AsyncStorage.setItem(COLLECTION_CITY, JSON.stringify(LogCity))

              setCity(LogCity)
            }}
            style={{
              width: '100%',
              borderWidth: `${(city as { city: string }).city}` == 'reriutaba' ? 1.35 : 1,
              borderColor: `${(city as { city: string }).city}` == 'reriutaba' ? '#0077FF' : '#E0EFFF',
              borderRadius: 10,
              padding: 20
            }}>
            <Text style={{
              color: `${(city as { city: string }).city}` == 'reriutaba' ? '#0077FF' : '#323232',
              fontFamily: 'GeneralSans-Semibold',
              letterSpacing: -1,
              fontSize: 22,
              lineHeight: 24,
            }}>Reriutaba</Text>

            <Text style={{
              fontSize: 14,
              width: '90%',
              textAlign: 'left',
              fontFamily: 'GeneralSans-Medium',
              color: '#323232',
              opacity: 0.75,
              marginTop: 5
            }}>
              Todos os cadastros e jurisprudência realizados serão de responsabilidade do órgão da cidade em questão.
            </Text>
          </TouchableOpacity>


        </View>

        <View style={{ width: '100%', marginTop: 30, marginBottom: 30, paddingHorizontal: 40, opacity: `${(city as { city: string }).city}` == 'reriutaba' ? 1 : 0.5 }}>
          <TouchableOpacity
            disabled={`${(city as { city: string }).city}` ? false : true}
            onPress={() => { navigation.navigate('SignIn') }}
            style={{
              backgroundColor: `${(city as { city: string }).city}` ? '#0077FF' : '#3590FF',
              borderRadius: 10, width: '100%', height: 55, alignItems: 'center', justifyContent: 'center',
              
            }}>
            <Text style={{
              fontSize: 16,
              fontFamily: 'GeneralSans-Bold',
              alignSelf: 'center',
              color: `${(city as { city: string }).city}` == 'reriutaba' ? '#fff' : '#E0EFFF',
            }}>
              Continuar
            </Text>
          </TouchableOpacity>

        </View>
      </View>

      <View style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopColor: '#E1D3FF',
        borderTopWidth: 0.8,
        paddingHorizontal: 20,
        marginBottom: 20
      }}>
        <Text
          style={{
            width: '90%',
            fontSize: 12,
            fontFamily: 'GeneralSans-Regular',
            color: '#707070',
            marginTop: 15,
            textAlign: 'center'
          }}>
          Ao continuar, você concorda com os nossos <Text style={{ fontFamily: 'GeneralSans-Medium', color: '#0077FF' }}>Termos de Serviço</Text> e declara que leu nossa
          <Text style={{ fontFamily: 'GeneralSans-Medium', color: '#0077FF' }}> Política de Privacidade</Text> para saber como coletamos e usamos seus dados.
        </Text>
      </View>

    </View>
  )
}