import AsyncStorage from '@react-native-async-storage/async-storage';

const keyOfChatRecords = '@chatRecords'

export const UpdateReceivedChatRecords = async (sender, content) => {
    console.log('Update Received Chat Records')
    console.log('received by', sender, content)
    const chatRecords = JSON.parse(await AsyncStorage.getItem(keyOfChatRecords))
    chatRecords.received[sender] ??= []
    chatRecords.received[sender].push(content)
    await AsyncStorage.setItem(keyOfChatRecords, JSON.stringify(chatRecords))
    return chatRecords
}

export const UpdateSentChatRecords = async (receiver, content) => {
    console.log('Update Sent Chat Records')
    console.log('sent to', receiver, content)
    const chatRecords = JSON.parse(await AsyncStorage.getItem(keyOfChatRecords))
    chatRecords.sent[receiver] ??= []
    chatRecords.sent[receiver].push(content)
    await AsyncStorage.setItem(keyOfChatRecords, JSON.stringify(chatRecords))
    return chatRecords
}