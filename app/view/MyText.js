import React from 'react';
import { Text } from 'react-native'
import colors from '../config/colors'

function MyText({ children, type = 'content', style, ...props}) {

    const size 
        = type === 'title'   ? 32 
        : type === 'content' ? 18 
        : 10

    return (
        <Text style={{
            fontFamily: 'JetBrainsMono-Medium', 
            fontSize: size, 
            color: colors.text, 
            ...style
        }} {...props}>
            { children }
        </Text>
    );
}

export default MyText