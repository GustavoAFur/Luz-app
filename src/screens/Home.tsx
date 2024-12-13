import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import auth from '@react-native-firebase/auth';

import IconArrowRight from '../../assets/svg/arrow-up-right.svg';
import IconNotification from '../../assets/svg/notification.svg';
import IconNotificationWhite from '../../assets/svg/notification-w.svg';
import IconAdd from '../../assets/svg/add.svg';
import IconPointDown from '../../assets/svg/point-down.svg';
import NightQuestionImage from '../../assets/svg/night-question.svg';
import BackgroundDay from '../../assets/svg/day-background.svg';
import BackgroundNight from '../../assets/svg/night-background.svg';

import {useAuth} from '../hooks/auth';
import {useState} from 'react';

export function Home({navigation}: {navigation: any}) {
  const {width, height} = Dimensions.get('window');
  const {city, userRegistration} = useAuth();

  const imgs: {[key: string]: any} = {
    chris: require('../../assets/img/chris.png'),
    mattew: require('../../assets/img/mattew.png'),
    ed: require('../../assets/img/ed.png'),
    justin: require('../../assets/img/justin.png'),
  };

  const [manifestations, setManifestations] = useState<any>([]);

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{}}
      style={{
        backgroundColor: '#ffff',
      }}>
      <StatusBar
        translucent
        backgroundColor={'#00000000'}
        barStyle={'dark-content'}
      />

      <View
        style={{
          width: '100%',
        }}>
        <View
          style={{
            marginTop: getStatusBarHeight() + 24,
            paddingHorizontal: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                borderWidth: 2,
                borderColor:
                  new Date().getHours() >= 5 && new Date().getHours() < 18
                    ? '#FFD164'
                    : '#3E4F7E',
                backgroundColor:
                  new Date().getHours() >= 5 && new Date().getHours() < 18
                    ? '#FFFFFF'
                    : '#B4BEDC',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
              }}>
              <View
                style={{
                  backgroundColor:
                    new Date().getHours() >= 5 && new Date().getHours() < 18
                      ? '#FFE6A9'
                      : '#7685B0',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  borderRadius: 120,
                }}>
                <Image
                  source={imgs[`${(userRegistration as {img: string}).img}`]}
                  resizeMode="contain"
                  style={{
                    width: 34,
                    height: 34,
                  }}
                />
              </View>
            </View>

            <View
              style={{
                marginLeft: 12,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'GeneralSans-Medium',
                  color:
                    new Date().getHours() >= 5 && new Date().getHours() < 18
                      ? '#0F1121'
                      : '#FFFFFF',
                  opacity: 0.5,
                }}>
                {new Date().getHours() >= 5 && new Date().getHours() < 12
                  ? 'Bom dia,'
                  : new Date().getHours() >= 12 && new Date().getHours() < 18
                  ? 'Boa tarde,'
                  : 'Boa noite,'}
              </Text>

              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'GeneralSans-Semibold',
                  color:
                    new Date().getHours() >= 5 && new Date().getHours() < 18
                      ? '#0F1121'
                      : '#FFFFFF',
                  opacity: 0.9,
                }}>
                {auth().currentUser?.displayName ?? 'Bem vindo(a)!'}
              </Text>
            </View>
          </View>

          <Pressable
            style={{
              width: 42,
              height: 42,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('Notifications')}>
            {new Date().getHours() >= 5 && new Date().getHours() < 18 ? (
              <IconNotification />
            ) : (
              <IconNotificationWhite />
            )}
          </Pressable>
        </View>

        <View
          style={{
            marginTop: 24,
            zIndex: 1,
          }}>
          <View
            style={{
              paddingHorizontal: 30,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'GeneralSans-Semibold',
                color:
                  new Date().getHours() >= 5 && new Date().getHours() < 18
                    ? '#0F1121'
                    : '#FFFFFF',
                opacity: 0.9,
              }}>
              Ações rápidas
            </Text>
          </View>
        </View>

        <View
          style={{
            zIndex: 1,
            paddingHorizontal: 30,
            flexDirection: 'row',
            gap: 20,
            marginTop: 16,
            alignSelf: 'center',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          <Pressable
            onPress={() => navigation.navigate('AnonymousReport')}
            style={{
              width: '46%',
              height: 140,
              borderRadius: 12,
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor:
                new Date().getHours() >= 5 && new Date().getHours() < 18
                  ? '#FFF1DB'
                  : '#E2EAFF',
              padding: 16,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 44,
                  backgroundColor:
                    new Date().getHours() >= 5 && new Date().getHours() < 18
                      ? '#FFFAF2'
                      : '#FFFAF2',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../../assets/img/anonimo.png')}
                  resizeMode="contain"
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </View>

              <IconArrowRight
                style={{
                  opacity: 0.9,
                }}
              />
            </View>

            <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                fontFamily: 'GeneralSans-Medium',
                color: '#383530',
              }}>
              Denúncias anônimas
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('Manifestation')}
            style={{
              width: '46%',
              height: 140,
              borderRadius: 12,
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor:
                new Date().getHours() >= 5 && new Date().getHours() < 18
                  ? '#FFF1DB'
                  : '#E2EAFF',
              padding: 16,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 44,
                  backgroundColor:
                    new Date().getHours() >= 5 && new Date().getHours() < 18
                      ? '#FFFAF2'
                      : '#FFFAF2',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../../assets/img/lamp.png')}
                  resizeMode="contain"
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </View>

              <IconArrowRight
                style={{
                  opacity: 0.9,
                }}
              />
            </View>

            <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                fontFamily: 'GeneralSans-Medium',
                color: '#383530',
              }}>
              Manifestação
            </Text>
          </Pressable>
        </View>

        <View
          style={{
            width: '100%',
            height: 275,
            position: 'absolute',
            top: 0,
            zIndex: 0,
            backgroundColor:
              new Date().getHours() >= 5 && new Date().getHours() < 18
                ? '#FFDAA9'
                : '#536493',
            overflow: 'hidden',
            alignSelf: 'center',
          }}>
          {new Date().getHours() >= 5 && new Date().getHours() < 18 ? (
            <BackgroundDay width={width} height={305} />
          ) : (
            <BackgroundNight width={width} height={305} />
          )}
        </View>
      </View>

      <View
        style={{
          width: '100%',
          paddingHorizontal: 30,
          marginTop: 24,
        }}>
        <View
          style={{
            width: '100%',
            borderRadius: 12,
            backgroundColor: '#FFE7C8',
            padding: 24,
            flexDirection: 'row',
            gap: 16,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 44,
              backgroundColor: '#FECA8A',
            }}
          />

          <View
            style={{
              width: 165,
              gap: 4,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'GeneralSans-Semibold',
                color: '#383530',
              }}>
              Yuna Takahashi
            </Text>

            <Text
              style={{
                fontSize: 12,
                fontFamily: 'GeneralSans-Regular',
                color: '#383530',
              }}>
              Yuna Takahashi
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'GeneralSans-Medium',
                color: '#C27373',
              }}>
              -2
            </Text>

            <IconPointDown
              style={{
                marginTop: 2,
              }}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: 24,
        }}>
        <View
          style={{
            paddingHorizontal: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'GeneralSans-Semibold',
              color: '#383530',
            }}>
            Apenas para você
          </Text>

          <Text
            style={{
              fontSize: 14,
              fontFamily: 'GeneralSans-Medium',
              color: '#EA9B58',
            }}>
            Ver tudo
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            marginTop: 16,
            paddingRight: 30,
          }}>
          <View
            style={{
              height: 38,
              borderRadius: 30,
              backgroundColor: '#FFF1DB',
              marginLeft: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 18,
                fontFamily: 'GeneralSans-Medium',
                color: '#63605C',
                marginHorizontal: 16,
              }}>
              Todas
            </Text>
          </View>

          <View
            style={{
              height: 38,
              borderRadius: 30,
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#F0E6DF',
              marginLeft: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 18,
                fontFamily: 'GeneralSans-Medium',
                color: '#383530',
                marginHorizontal: 16,
              }}>
              Solicitações enviadas
            </Text>
          </View>

          <View
            style={{
              height: 38,
              borderRadius: 30,
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#F0E6DF',
              marginLeft: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 18,
                fontFamily: 'GeneralSans-Medium',
                color: '#383530',
                marginHorizontal: 16,
              }}>
              Em Analíse
            </Text>
          </View>

          <View
            style={{
              height: 38,
              marginRight: 30,
              borderRadius: 30,
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#F0E6DF',
              marginLeft: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 18,
                fontFamily: 'GeneralSans-Medium',
                color: '#383530',
                marginHorizontal: 16,
              }}>
              Solicitações Respondidas
            </Text>
          </View>
        </ScrollView>

        <FlatList
          style={{
            marginTop: 16,
          }}
          data={manifestations}
          horizontal
          contentContainerStyle={{
            paddingHorizontal: 30,
            gap: 30,
          }}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View
              style={{
                width: 250,
                height: 130,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#E5EBF2',
                backgroundColor: '#F9FCFF',
                borderStyle: 'dashed',
                padding: 16,
              }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  backgroundColor: '#E0EFFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IconAdd width={20} height={20} />
              </View>
            </View>
          )}
          renderItem={({item}) => (
            <View
              style={{
                width: 300,
                height: 130,
                borderRadius: 12,
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#F3F3FA',
                padding: 16,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: '100%',
                  height: 32,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: 48,
                    height: 32,
                  }}
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Enel_Group_logo.svg/2560px-Enel_Group_logo.svg.png',
                  }}
                />

                <View
                  style={{
                    height: 32,
                    borderRadius: 30,
                    backgroundColor: 'rgba(255, 205, 76, 0.1)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 12,
                      fontFamily: 'GeneralSans-Medium',
                      color: 'rgba(240, 175, 7, 1)',
                      marginHorizontal: 14,
                    }}>
                    Em processamento
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 14,
                  fontFamily: 'GeneralSans-Medium',
                  color: '#0F1121',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 14,
                    fontFamily: 'GeneralSans-Semibold',
                    color: '#0F1121',
                  }}>
                  Nota:werewrew d
                </Text>{' '}
                Minha energia ainda não voltou...
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 14,
                      fontFamily: 'GeneralSans-Semibold',
                      color: '#0F1121',
                    }}>
                    4h
                  </Text>

                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 11,
                      fontFamily: 'GeneralSans-Medium',
                      color: '#67697A',
                      marginLeft: 2,
                    }}>
                    /p resposta
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 14,
                    fontFamily: 'GeneralSans-Semibold',
                    color: '#0F1121',
                  }}>
                  Falta de energia
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      <View
        style={{
          width: '100%',
          paddingHorizontal: 30,
          marginTop: 24,
        }}>
        <Pressable
          onPress={() => navigation.navigate('Chat')}
          style={{
            width: '100%',
            height: 125,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
          }}>
          <NightQuestionImage width={width} height={300} />
        </Pressable>
      </View>

      <View
        style={{
          marginVertical: 24,
        }}>
        <View
          style={{
            paddingHorizontal: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'GeneralSans-Semibold',
              color: '#383530',
            }}>
            Área Informativa
          </Text>
        </View>

        <FlatList
          style={{
            marginTop: 16,
          }}
          data={[
            {
              id: 1,
              title:
                'Lia Gomes aborda trabalho da Procuradoria da Mulher durante sessão.',
              description:
                'A parlamentar destacou a recente inauguração de Procuradoria da Mulher no município de Canindé...',
              tags: ['Lia Gomes', 'Procuradoria da Mulher'],
              image:
                'https://www.al.ce.gov.br//storage/noticias/46696/imagem/8MIOCw0lCPPQkuU7HEjCReK8RwvA9cXnEWBoqlCk.jpg',
            },
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View
              style={{
                width: 210,
                height: 130,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#F0E6DF',
                backgroundColor: '#FCFBFF',
                borderStyle: 'dashed',
                marginLeft: 30,
                padding: 16,
              }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  backgroundColor: '#EDE4FF',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IconAdd width={20} height={20} />
              </View>
            </View>
          )}
          contentContainerStyle={{
            paddingHorizontal: 30,
            gap: 30,
          }}
          renderItem={({item}) => (
            <View
              style={{
                width: 250,
              }}>
              <View
                style={{
                  width: 250,
                  height: 150,
                  borderRadius: 12,
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  borderColor: '#F3F3FA',
                  overflow: 'hidden',
                  justifyContent: 'space-between',
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  resizeMode="cover"
                  source={{uri: item.image}}
                />

                <View
                  style={{
                    width: '100%',
                    height: 32,
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 1,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginVertical: 8,
                    marginHorizontal: 12,
                    gap: 8,
                  }}>
                  {item.tags.map((tag: string, index) => (
                    <View
                      key={index}
                      style={{
                        height: 28,
                        borderRadius: 30,
                        backgroundColor: '#F0E6DF',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          lineHeight: 12,
                          fontFamily: 'GeneralSans-Medium',
                          color: '#63605C',
                          marginHorizontal: 14,
                        }}>
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              <View
                style={{
                  marginTop: 14,
                  alignItems: 'flex-start',
                  gap: 4,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 16,
                      fontFamily: 'GeneralSans-Medium',
                      color: '#383530',
                    }}>
                    {item.title}
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 16,
                    fontFamily: 'GeneralSans-Regular',
                    color: '#383530',
                    opacity: 0.6,
                  }}>
                  {item.description}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}
