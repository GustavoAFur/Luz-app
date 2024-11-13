import {
  ScrollView,
  StatusBar,
} from 'react-native'

import { getStatusBarHeight } from 'react-native-status-bar-height'
//components
import {Header} from '../components/Header'
export function Home() {
  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 90,
        paddingTop: getStatusBarHeight() + 24,
      }}
      style={{
        backgroundColor: '#ffff',
      }}>
      <StatusBar
        translucent
        backgroundColor={'#00000000'}
        barStyle={'dark-content'}
      />
      <Header />
    </ScrollView>
  );
}
