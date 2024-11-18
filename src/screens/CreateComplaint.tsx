import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Pressable,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Geolocation from '@react-native-community/geolocation'

import Modal from "react-native-modal";

import IconBack from '../../assets/svg/back.svg';
import Close from '../../assets/svg/close.svg';

import { ChoosePlace } from './ChoosePlace';
import { LocationContext } from '../contexts/locationContext';

interface latLong{
  latitude: number,
  longitude: number
}

export function CreateComplaint({navigation}: {navigation: any}) {

  const [isModalVisible, setModalVisible] = useState(false);

  const [position, setPosition] = useState<latLong | null>(null);
  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({latitude, longitude});
      },
      (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      { enableHighAccuracy: true }
    );
    console.log(position);
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [problemType, setProblemType] = useState('');
  const [descriptionProblem, setDescriptionProblem] = useState('');

  const { locationSelected, setLocationSelected } = useContext(LocationContext);

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: '#ffff',
        flex: 1,
      }}>
      <StatusBar
        translucent
        backgroundColor={'#00000000'}
        barStyle={'dark-content'}
      />

      <View
        style={{
          marginTop: getStatusBarHeight() + 14,
          paddingHorizontal: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Pressable
            style={{
              width: 42,
              height: 42,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <IconBack />
          </Pressable>

          <Text
            style={{
              fontSize: 18,
              fontFamily: 'GeneralSans-Semibold',
              color: '#0F1121',
            }}>
            Criar denúncia
          </Text>

          <View
            style={{
              width: 42,
              height: 42,
            }}
          />
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 30,
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'GeneralSans-Semibold',
            color: '#0F1121',
          }}>
          Qual o tipo do problema?
        </Text>

        <View
          style={{
            width: '100%',
            height: 48,
            backgroundColor: '#F3F3FA',
            borderRadius: 12,
            marginTop: 8,
            borderWidth: 1,
            borderColor: '#F3F3FA',
          }}>
          <Pressable
            style={styles.textInput}
          >
            <Text style={styles.textSelect}>
              {
                problemType === '' ? 'Selecione o tipo do problema' : problemType
              }
            </Text>
          </Pressable>
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 30,
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'GeneralSans-Semibold',
            color: '#0F1121',
          }}>
          Descrição do problema
        </Text>

        <View
          style={{
            width: '100%',
            height: 96,
            backgroundColor: '#F3F3FA',
            borderRadius: 12,
            marginTop: 8,
            borderWidth: 1,
            borderColor: '#F3F3FA',
          }}>
          <TextInput
            keyboardType="default"
            autoComplete="name"
            placeholder="Descreva o problema"
            placeholderTextColor={'#CBCDE2'}
            autoCorrect={false}
            returnKeyType="go"
            showSoftInputOnFocus={true}
            selectTextOnFocus={true}
            onChangeText={setDescriptionProblem}
            value={descriptionProblem}
            multiline
            style={styles.textInput}
          />
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 30,
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'GeneralSans-Semibold',
            color: '#0F1121',
          }}>
          Documentação de Suporte
        </Text>

        <Text
          style={{
            fontSize: 12,
            fontFamily: 'GeneralSans-Medium',
            color: '#0F1121',
          }}>
          (Imagens do local e do problema)
        </Text>

        <Pressable
          onPress={() => {}}
          style={{
            width: '100%',
            height: 150,
            backgroundColor: '#F3F3FA',
            borderRadius: 12,
            marginTop: 8,
            borderWidth: 1,
            borderColor: '#F3F3FA',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            overflow: 'hidden',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}>
            <Image
              source={require('../../assets/img/upload.png')}
              style={{
                width: 40,
                height: 40,
              }}
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'GeneralSans-Semibold',
                color: '#CBCDE2',
              }}>
              Subir Arquivo
            </Text>
          </View>
        </Pressable>
      </View>

      {
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'GeneralSans-Semibold',
            color: '#0F1121',
            marginLeft: 30,
          }}
        >
          {locationSelected?.location?.latitude}
          {locationSelected?.location?.longitude}
        </Text>
      }
      
      <Pressable
        onPress={() => {
          toggleModal()
        }}
        style={{
          height: 52,
          borderRadius: 50,
          backgroundColor: '#ffffff',
          borderColor: '#0077FF',
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 30,
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'GeneralSans-Semibold',
            color: '#0077FF',
          }}>
          Informar Local
        </Text>
      </Pressable>

      <Pressable
        onPress={() => {
    
        }}
        style={{
          height: 52,
          borderRadius: 50,
          backgroundColor: '#4A68FF',
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 30,
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'GeneralSans-Semibold',
            color: '#FFFFFF',
          }}>
          Próximo
        </Text>
      </Pressable>

      <Modal 
        statusBarTranslucent
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
      >
        <View style={{ 
          backgroundColor: 'white',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderColor: 'rgba(0, 0, 0, 0.1)',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height * 0.8,
          position: 'absolute',
          bottom: 0,
          overflow: 'hidden'  
         }}>
          <Pressable
            onPress={toggleModal}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              zIndex: 1,
              width: 24,
              height: 24,
              backgroundColor: 'gray',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
            }}
          >
            <Close width={16} height={16} />
          </Pressable>

          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              alignSelf: 'center',
              height: 68,
              borderRadius: 12,
              position: 'absolute',
              zIndex: 1,
              bottom: 0,
              boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1)',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30
            }}
          >
            <Pressable
              onPress={() =>{getCurrentPosition()}}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'GeneralSans-Semibold',
                  color: '#4A68FF',
                }}>
                Meu Local
              </Text>
              <Image
                source={require('../../assets/img/local.png')}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </Pressable>
            <Pressable
              onPress={() => {}}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'GeneralSans-Semibold',
                  color: '#4A68FF',
                }}>
                Confirmar
              </Text>
              <Image
                source={require('../../assets/img/confirm.png')}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </Pressable>
          </View>
          <ChoosePlace location={position ?? { latitude: 0, longitude: 0 }} />
        </View>
      </Modal>

    </ScrollView>
    
  
  );
}
const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    color: '#0F1121',
    height: 48,
    marginLeft: 10,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  textSelect:{
    fontSize: 15,
    fontFamily: 'GeneralSans-Medium',
    color: '#CBCDE2', 
  }
});
