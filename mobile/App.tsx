import { StatusBar } from 'expo-status-bar';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

import { 
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree';

import blurBg from './src/assets/bg-blur.png'
import Stripes from './src/assets/stripes.svg'
import NlwLogo from './src/assets/nlw-spacetime-logo.svg'

const StyledStripes = styled(Stripes)

export default function App() {
  const [hasFontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })

  if(!hasFontsLoaded) {
    return null
  }

  
  return (
    <ImageBackground 
      source={blurBg}
      className="bg-gray-900 flex-1 items-center justify-center px-8 py-10"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >

      <StyledStripes
        className="absolute left-2"
      />

      <View className="flex-1 items-center justify-center gap-6">
        <NlwLogo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">Sua cápsula do tempo</Text>
          <Text className="text-center font-body text-base leading-relaxe text-gray-100">Colecione momentos marcantes da sua jornada e compartilhe (se quiser) 
            com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
        >
          <Text className="font-alt text-sm upercase text-black">Cadastrar lembrança</Text>
        </TouchableOpacity>
      </View>

      <Text 
        className="text-cent font-body text-sm leading-relaxe text-gray-200"
      >
        Feito com 💜 no NLW da Rocketseat
      </Text>
      <StatusBar style="light" translucent/>
    </ImageBackground>
  );
}
