import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'
import LayoutView from '../view/LayoutView';
import ItemView from '../view/ItemView'
import ListView from '../view/ListView'
import ToggleView from '../view/ToggleView'
import { useAppContext } from '../../AppContext';

function SettingScreen() {

    const { manager } = useAppContext()
    const navigator = useNavigation()

    return (
        <SafeAreaView>
            <ListView title='SETTING'>
                <ItemView text='logout' onPress={() => {
                    manager.logout()
                    navigator.navigate('Login')
                }}/>
                <ToggleView title='test'/>
            </ListView>
        </SafeAreaView>
    )
}

export default SettingScreen