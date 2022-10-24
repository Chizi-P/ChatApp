import React from 'react'
import { SafeAreaView } from 'react-native'
import ItemView from '../view/ItemView'
import ListView from '../view/ListView'

function SettingScreen() {
    return (
        <SafeAreaView>
            <ListView title='SETTING' >
                <ItemView>Can receive messages</ItemView>
                <ItemView>2</ItemView>
                <ItemView>H</ItemView>
                <ItemView>H</ItemView>
            </ListView>
        </SafeAreaView>
    )
}

export default SettingScreen