import React from 'react'
import MyAppText from '../MyAppText';
import { View, Text } from 'react-native'
import LayoutView from '../LayoutView';
import { chatConfig } from '../../config/chatConfig'

function ARecordView({record}) {

    return (
        record.sender !== chatConfig.userId
            ? <Received record={record}/>
            : <Sent record={record}/>
    )
}

function Sent({record}) {
    return (
        <LayoutView vertical style={{paddingVertical: 5}}>
            <LayoutView horizontal spacing={10} style={{justifyContent: 'flex-end', alignSelf: 'flex-end'}}>
                <MyAppText style={{textAlign: 'right', width: '80%'}}>
                    {record.content}
                </MyAppText>
                <VerticalLine style={{backgroundColor: 'dodgerblue'}}/>
            </LayoutView>
        </LayoutView>
    )
}

<Text style={{textAlign: 'right'}} ></Text>

function Received({record}) {
    return (
        <LayoutView vertical style={{paddingVertical: 5}}>
            <LayoutView horizontal spacing={10} style={{justifyContent: 'flex-start', alignSelf: 'flex-start'}}>
                <VerticalLine style={{backgroundColor: 'royalblue'}}/>
                <MyAppText style={{textAlign: 'left', width: '80%'}}>
                    {record.content}
                </MyAppText>
            </LayoutView>
        </LayoutView>
    )
}

function VerticalLine({ style }) {
    return (
        <View style={{width: 5, backgroundColor: 'gray', borderRadius: '25%', ...style}}></View>
    )
}

export default ARecordView;