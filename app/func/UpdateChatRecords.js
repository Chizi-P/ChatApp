import AsyncStorage from '@react-native-async-storage/async-storage';

const keyOfChatRecords = '@chatRecords'

export const UpdateReceivedChatRecords = async (sender, data) => {
    console.log('Update Received Chat Records')
    console.log('received by', sender, data)
    const chatRecords = JSON.parse(await AsyncStorage.getItem(keyOfChatRecords))
    chatRecords.received[sender] ??= []
    chatRecords.received[sender].push(data)
    await AsyncStorage.setItem(keyOfChatRecords, JSON.stringify(chatRecords))
    return chatRecords
}

export const UpdateSentChatRecords = async (receiver, data) => {
    console.log('Update Sent Chat Records')
    console.log('sent to', receiver, data)
    const chatRecords = JSON.parse(await AsyncStorage.getItem(keyOfChatRecords))
    chatRecords.sent[receiver] ??= []
    chatRecords.sent[receiver].push(data)
    await AsyncStorage.setItem(keyOfChatRecords, JSON.stringify(chatRecords))
    return chatRecords
}