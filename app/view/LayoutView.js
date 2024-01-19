import React from 'react'
import { View, Text } from 'react-native'

function LayoutView({ 
    children, 
    margin = 0, 
    spacing = 0, 
    vertical, 
    horizontal,
    style,
    ...props
    }) {
    const lastChildIndex = React.Children.count(children) - 1
    return (
        <View style={{
            // flex: 1,
            margin: margin,
            flexDirection: vertical || !horizontal ? 'column' : 'row',
            ...style
            
        }}>
            { React.Children.map(children, (child, i) => (
                React.cloneElement(child, {
                    style: {
                        ...child.props.style, 
                        ...child.props.fill ? { marginTop: -margin, marginHorizontal: -margin, paddingTop: margin, paddingHorizontal: margin } : {},
                        ...vertical || !horizontal 
                        ? { marginBottom: i != lastChildIndex ? spacing : 0 } 
                        : { marginRight:  i != lastChildIndex ? spacing : 0 }
                    },
                    ...props
                })
            )) }
        </View>
    )
}



export default LayoutView