import React from 'react';
import { SafeAreaView } from 'react-native';
import ProfileScreen from './ProfileScreen'

function TestScreen() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <ProfileScreen/>
        </SafeAreaView>
    );
}

export default TestScreen;