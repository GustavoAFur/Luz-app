import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import auth from '@react-native-firebase/auth'

import IconArrowRight from '../../assets/svg/arrow-up-right.svg'
import IconNotification from '../../assets/svg/notification.svg'
import IconAdd from '../../assets/svg/add.svg'
import IconTickCircle from '../../assets/svg/tick-circle.svg'
import BackgroundImage from '../../assets/svg/8503139.svg'

import { useAuth } from '../hooks/auth'
import { useState } from 'react'

export function Home({ navigation }: { navigation: any }) {

  const { city, userRegistration } = useAuth()

  const imgs: { [key: string]: any } = {
    women1: require('../../assets/img/women-1.png'),
    women2: require('../../assets/img/women-2.png'),
    women3: require('../../assets/img/women-3.png'),
    women4: require('../../assets/img/women-4.png'),
  }

  const [manifestations, setManifestations] = useState<any>([])

  return (
    <ScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}
      contentContainerStyle={{
      }}
      style={{
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
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              borderWidth: 2,
              borderColor: '#0077FF',
              backgroundColor: '#FFFF',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 2,
            }}
          >

            <View style={{
              backgroundColor: '#E0EFFF',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              borderRadius: 120,
            }}>
              <Image
                source={imgs[`${(userRegistration as { img: string }).img}`]}
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                }}
              />
            </View>
          </View>

          <View style={{
            marginLeft: 12,
            justifyContent: 'space-between'
          }}>

            <Text style={{
              fontSize: 13,
              fontFamily: 'GeneralSans-Medium',
              color: '#67697A',
            }}>
              {new Date().getHours() >= 5 && new Date().getHours() < 12 ? 'Bom dia,' : new Date().getHours() >= 12 && new Date().getHours() < 18 ? 'Boa tarde,' : 'Boa noite,'}
            </Text>

            <Text style={{
              fontSize: 15,
              fontFamily: 'GeneralSans-Semibold',
              color: '#0F1121',
            }}>
              {auth().currentUser?.displayName ?? 'Bem vindo(a)!'}
            </Text>


          </View>
        </View>

        <Pressable style={{
          width: 42,
          height: 42,
          alignItems: 'center',
          justifyContent: 'center',
        }}
          onPress={() => navigation.navigate('Notifications')}
        >

          <IconNotification />
        </Pressable>
      </View>

      <View style={{
        marginTop: 24,
      }}>
        <View style={{
          paddingHorizontal: 30,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Text style={{
            fontSize: 16,
            fontFamily: 'GeneralSans-Semibold',
            color: '#0F1121',
          }}>
            Ações rápidas
          </Text>

        </View>
      </View>

      <View style={{
        paddingHorizontal: 30,
        flexDirection: 'row',
        gap: 20,
        marginTop: 16,
        alignSelf: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}>

        <Pressable
          onPress={() => navigation.navigate('AnonymousReport')}
          style={{
            width: '46%',
            height: 140,
            borderRadius: 12,
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#F3F3FA',
            padding: 16,
            justifyContent: 'space-between'
          }}>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <View style={{
              width: 44,
              height: 44,
              borderRadius: 44,
              backgroundColor: '#E0EFFF',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image
                source={require('../../assets/img/anonimo.png')}
                resizeMode='contain'
                style={{
                  width: 24,
                  height: 24,
                }} />

            </View>

            <IconArrowRight style={{
              opacity: 0.9
            }} />

          </View>

          <Text style={{
            fontSize: 14,
            lineHeight: 20,
            fontFamily: 'GeneralSans-Medium',
            color: '#67697A',
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
            borderColor: '#F3F3FA',
            padding: 16,
            justifyContent: 'space-between'
          }}>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <View style={{
              width: 44,
              height: 44,
              borderRadius: 44,
              backgroundColor: '#E0EFFF',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image
                source={require('../../assets/img/lamp.png')}
                resizeMode='contain'
                style={{
                  width: 24,
                  height: 24,
                }} />

            </View>

            <IconArrowRight style={{
              opacity: 0.9
            }} />
          </View>

          <Text style={{
            fontSize: 14,
            lineHeight: 20,
            fontFamily: 'GeneralSans-Medium',
            color: '#67697A',
          }}>
            Manifestação
          </Text>
        </Pressable>

      </View>

      <View style={{
        marginTop: 24,
      }}>
        <View style={{
          paddingHorizontal: 30,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Text style={{
            fontSize: 16,
            fontFamily: 'GeneralSans-Semibold',
            color: '#0F1121',
          }}>
            Apenas para você
          </Text>

          <Text style={{
            fontSize: 14,
            fontFamily: 'GeneralSans-Medium',
            color: '#0077FF',
          }}>
            Ver tudo
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{
          marginTop: 16,
          paddingRight: 30,
        }}>
          <View style={{
            height: 38,
            borderRadius: 30,
            backgroundColor: '#E0EFFF',
            marginLeft: 30,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              fontSize: 12,
              lineHeight: 18,
              fontFamily: 'GeneralSans-Medium',
              color: '#0077FF',
              marginHorizontal: 16
            }}>
              Todas
            </Text>
          </View>

          <View style={{
            height: 38,
            borderRadius: 30,
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#F3F3FA',
            marginLeft: 8,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              fontSize: 12,
              lineHeight: 18,
              fontFamily: 'GeneralSans-Medium',
              color: '#67697A',
              marginHorizontal: 16
            }}>
              Solicitações enviadas
            </Text>
          </View>

          <View style={{
            height: 38,
            borderRadius: 30,
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#F3F3FA',
            marginLeft: 8,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              fontSize: 12,
              lineHeight: 18,
              fontFamily: 'GeneralSans-Medium',
              color: '#67697A',
              marginHorizontal: 16
            }}>
              Em Analíse
            </Text>
          </View>

          <View style={{
            height: 38,
            marginRight: 30,
            borderRadius: 30,
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#F3F3FA',
            marginLeft: 8,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              fontSize: 12,
              lineHeight: 18,
              fontFamily: 'GeneralSans-Medium',
              color: '#67697A',
              marginHorizontal: 16
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
            gap: 30
          }}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={{
              width: 250,
              height: 130,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#E5EBF2',
              backgroundColor: '#F9FCFF',
              borderStyle: 'dashed',
              padding: 16,
            }}>

              <View style={{
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
          renderItem={({ item }) => (
            <View style={{
              width: 300,
              height: 130,
              borderRadius: 12,
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#F3F3FA',
              padding: 16,
              justifyContent: 'space-between'
            }}>
              <View style={{
                width: '100%',
                height: 32,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <Image
                  resizeMode='contain'
                  style={{
                    width: 48,
                    height: 32,
                  }}
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Enel_Group_logo.svg/2560px-Enel_Group_logo.svg.png',
                  }}
                />

                <View style={{
                  height: 32,
                  borderRadius: 30,
                  backgroundColor: 'rgba(255, 205, 76, 0.1)',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Text style={{
                    fontSize: 12,
                    lineHeight: 12,
                    fontFamily: 'GeneralSans-Medium',
                    color: 'rgba(240, 175, 7, 1)',
                    marginHorizontal: 14
                  }}>
                    Em processamento
                  </Text>
                </View>
              </View>

              <Text style={{
                fontSize: 12,
                lineHeight: 14,
                fontFamily: 'GeneralSans-Medium',
                color: '#0F1121',
              }}>


                <Text style={{
                  fontSize: 12,
                  lineHeight: 14,
                  fontFamily: 'GeneralSans-Semibold',
                  color: '#0F1121',
                }}>
                  Nota:werewrew d
                </Text> Minha energia ainda não voltou...
              </Text>

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>

                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <Text style={{
                    fontSize: 14,
                    lineHeight: 14,
                    fontFamily: 'GeneralSans-Semibold',
                    color: '#0F1121',
                  }}>
                    4h
                  </Text>

                  <Text style={{
                    fontSize: 12,
                    lineHeight: 11,
                    fontFamily: 'GeneralSans-Medium',
                    color: '#67697A',
                    marginLeft: 2
                  }}>
                    /p resposta
                  </Text>


                </View>

                <Text style={{
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


      <View style={{
        marginTop: 24,
      }}>
        <View style={{
          paddingHorizontal: 30,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Text style={{
            fontSize: 16,
            fontFamily: 'GeneralSans-Semibold',
            color: '#0F1121',
          }}>
            Aprenda mais sobre a procuradoria
          </Text>

        </View>

        <FlatList
          style={{
            marginTop: 16,
          }}
          data={[
            {
              id: 1,
              title: 'Lia Gomes aborda trabalho da Procuradoria da Mulher durante sessão.',
              description: 'A parlamentar destacou a recente inauguração de Procuradoria da Mulher no município de Canindé...',
              tags: ['Lia Gomes', 'Procuradoria da Mulher'],
              image: 'https://www.al.ce.gov.br//storage/noticias/46696/imagem/8MIOCw0lCPPQkuU7HEjCReK8RwvA9cXnEWBoqlCk.jpg',
            }
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={{
              width: 210,
              height: 130,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#EDE4FF',
              backgroundColor: '#FCFBFF',
              borderStyle: 'dashed',
              marginLeft: 30,
              padding: 16,
            }}>

              <View style={{
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
            gap: 30
          }}
          renderItem={({ item }) => (
            <View style={{
              width: 250,
            }}>
              <View style={{
                width: 250,
                height: 130,
                borderRadius: 12,
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#F3F3FA',
                overflow: 'hidden',
                justifyContent: 'space-between'
              }}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  resizeMode='cover'
                  source={{ uri: item.image }}
                />

              </View>

              <View style={{
                width: '100%',
                height: 32,
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginVertical: 12,
                gap: 12
              }}>

                {item.tags.map((tag: string, index) => (
                  <View key={index} style={{
                    height: 32,
                    borderRadius: 30,
                    backgroundColor: '#E0EFFF',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Text style={{
                      fontSize: 10,
                      lineHeight: 12,
                      fontFamily: 'GeneralSans-Medium',
                      color: '#0077FF',
                      marginHorizontal: 14
                    }}>
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={{
                alignItems: 'flex-start',
                gap: 4,
                justifyContent: 'space-between'
              }}>

                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <Text style={{
                    fontSize: 14,
                    lineHeight: 16,
                    fontFamily: 'GeneralSans-Medium',
                    color: '#0F1121',
                  }}>
                    {item.title}
                  </Text>


                </View>

                <Text style={{
                  fontSize: 12,
                  lineHeight: 16,
                  fontFamily: 'GeneralSans-Regular',
                  color: '#67697A',
                }}>
                  {item.description}
                </Text>
              </View>
            </View>
          )}
        />

      </View>

      <View
      
      style={{
        width: '100%',
        paddingVertical: 24,
        marginTop: 32,
        paddingHorizontal: 30,
        backgroundColor: '#E0EFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden'
      }}>


        <View style={{
          width: '45%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: 8
        }}>
          <Text style={{
            fontSize: 16,
            lineHeight: 18,
            fontFamily: 'GeneralSans-Semibold',
            color: '#0077FF',
          }}>
            Seus direitos na palma da sua mão.
          </Text>

          <Text style={{
            fontSize: 12,
            fontFamily: 'GeneralSans-Regular',
            color: '#3B4C56',
          }}>
            Agora mais completo para você mulher.
          </Text>

          <View style={{
            width: '100%',
            gap: 12,
            marginTop: 12,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 8
            }}>
              <IconTickCircle width={18} height={18} />

              <Text style={{
                fontSize: 12,
                fontFamily: 'GeneralSans-Regular',
                color: '#3B4C56',
              }}>
                Chat de vídeo e texto
              </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 8
            }}>
              <IconTickCircle width={18} height={18} />

              <Text style={{
                fontSize: 12,
                fontFamily: 'GeneralSans-Regular',
                color: '#3B4C56',
              }}>
                Suporte com uma especialista.
              </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 8
            }}>
              <IconTickCircle width={18} height={18} />

              <Text style={{
                fontSize: 12,
                fontFamily: 'GeneralSans-Regular',
                color: '#3B4C56',
              }}>
                Mais de 20 vídeos para você conher mais.
              </Text>
            </View>
          </View>
        </View>

        <Image
          source={require('../../assets/img/162563.png')}
          resizeMode='contain'
          style={{
            width: 210,
            height: 210,
            position: 'absolute',
            right: -5
          }} />

        <BackgroundImage
          style={{
            position: 'absolute',
            zIndex: -1,
            right: 0,
            left: -40,
            opacity: 0.95,
            width: '250%',
            height: '250%',
          }}
        />

      </View>


    </ScrollView>
  );
}
