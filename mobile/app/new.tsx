import Icon from '@expo/vector-icons/Feather'
import { Link } from 'expo-router'
import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'

import NlwLogo from '../src/assets/nlw-spacetime-logo.svg'

export default function Memories() {
    const { bottom, top } = useSafeAreaInsets()

    const [isPublic, setIsPublic] = useState(false)
    return (
        <ScrollView
            className="flex-1 px-8 mb-4"
            contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
        >
            <View className="flex-row mt-4 items-center justify-between">
                <NlwLogo />

                <Link href="/memories" asChild>
                    <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
                        <Icon name="arrow-left" size={16} color="#FFF" />
                    </TouchableOpacity>
                </Link>
            </View>

            <View className="mt-6 space-y-6">
                <View className="flex-row items-center gap-2">
                    <Switch 
                        value={isPublic} 
                        onValueChange={setIsPublic} 
                        trackColor={{ false: '#767577', true: '#372560' }}
                        thumbColor={isPublic ? '#9b79ea' : '#9e9ea9'}

                    />
                    <Text className="font-body text-base text-gray-200">
                        Tornar memória pública
                    </Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
                >
                    <View className="flex-row items-center gap-2">
                        <Icon name="image" color="#FFF" />
                        <Text className="font-body text-sm text-gray-200">
                            Adicionar foto ou vídeo de capa
                        </Text>
                    </View>
                </TouchableOpacity>

                <TextInput 
                    multiline
                    className="p-0 font-body text-lg text-gray-50"
                    placeholderTextColor="#56565a"
                    placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
                />

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="rounded-full bg-green-500 px-5 py-2 self-end"
                >
                    <Text className="font-alt text-sm upercase text-center text-black">Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}