import React, { useState, useEffect, useRef } from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  Dimensions, 
  StatusBar,
  Platform,
  Pressable,
  Image,
  KeyboardAvoidingView
} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'
import Modal from 'react-native-modal'

import IconBack from '../../assets/svg/back.svg'
import Illustration from '../../assets/svg/illustration.svg'

export function AccountRecover({ navigation }: { navigation: any }) {

  const { width, height } = Dimensions.get("window")

  const emailRef = useRef(null)

  const [email, setEmail] = useState('')
  const [isFocused, setIsFocused] = useState('')
  const [error, setError] = useState('')

  const [isModalVisible, setModalVisible] = useState(false)

  function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  return (
    <GestureHandlerRootView style={{
      backgroundColor: '#ffff',
        flex: 1,
    }}>


      <ScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false} style={{
        flex: 1,
        paddingTop: getStatusBarHeight(),
      }}>
        <StatusBar translucent backgroundColor={'#00000000'} barStyle={'dark-content'} />

        <View style={{
          width: '100%',
          height: 42,
          marginTop: 24,
          paddingHorizontal: 30
        }}>
          <TouchableOpacity onPress={() => {
            navigation.goBack()
          }}>
            <IconBack width={24} height={24} />
          </TouchableOpacity>
        </View>

        <View style={{
          paddingHorizontal: 30
        }}>
          <Text style={{
            fontSize: 24,
            fontFamily: 'GeneralSans-Semibold',
            color: '#0F1121',
          }}>
            Recupere sua conta
          </Text>

          <Text style={{
            fontSize: 14,
            marginTop: 16,
            fontFamily: 'GeneralSans-Medium',
            color: '#67697A',
          }}>
            Enviamos a você um email de
            recuperação para você.
          </Text>
        </View>

        <View style={{
          paddingHorizontal: 30,
          marginTop: 24
        }}>
          <Text style={{
            fontSize: 14,
            fontFamily: 'GeneralSans-Semibold',
            color: '#0F1121',
          }}>
            Email
          </Text>

          <View style={{
            width: '100%',
            height: 55,
            backgroundColor: '#F3F3FA',
            borderRadius: 12,
            marginTop: 8,
            borderWidth: 1,
            borderColor: isFocused == 'emailRef' ? '#7534FF' : '#F3F3FA'
          }}>
            <TextInput
              ref={emailRef}
              onSubmitEditing={() => {
                
                if (validateEmail(email)) {
                  auth()
                    .sendPasswordResetEmail(email)
                    .then(() => {
                      setModalVisible(true)
                    })
                    .catch((error) => {
                      setError('Erro, não foi possível enviar o email de recuperação')
                    })
            
                } else {
                  setError('Por favor, insira um endereço de email válido')
                }
              }}
              keyboardType="default"
              placeholder="Digite seu email"
              placeholderTextColor={"#CBCDE2"}
              returnKeyType="send"
              showSoftInputOnFocus={true}
              selectTextOnFocus={true}
              onChangeText={setEmail}
              value={email}
              onFocus={() => {
                setIsFocused('emailRef')
              }}
              onBlur={() => {
                setIsFocused('')
              }}
              style={{
                width: '100%',
                fontSize: 15,
                fontFamily: 'GeneralSans-Medium',
                color: '#0F1121',
                height: 52,
                paddingLeft: 15,
              }} />
          </View>
        </View>

        {
            error && (
              <View style={{ alignItems: 'center', marginTop: 24 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'GeneralSans-Medium',
                    color: '#EB3738',
                  }}
                >{error}</Text>
              </View>
            )
          }


        <View style={{
          width: '100%',
          marginTop: 46,
          paddingHorizontal: 30,
        }}>
          <TouchableOpacity
            onPress={() => {
              
              if (validateEmail(email)) {
                auth()
                  .sendPasswordResetEmail(email)
                  .then(() => {
                    setModalVisible(true)
                  })
                  .catch((error) => {
                    setError('Erro, não foi possível enviar o email de recuperação')
                  })
          
              } else {
                setError('Por favor, insira um endereço de email válido')
              }
            }}
            style={{
              width: '100%',
              height: 55,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#7534FF'
            }}>
            <Text style={{
              fontSize: 16,
              fontFamily: 'GeneralSans-Semibold',
              color: '#FFFF',
            }}>
              Enviar email de recuperação
            </Text>
          </TouchableOpacity>
        </View>



      </ScrollView>

      <Modal
        customBackdrop={
          <View style={{ flex: 1, backgroundColor: 'rgba(15, 17, 33, 0.6)' }} />
        } statusBarTranslucent isVisible={isModalVisible} style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
      >
        <View style={{
          backgroundColor: '#FCFCFD',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          flex: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          alignItems: 'center'
        }}>
          <View style={{
            width: 42,
            height: 6,
            marginVertical: 8,
            borderRadius: 100,
            backgroundColor: '#E1E1E4'
          }} />

          <Illustration width={140} height={140} style={{
            marginTop: 42
          }} />

          <Text style={{
            fontSize: 20,
            fontFamily: 'GeneralSans-Semibold',
            color: '#0F1121',
            marginTop: 24,
          }}>
            Verifique sua caixa de email.
          </Text>

          <Text style={{
            width: '70%',
            textAlign: 'center',
            fontSize: 13,
            lineHeight: 16,
            marginTop: 10,
            fontFamily: 'GeneralSans-Regular',
            color: '#67697A',
          }}>
            Veja sua caixa de email para continuar utilizando o app,
            aguarde uns instantes até o chegar em sua caixa emails.
          </Text>

          <View style={{
            width: '100%',
            marginTop: 45,
            marginBottom: 25,
            paddingHorizontal: 30,
          }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false)

                navigation.goBack()
              }}
              style={{
                width: '100%',
                height: 52,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#7534FF'
              }}>
              <Text style={{
                fontSize: 16,
                fontFamily: 'GeneralSans-Semibold',
                color: '#FFFF',
              }}>
                Continuar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  )
}