import React, { useRef, useState } from 'react'
import { View, Text, ScrollView, StatusBar, TextInput, Pressable, Image, KeyboardAvoidingView, Dimensions, Platform } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import auth from '@react-native-firebase/auth'
import LottieView from 'lottie-react-native'
import firestore from '@react-native-firebase/firestore'

import IconBack from '../../assets/svg/back.svg'

export function SignUp({ navigation }: { navigation: any }) {

  const { width, height } = Dimensions.get("window")

  const nomeRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const [isFocused, setIsFocused] = useState('')
  const [loading, setLoading] = useState(false)
  const [messageErro, setmessageErro] = useState<string>('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpf, setCpf] = useState('')
  const [city, setCity] = useState('')

  

  async function signInWithEmailAndPassword() {
    setLoading(!loading)

    if (name != '' && email != '' && password != '') {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (auth) => {
          
          setLoading(!loading)
          await auth.user.updateProfile({
            displayName: name
          })

          await firestore()
          .collection('users@reriutaba')
          .doc(`${auth.user.uid}`)
          .set({
            name,
            email,
            city,
            cpf,
            accountCreation: new Date(),
            uid: auth.user.uid,
          })
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setmessageErro('Esse endereço de email já esta em uso!')
          }

          if (error.code === 'auth/invalid-email') {
            setmessageErro('Esse endereço de e-mail é inválido!')
          }

          setLoading(false)

        })
    } else {
      setmessageErro('Informe um email e senha válidos.')
      setLoading(false)
    }
  }

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
          <IconBack />
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
            Bem-vindo à Voz do Cidadão
          </Text>

          <Text style={{
            fontSize: 14,
            lineHeight: 20,
            fontFamily: 'GeneralSans-Regular',
            color: '#67697A',
            marginTop: 16
          }}>
            Promove a conscientização e educação dos cidadãos sobre seus direitos e deveres.
          </Text>
        </View>

        <View style={{
          marginTop: 32,
          gap: 16
        }}>

          <View style={{
            paddingHorizontal: 30
          }}>
            <Text style={{
              fontSize: 14,
              fontFamily: 'GeneralSans-Semibold',
              color: '#0F1121',
            }}>
              Nome
            </Text>

            <View style={{
              width: '100%',
              height: 48,
              backgroundColor: '#F3F3FA',
              borderRadius: 12,
              marginTop: 8,
              borderWidth: 1,
              //@ts-ignore
              borderColor: isFocused == 'nomeRef' ? '#4A68FF' : '#F3F3FA'
            }}>
              <TextInput
                onSubmitEditing={() => {
                  //@ts-ignore
                  emailRef.current.focus()
                }}
                ref={emailRef}
                keyboardType="default"
                autoComplete="name"
                placeholder="Digite seu nome"
                placeholderTextColor={"#CBCDE2"}
                autoCorrect={false}
                returnKeyType="go"
                onFocus={() => {
                  setIsFocused('nomeRef')
                }}
                onBlur={() => {
                  setIsFocused('')
                }}
                showSoftInputOnFocus={true}
                selectTextOnFocus={true}
                onChangeText={setName}
                value={name}
                style={{
                  width: '100%',
                  fontSize: 15,
                  fontFamily: 'GeneralSans-Medium',
                  color: '#0F1121',
                  height: 48,
                  marginLeft: 10,
                }} />
            </View>
          </View>

          <View style={{
            paddingHorizontal: 30
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
              height: 48,
              backgroundColor: '#F3F3FA',
              borderRadius: 12,
              marginTop: 8,
              borderWidth: 1,
              //@ts-ignore
              borderColor: isFocused == 'emailRef' ? '#4A68FF' : '#F3F3FA'
            }}>
              <TextInput
                ref={emailRef}
                onSubmitEditing={() => {
                  //@ts-ignore
                  passwordRef.current.focus()
                }}
                keyboardType="email-address"
                autoComplete="email"
                placeholder="Digite seu email"
                placeholderTextColor={"#CBCDE2"}
                autoCorrect={false}
                returnKeyType="go"
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
                  height: 48,
                  marginLeft: 10,
                }} />
            </View>
          </View>

          <View style={{
            paddingHorizontal: 30
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
              height: 48,
              backgroundColor: '#F3F3FA',
              borderRadius: 12,
              marginTop: 8,
              borderWidth: 1,
              //@ts-ignore
              borderColor: isFocused == 'passwordRef' ? '#4A68FF' : '#F3F3FA'
            }}>
              <TextInput
                ref={passwordRef}
                onSubmitEditing={() => {
                  signInWithEmailAndPassword()
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
                  height: 48,
                  marginLeft: 10,
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

        </View>

        <View style={{
          width: '100%',
          marginTop: messageErro ? 20 : 32,
          paddingHorizontal: 30
        }}>

          <Pressable
            onPress={() => {
              signInWithEmailAndPassword()
            }}
            style={{
              width: '100%',
              height: 52,
              borderRadius: 50,
              backgroundColor: '#4A68FF',
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

          {/* <View style={{
            marginTop: 32,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <View style={{
              width: '22%',
              height: 1,
              backgroundColor: '#F3F3FA'
            }} />

            <Text style={{
              fontSize: 14,
              lineHeight: 16,
              fontFamily: 'GeneralSans-Regular',
              color: '#67697A',
            }}>
              ou cadastre-se usando
            </Text>

            <View style={{
              width: '22%',
              height: 1,
              backgroundColor: '#F3F3FA'
            }} />

          </View>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20
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
              <Image source={ImgFacebook} resizeMode='contain' style={{
                width: 20,
                height: 20,
              }} />

              <Text style={{
                fontSize: 16,
                fontFamily: 'GeneralSans-Semibold',
                color: '#0F1121',
              }}>
                Facebook
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                onGoogleButtonPress()
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
              <Image source={ImgGoogle} resizeMode='contain' style={{
                width: 20,
                height: 20,
              }} />

              <Text style={{
                fontSize: 16,
                fontFamily: 'GeneralSans-Semibold',
                color: '#0F1121',
              }}>
                Google
              </Text>
            </Pressable>
          </View> */}

          <Pressable
            onPress={() => {
              navigation.navigate('SignIn')
            }}
            style={{
              alignSelf: 'center',
              marginTop: 32,
              marginBottom: 32
            }}>
            <Text style={{
              fontSize: 16,
              fontFamily: 'GeneralSans-Regular',
              color: '#67697A',
            }}>
              Já tem uma conta?  <Text style={{ fontFamily: 'GeneralSans-Semibold', color: '#4A68FF' }}>
                Entrar
              </Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}