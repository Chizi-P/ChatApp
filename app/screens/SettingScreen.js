import React from 'react'
import { useNavigation } from '@react-navigation/native'
import MySafeAreaView from '../view/MySafeAreaView'
import LayoutView from '../view/LayoutView';
import ItemView from '../view/ItemView'
import ListView from '../view/ListView'
import ToggleView from '../view/ToggleView'
import { useAppContext } from '../../AppContext';

function SettingScreen() {

    const { manager } = useAppContext()
    const navigator = useNavigation()

    return (
        <MySafeAreaView>
            <ListView title='SETTING'>
                <ItemView text='logout' onPress={() => {
                    manager.logout()
                    navigator.navigate('Login')
                }}/>
                <ToggleView title='test'/>
            </ListView>
        </MySafeAreaView>
    )
}

export default SettingScreen