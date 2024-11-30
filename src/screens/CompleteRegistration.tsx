import {
  View,
  Text,
  FlatList,
  StatusBar,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {useAuth} from '../hooks/auth';
import {COLLECTION_REGISTRATION} from '../configs/database';

import BackgroundImage from '../../assets/svg/8503139.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function CompleteRegistration() {
  const {city, setUserRegistration} = useAuth();

  const [images, setImages] = useState([
    {
      id: 1,
      uri: require('../../assets/img/chris.png'),
      img: 'chris',
      selected: false,
    },
    {
      id: 2,
      uri: require('../../assets/img/mattew.png'),
      img: 'mattew',
      selected: false,
    },
    {
      id: 3,
      uri: require('../../assets/img/ed.png'),
      img: 'ed',
      selected: false,
    },
    {
      id: 4,
      uri: require('../../assets/img/justin.png'),
      img: 'justin',
      selected: false,
    },
  ]);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFF',
      }}>
      <StatusBar
        translucent
        backgroundColor={'#00000000'}
        barStyle={'dark-content'}
      />

      <OrientationLocker orientation={PORTRAIT} />

      <FlatList
        data={images}
        numColumns={2}
        ListHeaderComponent={() => {
          return (
            <View
              style={{
                marginTop: getStatusBarHeight() + 24,
                paddingHorizontal: 30,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'GeneralSans-Semibold',
                  color: '#0F1121',
                }}>
                Selecione uma foto de perfil
              </Text>
            </View>
          );
        }}
        ListHeaderComponentStyle={{
          marginBottom: 24,
        }}
        contentContainerStyle={{
          paddingHorizontal: 30,
        }}
        renderItem={item => {
          return (
            <Pressable
              onPress={() => {
                setImages(
                  images.map(image => ({
                    ...image,
                    selected:
                      image.id === item.item.id ? !image.selected : false,
                  })),
                );
              }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 120,
                margin: Dimensions.get('window').width * 0.05,
                borderColor: '#0077FF',
                borderWidth: item.item.selected ? 3 : 0,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
              }}>
              <View
                style={{
                  backgroundColor: '#E0EFFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  borderRadius: 120,
                }}>
                <Image
                  resizeMode="cover"
                  style={{
                    width: 90,
                    height: 90,
                  }}
                  source={item.item.uri}
                />
              </View>
            </Pressable>
          );
        }}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                marginTop: 30,
                alignItems: 'center',
                gap: 16,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'GeneralSans-Semibold',
                  color: '#3B4C56',
                  textAlign: 'center',
                }}>
                Não é obrigatorio selecionar uma imagem
              </Text>

              <Pressable
                onPress={async () => {
                  const registration = {
                    img: images.filter(image => image.selected)[0].img,
                  };

                  await AsyncStorage.setItem(
                    COLLECTION_REGISTRATION,
                    JSON.stringify(registration),
                  );

                  setUserRegistration(registration);

                  await firestore()
                    .collection('db')
                    .doc(`${(city as {city: string}).city}@vozdamulher`)
                    .collection('users')
                    .doc(auth().currentUser?.uid)
                    .set({
                      img: images.filter(image => image.selected)[0].img,
                    });
                }}
                style={{
                  width: '100%',
                  height: 55,
                  borderRadius: 50,
                  backgroundColor: '#0077FF',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'GeneralSans-Semibold',
                    color: '#FFFFFF',
                  }}>
                  Continuar
                </Text>
              </Pressable>

              <Pressable
                style={{
                  width: '100%',
                  height: 55,
                  borderRadius: 50,
                  borderColor: '#E5EBF2',
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'GeneralSans-Semibold',
                    color: '#3B4C56',
                  }}>
                  Pular
                </Text>
              </Pressable>

              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopColor: '#E5EBF2',
                  borderTopWidth: 0.8,
                  paddingHorizontal: 20,
                  marginTop: '35%',
                }}>
                <Text
                  style={{
                    width: '90%',
                    fontSize: 12,
                    fontFamily: 'GeneralSans-Regular',
                    color: '#707070',
                    marginTop: 15,
                    textAlign: 'center',
                  }}>
                  Ao continuar, você concorda com os nossos{' '}
                  <Text
                    style={{
                      fontFamily: 'GeneralSans-Medium',
                      color: '#0077FF',
                    }}>
                    Termos de Serviço
                  </Text>{' '}
                  e declara que leu nossa
                  <Text
                    style={{
                      fontFamily: 'GeneralSans-Medium',
                      color: '#0077FF',
                    }}>
                    {' '}
                    Política de Privacidade
                  </Text>{' '}
                  para saber como coletamos e usamos seus dados.
                </Text>
              </View>
            </View>
          );
        }}
      />

      <BackgroundImage
        style={{
          position: 'absolute',
          zIndex: -1,
          top: -10,
          left: -30,
          opacity: 0.45,
          width: '110%',
          height: '110%',
        }}
      />
    </View>
  );
}
