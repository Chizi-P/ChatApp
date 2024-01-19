import React from 'react';
import { SafeAreaView, Platform, StatusBar } from 'react-native'

function MySafeAreaView({ children, style }) {
    return (
        <SafeAreaView style={{ 
            flex: 1, 
            paddingTop: 
            Platform.select({ios: 0, android: StatusBar.currentHeight}), 
            ...style
        }}>
            { children }
        </SafeAreaView>
    );
}

export default MySafeAreaView;