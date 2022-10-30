import React from 'react';
import { Text } from 'react-native'

function MyAppText({ children, style, ...props}) {
    return (
        <Text style={{fontFamily: 'Cascadia-Code', color: 'white', ...style}} {...props}>
            { children }
        </Text>
    );
}

export default MyAppText;