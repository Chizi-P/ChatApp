import React from 'react'
import { View, Text } from 'react-native'
import MySafeAreaView from '../view/MySafeAreaView'
import ProfileScreen from './ProfileScreen'
import ListView from '../view/ListView'
import MyAppText from '../view/MyAppText'
import colors from '../config/colors'
import LayoutView from '../view/LayoutView'
import MyText from '../view/MyText'

function TestScreen() {
    return (
        <MySafeAreaView style={{ backgroundColor: 'white' }}>
            <LayoutView margin={20} spacing={25}>

                <MyText type='title'>Messages</MyText>

                <LayoutView style={{
                    backgroundColor: colors.cardBackground,
                    width: 100,
                    // height: 100,
                    borderRadius: 20,
                    width: '100%',
                    padding: 20
                }} spacing={10}>
                    <MyText>Messages</MyText>
                </LayoutView>

                {/* <View style={{
                    backgroundColor: colors.cardBackground,
                    width: 100,
                    height: 100,
                    borderRadius: 30
                }}>
                </View> */}
                
            </LayoutView>
        </MySafeAreaView>
    )
}

export default TestScreen
