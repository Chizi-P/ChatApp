import React from 'react'
import { SafeAreaView } from 'react-native'
import ProfileScreen from './ProfileScreen'
import ListView from '../view/ListView'
import MyAppText from '../view/MyAppText'
import ListItemView from '../view/ListItemView'

function TestScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ListView>
                <MyAppText style={{
                    fontSize: 18,
                }}>TITLE</MyAppText>
                <ListItemView highlight>2</ListItemView>
                <MyAppText>3</MyAppText>
            </ListView>
        </SafeAreaView>
    )
}

export default TestScreen
