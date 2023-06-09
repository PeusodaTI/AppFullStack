import { View, Text, TouchableOpacity } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'

import NlwLogo from '../src/assets/nlw-spacetime-logo.svg'
import { api } from '../src/lib/api'

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/fefe3b624243aee1f260',
};

export default function App() {
  const router = useRouter()
  
  const [request, response, signInWithGitHub] = useAuthRequest(
    {
      clientId: 'fefe3b624243aee1f260',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'spacetime'
      }),
    },
    discovery
  );

  async function handleGitHubOAuthCode(code: string) {
    const response = await api.post('/register', {
      code,
    })

    const { token } = response.data

    await SecureStore.setItemAsync('token', token)

    router.push('/memories')
  }
    
  useEffect(() => {
    /*console.log(makeRedirectUri({
      scheme: 'spacetime'
    }))*/

    if (response?.type === 'success') {
      const { code } = response.params;
      
      handleGitHubOAuthCode(code)
    }
  }, [response]);



  return (
    <View className="flex-1 items-center justify-center px-8 py-10">

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
          onPress={() => signInWithGitHub()}
        >
          <Text className="font-alt text-sm upercase text-black">Cadastrar lembrança</Text>
        </TouchableOpacity>
      </View>

      <Text 
        className="text-cent font-body text-sm leading-relaxe text-gray-200"
      >
        Feito com 💜 no NLW da Rocketseat
      </Text>
      
    </View>
  );
}
