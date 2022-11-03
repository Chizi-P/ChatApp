import React from 'react'
import { SafeAreaView } from 'react-native'
import ItemView from '../view/ItemView'
import ListView from '../view/ListView'
import ToggleView from '../view/ToggleView'

function SettingScreen() {
    return (
        <SafeAreaView>
            <ListView title='SETTING'>
                <ToggleView/>
            </ListView>
        </SafeAreaView>
    )
}

export default SettingScreen