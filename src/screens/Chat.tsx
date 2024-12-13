import {
  View,
  Text,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../hooks/auth';
import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import auth from '@react-native-firebase/auth';
import {
  addDays,
  format,
  formatDistanceToNow,
  isSameDay,
  isSameMinute,
  parseISO,
} from 'date-fns';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import {ptBR} from 'date-fns/locale';

import IconBack from '../../assets/svg/back.svg';
import IconSend from '../../assets/svg/send-01.svg';

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

export function Chat({navigation}: {navigation: any}) {
  const list = useRef();
  const scrollViewRef = useRef();

  const {city} = useAuth();

  const user = auth().currentUser?.uid;

  const [mensagens, setMensagens] = useState([]);
  const [conversasId, setConversasId] = useState('');
  const [conversaInfo, setConversasInfo] = useState({});
  const [mensage, setMensage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [modalErro, setModalErro] = useState(false);
  const [downloadURL, setDownloadURL] = useState('');

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

  async function uploadFile() {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'cachesDirectory',
      });

      const files = result.map(file => ({
        uri: file.uri,
        type: file.type,
        name: file.name,
        size: file.size,
        formattedSize:
          file.size !== null
            ? formatFileSize(file.size)
            : 'Tamanho desconhecido',
        fileCopyUri: file.fileCopyUri,
        progress: 0,
        uploadDate: new Date(),
      }));

      setSelectedFiles(prevFiles => [...prevFiles, ...files]);

      files.forEach((file, index) => {
        const storageRef = storage().ref(
          `debug@vozdamulher/denuncias/arquivos/${file.name}`,
        );

        if (file.fileCopyUri === null) {
          return;
        }

        const task = storageRef.putFile(file.fileCopyUri);

        task.on(
          'state_changed',
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );

            // Atualize o progresso do arquivo individualmente no array de arquivos
            setSelectedFiles(prevFiles =>
              prevFiles.map((f, i) =>
                i === index ? {...f, uploadDate: new Date(), progress} : f,
              ),
            );
          },
          error => {
            setModalErro(true);
          },
          async () => {
            const downloadURL = await storageRef.getDownloadURL();
            setDownloadURL(downloadURL);
          },
        );
      });
    } catch (err) {
      setModalErro(true);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFF',
        justifyContent: 'space-between',
      }}>
      <StatusBar
        translucent
        backgroundColor={'#00000000'}
        barStyle={'dark-content'}
      />

      <OrientationLocker orientation={PORTRAIT} />

      <View
        style={{
          width: '100%',
          height: 142,
          backgroundColor: '#FFFF',
          paddingTop: getStatusBarHeight(),
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          shadowColor: '#0005',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
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

          <View
            style={{
              width: 55,
              height: 55,
              borderRadius: 23.57,
              backgroundColor: '#EDE4FF',
            }}></View>

          <View
            style={{
              marginLeft: 18,
            }}>
            <Text
              style={{
                fontSize: 18,
                lineHeight: 20,
                fontFamily: 'GeneralSans-Semibold',
                color: '#383530',
              }}>
              Suporte
            </Text>

            <Text
              style={{
                fontSize: 14,
                lineHeight: 16,
                marginTop: 3,
                fontFamily: 'GeneralSans-Medium',
                color: '#EA9B58',
              }}>
              Online
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 35,
          }}></View>
      </View>

      <FlatList
        //@ts-ignore
        ref={list}
        scrollToOverflowEnabled={true}
        showsVerticalScrollIndicator={false}
        data={mensagens}
        contentContainerStyle={{
          position: 'absolute',
          width: '100%',
        }}
        //@ts-ignore
        keyExtractor={item => item.id}
        //@ts-ignore
        renderItem={({index, item}) => {
          return (
            //@ts-ignore
            item.remetente != user ? (
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-start',
                  marginTop: index == 0 ? 10 : 0,
                  paddingHorizontal: 20,
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    borderBottomRightRadius: 30,
                    backgroundColor: '#EDE4FF',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 20,
                      marginHorizontal: 20,
                      fontFamily: 'GeneralSans-Medium',
                      color: '#7534FF',
                      marginVertical: 15,
                    }}>
                    {/* @ts-ignore */}
                    {item.conteudo}
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'GeneralSans-Medium',
                    color: '#67697A',
                    marginTop: 12,
                  }}>
                  {
                    //@ts-ignore
                    format(new Date(item.timestamp), 'p')
                  }
                </Text>
              </View>
            ) : (
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                  marginBottom: 10,
                  paddingHorizontal: 20,
                  marginTop: index == 0 ? 10 : 0,
                }}>
                {index == 0 ||
                  (!isSameDay(
                    //@ts-ignore
                    parseISO(item.timestamp),
                    //@ts-ignore
                    parseISO(mensagens[index - 1].timestamp),
                  ) && (
                    <View
                      key={index}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <View
                        style={{
                          height: 30,
                          marginVertical: 30,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}>
                        <View
                          style={{
                            width: 120,
                            height: 2,
                            backgroundColor: '#7534FF',
                            opacity: 0.1,
                          }}
                        />

                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'GeneralSans-Medium',
                            color: '#7534FF',
                            marginHorizontal: 20,
                          }}>
                          {format(
                            //@ts-ignore
                            parseISO(item.timestamp),
                            "dd 'de' MMM 'de' yyyy",
                            {locale: ptBR},
                          )}
                        </Text>

                        <View
                          style={{
                            width: 120,
                            height: 2,
                            backgroundColor: '#7534FF',
                            opacity: 0.1,
                          }}
                        />
                      </View>
                    </View>
                  ))}

                <View
                  style={{
                    borderTopLeftRadius: 27,
                    borderTopRightRadius: 27,
                    borderBottomLeftRadius: 27,
                    borderBottomRightRadius: 2,
                    backgroundColor: '#7534FF',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 20,
                      marginHorizontal: 20,
                      fontFamily: 'GeneralSans-Medium',
                      color: '#fff',
                      marginVertical: 15,
                    }}>
                    {/* @ts-ignore */}
                    {item.conteudo}
                  </Text>
                </View>

                {index == 0 ||
                  (!isSameMinute(
                    //@ts-ignore
                    parseISO(item.timestamp),
                    //@ts-ignore
                    parseISO(mensagens[index - 1].timestamp),
                  ) && (
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'GeneralSans-Medium',
                        color: '#67697A',
                        marginTop: 2,
                      }}>
                      {
                        //@ts-ignore
                        format(new Date(item.timestamp), 'p')
                      }
                    </Text>
                  ))}
              </View>
            )
          );
        }}
        //@ts-ignore
        onContentSizeChange={() => list.current.scrollToEnd({animated: false})}
      />

      <LinearGradient
        colors={['#0000', '#FFFF', '#FFFF', '#FFFF']}
        style={{
          width: '100%',
          paddingHorizontal: 20,
          alignItems: 'center',
          paddingBottom: 10,
        }}>
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            height: 56,
            borderRadius: 30,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F3F3FA',
            borderWidth: 1,
            borderColor: '#EDE4FF',
          }}>
          <TextInput
            placeholder="Enviar mensagem..."
            onChangeText={setMensage}
            value={mensage}
            placeholderTextColor={'#67697A'}
            style={{
              width: '85%',
              height: 40,
              fontSize: 16,
              color: '#502052',
              fontFamily: 'GeneralSans-Medium',
            }}
          />

          <TouchableOpacity
            onPress={() => {
              if (mensage == '') {
                uploadFile();
              } else {
                //@ts-ignore
                if (conversaInfo.participants == undefined) {
                  firestore()
                    //@ts-ignore
                    .collection(
                      `db/${(city as {city: string}).city}@vozdamulher/chats`,
                    )
                    .add({
                      participants: [`${auth().currentUser?.uid}`],
                      //@ts-ignore
                      dataAtualizacao: new Date().toISOString(),
                      //@ts-ignore
                      ultimaMensagem: mensage,
                    })
                    .then(docRef => {
                      firestore()
                        //@ts-ignore
                        .collection(
                          `db/${
                            (city as {city: string}).city
                          }@vozdamulher/chats/${docRef.id}/messages`,
                        )
                        .add({
                          //@ts-ignore
                          conteudo: mensage,
                          //@ts-ignore
                          timestamp: new Date().toISOString(),
                          remetente: user,
                          visualizada: false,
                        });
                    });
                } else {
                  firestore()
                    //@ts-ignore
                    .collection(
                      `db/${
                        (city as {city: string}).city
                      }@vozdamulher/chats/${conversasId}/messages`,
                    )
                    .add({
                      //@ts-ignore
                      conteudo: mensage,
                      //@ts-ignore
                      timestamp: new Date().toISOString(),
                      remetente: user,
                    });
                }

                setMensage('');

                if (scrollViewRef.current) {
                  //@ts-ignore
                  scrollViewRef.current.scrollToEnd({animated: false});
                }
              }
            }}
            style={{
              width: 58,
              height: 44,
              borderRadius: 30,
              backgroundColor: mensage == '' ? '#F3F3FA' : '#7534FF',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {mensage == '' ? (
              <Text>de</Text>
            ) : (
              <IconSend width={24} height={24} />
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
