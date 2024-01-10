import React, { useEffect } from 'react'
import { SafeAreaView, TextInput, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SplashScreen from 'expo-splash-screen';
import { useAppContext } from '../../AppContext'
import { useNavigation } from '@react-navigation/native'
import MyAppText from '../view/MyAppText'
import LayoutView from '../view/LayoutView'
import ListView from '../view/ListView'

function LoginScreen({ }) {

    const navigation = useNavigation()

    const { manager, user } = useAppContext()

    const [email, onChangeEmail] = React.useState('')
    const [password, onChangePassword] = React.useState('')

    useEffect(() => {
        AsyncStorage.getItem('@user.token', (err, token) => {
            if (err) console.warn(err)
            if (token) {
                navigation.navigate('Init')
                return
            }
            SplashScreen.hideAsync()
        })
    }, [])


    return (
        <SafeAreaView>
            <LayoutView
                vertical
                // margin={15}
                spacing={20}

                style={{
                    // justifyContent: 'space-between',
                    // alignItems: 'center',
                }}
            >
                <ListView title='Email' initExpand={false} disable />
                <TextInput
                    style={{margin: 30, paddingBottom: 10, color: 'white', borderBottomColor: 'white', borderBottomWidth: 1}}
                    onChangeText={onChangeEmail}
                    value={email}
                />
                <ListView title='Password' initExpand={false} disable />
                <TextInput
                    style={{margin: 30, paddingBottom: 10, color: 'white', borderBottomColor: 'white', borderBottomWidth: 1}}
                    onChangeText={onChangePassword}
                    value={password}
                />
                <Button title='Submit' onPress={async () => {
                    if (await manager.login(email, password)) {
                        console.log('登錄成功')
                        navigation.navigate('Init')
                    }
                    console.log('登錄失敗')
                }}/>
                
            </LayoutView>
        </SafeAreaView>
    )
}

export default LoginScreen