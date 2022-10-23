import React from 'react'
import { View, Text } from 'react-native'
import MyAppText from './MyAppText'
import LayoutView from './LayoutView'

function ListView({ title = 'TITLE', children }) {
    return (
        <LayoutView spacing={20} margin={20}>
            <TitleView title={title} highlight/>
            <View
                style={{
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    padding: 20,
                    borderColor: 'white',
                    borderWidth: 1,
                    borderRadius: 2
                }}
            >
                <LayoutView>
                    {children}
                </LayoutView>
            </View>
        </LayoutView>
    )
}

const TitleView = ({ title, highlight, style }) => {
    return (
        <View style={style}>
            <Text
                style={{
                    fontSize: 18,
                    backgroundColor: highlight ? 'white' : 'black',
                    alignSelf: 'flex-start',
                    color: highlight ? 'black' : 'white',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    overflow: 'hidden',
                    borderRadius: 2,
                    display: title ? 'flex' : 'none',
                }}
            >
                {title}
            </Text>
        </View>
    )
}



export default ListView
