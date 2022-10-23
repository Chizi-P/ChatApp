import React from 'react'
import { View, Text } from 'react-native'
import MyAppText from './MyAppText'

function ListItemView({ highlight, children }) {
    return (
        <MyAppText
            style={{
                fontSize: 18,
                backgroundColor: highlight ? 'white' : 'black',
                alignSelf: 'flex-start',
                color: highlight ? 'black' : 'white',
                paddingHorizontal: 4,
                paddingVertical: 2,
                overflow: 'hidden',
                borderRadius: 2
            }}
        >
            {children}
        </MyAppText>
    )
}

export default ListItemView
