import React from 'react';
import { Text } from 'react-native'

function MyAppText({ children, style }) {
    return (
        <Text style={{fontFamily: 'Cascadia-Code', color: 'white', ...style}}>
            { children }
        </Text>
    );
}

export default MyAppText;