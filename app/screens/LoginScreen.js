import React, { useEffect } from 'react'
import { TextInput, Button } from 'react-native'
import MySafeAreaView from '../view/MySafeAreaView'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SplashScreen from 'expo-splash-screen'
import { useAppContext } from '../../AppContext'
import { useNavigation } from '@react-navigation/native'
import MyAppText from '../view/MyAppText'
import LayoutView from '../view/LayoutView'
import ListView from '../view/ListView'

function LoginScreen({ }) {

    const navigation = useNavigation()

    const { manager } = useAppContext()

    const [email   , setEmail   ] = React.useState('')
    const [password, setPassword] = React.useState('')

    useEffect(() => {
        AsyncStorage.getItem('@user.token').then(token => {
            if (token !== null) navigation.navigate('Init')
            SplashScreen.hideAsync()
        }).catch(console.warn)
    }, [])


    return (
        <MySafeAreaView>
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
                    onChangeText={setEmail}
                    value={email}
                />
                <ListView title='Password' initExpand={false} disable />
                <TextInput
                    style={{margin: 30, paddingBottom: 10, color: 'white', borderBottomColor: 'white', borderBottomWidth: 1}}
                    onChangeText={setPassword}
                    value={password}
                />
                <Button title='Submit' onPress={async () => {
                    if (await manager.login(email, password)) {
                        console.log('登錄成功')
                        navigation.reset({routes: [{ name: 'Init' }]})
                        return 
                    }
                    console.log('登錄失敗')
                    setPassword('')
                }}/>
                
            </LayoutView>
        </MySafeAreaView>
    )
}

export default LoginScreen