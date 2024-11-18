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
import auth from '@react-native-firebase/auth'
import LottieView from 'lottie-react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import MaskInput, { Masks } from 'react-native-mask-input'

import IconBack from '../../assets/svg/back.svg'

export function SignUp({ navigation }: { navigation: any }) {

  const { width, height } = Dimensions.get("window")

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const [isFocused, setIsFocused] = useState('')
  const [loading, setLoading] = useState(false)
  const [messageErro, setmessageErro] = useState<string>('')

  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')

  return (
    <ScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false} style={{
      backgroundColor: '#ffff'
    }}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === "ios" ? -15 : -15}
        style={{
          width: width,
          height: '100%',
          paddingTop: getStatusBarHeight(),
        }}
      >
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
          paddingHorizontal: 30,
          marginTop: 24
        }}>
          <Text style={{
            fontSize: 24,
            fontFamily: 'GeneralSans-Semibold',
            color: '#0F1121',
          }}>
            Bem-vindo ao app{`\n`}
            e-Ilumina
          </Text>

          <Text style={{
            fontSize: 14,
            lineHeight: 20,
            fontFamily: 'GeneralSans-Regular',
            color: '#67697A',
            marginTop: 16
          }}>
            Promove o apoio e solitação de serviços de iluminação pública, por meio da digitalização.
          </Text>
        </View>

        <View style={{
          marginTop: 32,
          paddingHorizontal: 30,
          gap: 16
        }}>

          <View style={{
          }}>
            <Text style={{
              fontSize: 14,
              fontFamily: 'GeneralSans-Semibold',
              color: '#0F1121',
            }}>
              CPF
            </Text>

            <View style={{
              width: '100%',
              height: 55,
              backgroundColor: '#F3F3FA',
              borderRadius: 12,
              marginTop: 8,
              borderWidth: 1,
              borderColor: isFocused == 'emailRef' ? '#0077FF' : '#F3F3FA'
            }}>
              <MaskInput
                ref={emailRef}
                onSubmitEditing={() => {
                  //@ts-ignore
                  passwordRef.current.focus()
                }}
                mask={Masks.BRL_CPF}
                keyboardType="numeric"
                placeholder="Digite seu CPF"
                placeholderTextColor={"#CBCDE2"}
                autoCorrect={false}
                returnKeyType="go"
                showSoftInputOnFocus={true}
                selectTextOnFocus={true}
                onChangeText={(mask, unmasked) => {
                  setCpf(unmasked)
                }}
                value={cpf}
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
                  height: 51,
                  paddingLeft: 15,
                }} />
            </View>
          </View>

          <View style={{
          }}>
            <Text style={{
              fontSize: 14,
              fontFamily: 'GeneralSans-Semibold',
              color: '#0F1121',
            }}>
              Senha
            </Text>

            <View style={{
              width: '100%',
              height: 55,
              backgroundColor: '#F3F3FA',
              borderRadius: 12,
              marginTop: 8,
              borderWidth: 1,
              borderColor: isFocused == 'passwordRef' ? '#0077FF' : '#F3F3FA'
            }}>
              <TextInput
                ref={passwordRef}
                onSubmitEditing={() => {
                }}
                keyboardType="default"
                secureTextEntry={true}
                placeholder="Digite sua senha"
                placeholderTextColor={"#CBCDE2"}
                returnKeyType="send"
                showSoftInputOnFocus={true}
                selectTextOnFocus={true}
                onChangeText={setPassword}
                value={password}
                onFocus={() => {
                  setIsFocused('passwordRef')
                }}
                onBlur={() => {
                  setIsFocused('')
                }}
                style={{
                  width: '100%',
                  fontSize: 15,
                  fontFamily: 'GeneralSans-Medium',
                  color: '#0F1121',
                  height: 51,
                  paddingLeft: 15,
                }} />
            </View>
          </View>

          {
            messageErro == '' ? null : (
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'GeneralSans-Medium',
                    color: '#EB3738',
                  }}
                >{messageErro}</Text>
              </View>
            )
          }

          <Pressable
            onPress={async () => {
              setLoading(!loading)

              if (cpf != '' && password != '') {
                auth()
                  .createUserWithEmailAndPassword(`${cpf}@eilumina.com`, password)
                  .then(() => {
                    
                    setLoading(!loading)
                  })
                  .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                      setmessageErro('Esse endereço de email já esta em uso!')
                    }
          
                    if (error.code === 'auth/invalid-email') {
                      setmessageErro('Esse endereço de e-mail é inválido!')
                    }
          
                    if (error.code === 'auth/invalid-credential') {
                      setmessageErro('Essa conta não existe!')
                    }
          
                    else {
                      setmessageErro('Algo deu errado! Tente novamente mais tarde.')
                    }
          
                    setLoading(false)
          
                  })
              } else {
                setmessageErro('Informe um cpf e senha válidos.')
                setLoading(false)
              }
            }}
            style={{
              width: '100%',
              height: 55,
              borderRadius: 50,
              marginTop: 10,
              backgroundColor: '#0077FF',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            {
              loading ?

                <LottieView
                  source={require('../../assets/json/loading-w.json')}
                  autoPlay
                  loop={true}
                  speed={1}
                  style={{
                    width: 66,
                    height: 66,
                  }}
                /> : <Text style={{
                  fontSize: 16,
                  fontFamily: 'GeneralSans-Semibold',
                  color: '#FFFFFF',
                }}>
                  Criar conta
                </Text>
            }

          </Pressable>

        </View>

        <View style={{
          width: '100%',
          marginTop: messageErro ? 20 : 32,
          paddingHorizontal: 30,
        }}>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <View style={{
              width: '27%',
              height: 1,
              backgroundColor: '#F3F3FA'
            }} />

            <Text style={{
              fontSize: 14,
              lineHeight: 16,
              fontFamily: 'GeneralSans-Regular',
              color: '#67697A',
            }}>
              ou crie uma conta
            </Text>

            <View style={{
              width: '27%',
              height: 1,
              backgroundColor: '#F3F3FA'
            }} />

          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 25
          }}>
            <Pressable
              onPress={() => {

              }}
              style={{
                width: 160,
                height: 52,
                borderRadius: 50,
                flexDirection: 'row',
                gap: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#F3F3FA'
              }}>
              {/* <Image source={ImgFacebook} resizeMode='contain' style={{
                width: 20,
                height: 20,
              }} /> */}

              <Text style={{
                fontSize: 16,
                fontFamily: 'GeneralSans-Semibold',
                color: '#0F1121',
              }}>
                Email
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
              }}
              style={{
                width: 160,
                height: 52,
                borderRadius: 50,
                flexDirection: 'row',
                gap: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#F3F3FA'
              }}>
              {/* <Image source={ImgGoogle} resizeMode='contain' style={{
                width: 20,
                height: 20,
              }} /> */}

              <Text style={{
                fontSize: 16,
                fontFamily: 'GeneralSans-Semibold',
                color: '#0F1121',
              }}>
                Anônimo
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => {
              navigation.goBack()
            }}
            style={{
              alignSelf: 'center',
              marginTop: 32,
              marginBottom: 32,
            }}>
            <Text style={{
              fontSize: 16,
              fontFamily: 'GeneralSans-Regular',
              color: '#67697A',
            }}>
              Já tem uma conta?  <Text style={{ fontFamily: 'GeneralSans-Semibold', color: '#0077FF' }}>
                Entrar
              </Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}
