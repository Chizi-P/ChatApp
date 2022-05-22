import React from 'react';
import { Text } from 'react-native'

function MyAppText({ children, style }) {
    return (
        <Text style={{fontFamily: 'Cascadia-Code', ...style}}>
            { children }
        </Text>
    );
}

export default MyAppText;