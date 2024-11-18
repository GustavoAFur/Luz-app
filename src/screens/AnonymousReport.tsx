import React, { useState } from 'react'
import { View, Text, ScrollView, StatusBar, Pressable, TouchableOpacity, Dimensions, TouchableNativeFeedback, TextInput, Image, StyleSheet, FlatList, KeyboardAvoidingView, LogBox } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import firestore from '@react-native-firebase/firestore'
import Modal from 'react-native-modal'
import DropDownPicker from 'react-native-dropdown-picker'
import DocumentPicker from 'react-native-document-picker'
import storage from '@react-native-firebase/storage'
import { ptBR } from 'date-fns/locale'
import auth from '@react-native-firebase/auth'
import { format } from 'date-fns'

import IconClose from '../../assets/svg/close.svg'
import IconBack from '../../assets/svg/back.svg'
import IconFolder from '../../assets/svg/folder.svg'
import IconFile from '../../assets/svg/file.svg'
import IconTickCircle from '../../assets/svg/tick-circle.svg'
import MaskMap from '../../assets/svg/mask-map.svg'
import MapPin from '../../assets/svg/map-pin.svg'
import IconChevronRight from '../../assets/svg/chevron-right.svg'

import { useAuth } from '../hooks/auth'

interface File {
  uri: string;
  type: string | null;
  name: string | null;
  size: number | null;
  formattedSize: string | null;
  fileCopyUri: string | null;
  progress?: number;
  uploadDate: Date;
}
export function AnonymousReport({ navigation }: { navigation: any }) {

  const { width, height } = Dimensions.get("window")
  const { setCity, city } = useAuth()

  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
  ]);

  const [TipoImovel, setTipoImovel] = useState('')
  const [uriImage, setUriImage] = useState('')
  const [downloadURL, setDownloadURL] = useState('')
  const [descricaoViolencia, setDescricaoViolencia] = useState('')
  const [progress, setProgress] = useState(0)
  const [modalErro, setModalErro] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isModalVisible, setModalVisible] = useState(false);

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([
    { label: "Violência física", value: "violencia_fisica" },
    { label: "Violência psicológica", value: "violencia_psicologica" },
    { label: "Violência sexual", value: "violencia_sexual" },
    { label: "Violência patrimonial", value: "violencia_patrimonial" },
    { label: "Violência moral", value: "violencia_moral" },
    { label: "Violência doméstica", value: "violencia_domestica" },
    { label: "Violência obstétrica", value: "violencia_obstetrica" },
    { label: "Assédio sexual", value: "assedio_sexual" },
    { label: "Violência institucional", value: "violencia_institucional" },
  ])

  async function uploadFile() {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'cachesDirectory'
      });

      const files = result.map(file => ({
        uri: file.uri,
        type: file.type,
        name: file.name,
        size: file.size,
        formattedSize: file.size !== null ? formatFileSize(file.size) : 'Tamanho desconhecido',
        fileCopyUri: file.fileCopyUri,
        progress: 0,
        uploadDate: new Date()
      }));

      setSelectedFiles(prevFiles => [...prevFiles, ...files]);

      files.forEach((file, index) => {
        const storageRef = storage().ref(`debug@vozdamulher/denuncias/arquivos/${file.name}`);

        if (file.fileCopyUri === null) {
          return;
        }

        const task = storageRef.putFile(file.fileCopyUri);

        task.on(
          'state_changed',
          snapshot => {

            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            // Atualize o progresso do arquivo individualmente no array de arquivos
            setSelectedFiles(prevFiles =>
              prevFiles.map((f, i) => i === index ? { ...f, uploadDate: new Date(), progress } : f)
            );
          },
          error => {
            setModalErro(true);
          },
          async () => {
            const downloadURL = await storageRef.getDownloadURL();
            setDownloadURL(downloadURL);
          }
        );
      });
    } catch (err) {
      setModalErro(true);
    }
  }

  function formatFileSize(bytes: number) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let index = 0;
    let size = bytes;

    while (size >= 1024 && index < units.length - 1) {
      size /= 1024;
      index++;
    }

    return `${size.toFixed(2)} ${units[index]}`;
  }

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
            Denúncias anônimas
          </Text>

          <View style={{
            width: 42,
            height: 42,
          }} />

        </View>


      </View>


      <View style={{
        width: '100%',
        marginTop: 24,
        paddingHorizontal: 30,
      }}>

        <Text style={{
          color: '#0F1121',
          fontFamily: 'GeneralSans-Semibold',
          fontSize: 16,
        }}>
          Tipo de Violência
        </Text>

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{
            marginTop: 16,
            width: '100%',
            height: 55,
            borderWidth: 1,
            borderRadius: 12,
            borderColor: '#F3F3FA',
          }}
          dropDownDirection='BOTTOM'
          dropDownContainerStyle={{
            paddingLeft: 12,
            backgroundColor: '#FFFFFF',
            borderColor: '#F3F3FA',
            borderWidth: 1,
            marginTop: 16,
            shadowColor: "#0002",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
          placeholderStyle={{
            color: '#67697A',
            fontFamily: 'GeneralSans-Semibold',
            fontSize: 14
          }}
          textStyle={{
            color: '#151E26',
            fontFamily: 'GeneralSans-Regular',
            fontSize: 14
          }}
          placeholder='Selecione um item...'
        />
      </View>

      <View style={{
        marginTop: 24,
        paddingHorizontal: 30,
      }}>
        <Text style={{
          color: '#0F1121',
          fontFamily: 'GeneralSans-Semibold',
          fontSize: 16,
        }}>Informe uma descrição do acontecimento:</Text>

        <View style={{
          marginTop: 16,
          borderWidth: 1,
          height: 200,
          borderRadius: 10,
          borderColor: '#F3F3FA',
          paddingHorizontal: 10
        }}>

          <TextInput
            multiline
            onChangeText={(text) => setDescricaoViolencia(text)}
            value={descricaoViolencia}
            style={{
              width: '100%',
              height: 200,
              fontSize: 15,
              fontFamily: 'GeneralSans-Medium',
              color: '#0F1121',
              paddingVertical: 15,
              paddingHorizontal: 10,
              textAlignVertical: 'top'
            }} />
        </View>

      </View>

      <Pressable
      onPress={() => setModalVisible(true)}
      style={{
        width: '100%',
        paddingHorizontal: 30,
        marginTop: 16
      }}>
        <View style={{
          width: '100%',
          height: 80,
          borderRadius: 12,
          backgroundColor: '#F2F6FC',
        }}>

          <View style={{
            width: '100%',
            height: 80,
            borderRadius: 12,
            zIndex: 1,
            position: 'absolute',
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8
          }}>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12
            }}>
              <MapPin
                width={24}
                height={24}
              />

              <View style={{
                alignItems: 'flex-start'
              }}>
                <Text style={{
                  color: '#808D9E',
                  fontSize: 12,
                  fontFamily: 'GeneralSans-Medium',
                }}>
                  Informe o endereço
                </Text>

                <Text style={{
                  color: '#191A26',
                  fontSize: 14,
                  fontFamily: 'GeneralSans-Semibold',
                }}>
                  Clique para abrir o mapa
                </Text>
              </View>

            </View>


            <IconChevronRight
              width={24}
              height={24}
            />
          </View>

          <MaskMap
            style={{
              width: 335,
              height: 80,
              position: 'absolute',
              zIndex: 0,
            }}
          />
        </View>

      </Pressable>

      <Pressable
        onPress={() => uploadFile()}
        style={{
          marginTop: 16,
          paddingHorizontal: 30
        }}
      >
        <View style={{
          width: '100%',
          height: 175,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#EDE4FF',
          backgroundColor: '#FCFBFF',
          borderStyle: 'dashed',
          padding: 16,
        }}>
          {
            uriImage !== '' ? (
              <Image
                resizeMode='cover'
                style={{
                  width: width,
                  height: width,
                }}
                source={{
                  uri: uriImage,
                }}
              />
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8
                }}
              >
                <IconFolder width={58} height={58} />

                <View style={{
                  width: '80%',
                  marginTop: 8
                }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#0077FF',
                      fontFamily: 'GeneralSans-Semibold',
                      fontSize: 14,
                    }}
                  >
                    Arraste e solte ou escolha{`\n`}
                    o arquivo para fazer upload.
                  </Text>

                  <Text
                    style={{
                      marginTop: 8,
                      textAlign: 'center',
                      color: '#3B4C56',
                      fontFamily: 'GeneralSans-Regular',
                      fontSize: 12,
                    }}
                  >
                    Selecione zip, imagem, pdf ou word
                  </Text>
                </View>
              </View>
            )
          }


        </View>
      </Pressable>

      {
        selectedFiles.length !== 0 && (

          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            contentContainerStyle={{
              width: '100%',
            }}
            style={{
              width: '100%',
              paddingHorizontal: 30,
              marginTop: 24
            }}
            ListHeaderComponent={() => (
              <Text style={{
                fontSize: 14,
                lineHeight: 20,
                fontFamily: 'GeneralSans-Medium',
                color: '#67697A',
              }}>
                Anexos
              </Text>
            )}
            data={selectedFiles}
            renderItem={({ item, index }) => (
              <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: '#F6F7F9',
                borderRadius: 12,
                marginVertical: 8,
                paddingHorizontal: 16
              }}>
                <IconFile width={32} height={32} />

                <View style={{
                  width: '60%',
                  paddingVertical: 20
                }}>
                  <Text style={{
                    fontSize: 16,
                    fontFamily: 'GeneralSans-Semibold',
                    color: '#0F1121',
                  }}>
                    {item.name}
                  </Text>

                  <Text style={{
                    fontSize: 14,
                    marginTop: 8,
                    fontFamily: 'GeneralSans-Medium',
                    color: '#0F1121',
                  }}>
                    {format(new Date(item.uploadDate), 'MMMM dd, yyyy', { locale: ptBR })}
                  </Text>

                  <View style={{
                    gap: 8,
                    marginTop: 4,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Text style={{
                      fontSize: 12,
                      fontFamily: 'GeneralSans-Medium',
                      color: '#67697A',
                    }}>
                      {format(new Date(item.uploadDate), 'hh:mm a')}
                    </Text>

                    <View
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: 5,
                        backgroundColor: '#67697A',
                      }}
                    />
                    <Text style={{
                      fontSize: 12,
                      fontFamily: 'GeneralSans-Medium',
                      color: '#67697A',
                    }}>
                      {item.formattedSize}
                    </Text>
                  </View>
                </View>

                <View style={{
                  width: 48,
                  height: 48,
                  borderRadius: 48,
                  borderWidth: 2,
                  borderColor: item.progress === 100 ? '#FFFF' : '#0077FF',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {
                    item.progress === 100 ? (
                      <IconTickCircle width={24} height={24} />
                    ) : (
                      <Text style={{
                        fontSize: 12,
                        fontFamily: 'GeneralSans-Semibold',
                        color: '#0F1121',
                      }}>
                        {item.progress}%
                      </Text>
                    )
                  }

                </View>
              </View>
            )}
          />
        )
      }

      <View style={{
        width: '100%',
        paddingHorizontal: 30,
        marginTop: 24,
        marginBottom: 24
      }}>
        <TouchableOpacity
          onPress={() => {
            firestore()
              .collection(`users/${(city as { city: string }).city}@vozdamulher/db/manifestations/${auth().currentUser?.uid}/complaints/anonymous`)
              .add({
                registrationDate: new Date(),
                manifestationType: 'anonymous',
                propertyCategory: TipoImovel,
                violenceDetails: descricaoViolencia,
                files: selectedFiles,

                victim: {
                  name: null,
                  birthDate: null,
                  nationality: null,
                  maritalStatus: null,
                  numberOfChildren: null,
                  contact: null,
                },

                perpetrator: {
                  name: null,
                  birthDate: null,
                  address: null,
                  criminalHistory: null,
                },

                incident: {
                  date: null,
                  time: null,
                  location: null,
                  nature: null,
                  motive: null,
                  frequency: null,
                  weaponsInvolved: null,
                  description: null,
                  witnesses: null,
                  effectsOnVictim: {
                    physicalEffects: null,
                    psychologicalEffects: null,
                    preexistingConditions: null,
                  },
                },

                responseActions: {
                  reportedToAuthorities: null,
                  actionsTaken: null,
                },
                supportServices: {
                  supportServicesContact: null,
                  historyOfHelp: null,
                  supportNetwork: null,
                },
                documentation: {
                  evidenceFiles: null,
                  witnessReports: null,
                  photographicEvidence: null,
                  callRecords: null,
                },
                followUp: {
                  progress: null,
                }
              }).then(() => {
                navigation.goBack()
              })
          }}
          style={{
            width: '100%',
            height: 60,
            borderRadius: 10,
            backgroundColor: '#0077FF',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Text style={{
            color: '#fff',
            fontFamily: 'GeneralSans-Semibold',
            fontSize: 16,
          }}>
            Criar Manifestação
          </Text>
        </TouchableOpacity>
      </View>

      <Modal customBackdrop={
        <TouchableNativeFeedback onPress={() => setModalErro(false)}>
          <View style={{ flex: 1 }} />
        </TouchableNativeFeedback>
      } statusBarTranslucent isVisible={modalErro} style={{
        justifyContent: 'flex-end',
        margin: 0,
        marginBottom: 30,
        paddingHorizontal: 30
      }}>
        <View style={{
          width: '100%',
          padding: 16,
          borderRadius: 8,
          backgroundColor: '#FFFF',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          shadowColor: "#0005",
          borderWidth: 1,
          borderColor: '#EDE4FF',
          shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.48,
          shadowRadius: 11.95,

          elevation: 18,
        }}>
          <View>
            <Text style={{
              fontSize: 16,
              fontFamily: 'GeneralSans-Semibold',
              color: '#0077FF',
            }}>
              Erro ao fazer upload do arquivo
            </Text>

            <Text style={{
              fontSize: 12,
              lineHeight: 18,
              fontFamily: 'GeneralSans-Medium',
              color: '#67697A',
            }}>
              Caso persista, contate o suporte.
            </Text>
          </View>

          <Pressable
            onPress={() => setModalErro(false)}
            style={{
              width: 28,
              height: 28,
              borderRadius: 28,
              backgroundColor: '#3590FF',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <IconClose width={16} height={16} />
          </Pressable>
        </View>
      </Modal>

      <Modal 
        statusBarTranslucent
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onBackButtonPress={() => setModalVisible(!isModalVisible)}
      >
        <View style={{ 
          backgroundColor: 'white',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderColor: 'rgba(0, 0, 0, 0.1)',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height * 0.95,
          position: 'absolute',
          bottom: 0,
          overflow: 'hidden'  
         }}>
          <Pressable
            onPress={() => setModalVisible(!isModalVisible)}
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
            {/* <Close width={16} height={16} /> */}
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
              // onPress={() =>{getCurrentPosition()}}
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
          {/* <ChoosePlace location={position ?? { latitude: 0, longitude: 0 }} /> */}
        </View>
      </Modal>

    </ScrollView>
  )
}