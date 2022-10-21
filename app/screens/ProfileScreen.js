import React from 'react'
import { SafeAreaView, View, Image } from 'react-native'
import colors from '../config/colors'
import LayoutView from '../view/LayoutView'
import MyAppText from '../view/MyAppText'

function ProfileScreen() {
    return (
        <SafeAreaView style={{ flex: 1}}>
            <MyAppText style={{alignSelf: 'center', margin: 20, fontSize: 25}}>Tom</MyAppText>
            <View
                style={{
                    flex: 1,
                    // backgroundColor: ,
                    // margin: 20,
                    marginHorizontal: 20,
                    marginBottom: 20,
                    // padding: 30,
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: colors.primary,
                }}
            >
                <LayoutView vertical margin={30} spacing={30}>
                    <Image
                        style={{
                            width: 150,
                            height: 150,
                            backgroundColor: colors.loading,
                            borderRadius: 15,
                            
                        }}
                    ></Image>
                </LayoutView>

            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen
