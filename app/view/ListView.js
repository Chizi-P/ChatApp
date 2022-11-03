import React from 'react'
import {
    View,
    Animated,
    TouchableWithoutFeedback,
    LayoutAnimation,
    Button,
} from 'react-native'
import MyAppText from './MyAppText'
import LayoutView from './LayoutView'
import ItemView from './ItemView'
import ZStack from './ZStack'

function ListView({ title, children }) {
    const [expanded, setExpanded] = React.useState(true)

    return (
        <LayoutView spacing={10} margin={15}>
            <TitleView
                title={'░░ ' + title}
                expanded={expanded}
                setExpanded={setExpanded}
                style={{ display: title && expanded ? 'flex' : 'none' }}
            />
            <View
                style={{
                    flexDirection: 'column',
                    // flexWrap: 'wrap',
                    borderColor: 'white',
                    // borderWidth: 1, // 邊線
                    // borderRadius: 2,
                    borderLeftWidth: 1,
                    
                    marginLeft: 18,
                    backgroundColor: '#111111',
                }}
            >
                <LayoutView spacing={2} margin={expanded ? 20 : 5}>
                    {expanded ? (
                        children
                    ) : (
                        <TitleView
                            title={title}
                            highlight
                            expanded={expanded}
                            setExpanded={setExpanded}
                            style={{ display: expanded ? 'none' : 'flex' }}
                        />
                    )}
                </LayoutView>
            </View>
        </LayoutView>
    )
}

const TitleView = ({ title, highlight, expanded, setExpanded, ...props }) => {
    return (
        <ItemView
            text={title}
            highlight={highlight}
            style={props.style}
            onPress={() => {
                LayoutAnimation.configureNext({
                    duration: 700,
                    create: {
                        type: LayoutAnimation.Types.easeOut,
                        property: LayoutAnimation.Properties.opacity,
                    },
                    update: {
                        type: LayoutAnimation.Types.spring,
                        springDamping: 0.5,
                    },
                    delete: {
                        type: LayoutAnimation.Types.linear,
                        // springDamping: 0.5,
                        property: LayoutAnimation.Properties.opacity,
                        duration: 100,
                    },
                })
                setExpanded(!expanded)
            }}
        />
    )
}

export default ListView
