import React, { useState } from "react";
import { Text, View, Header, Input, StyleSheet, TextInput, Dimensions, Button} from "react-native";
import { writeToDB } from "../firebase/firestore";

export default function AddExpense({ navigation }) {
    const [amount, onChangeText1] = React.useState('');
    const [description, onChangeText2] = React.useState('');

    const onAdd = async function () {
        const newExpense = {amount: amount, description: description, important: false}
        await writeToDB(newExpense);
    }

    const onCancel = () => {
        navigation.goBack();
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.title}> Your Expenses </Text>
            <View style={styles.inputContainer}>
                <Text style={{alignItems: 'left'}}> Amount </Text>
                <TextInput
                    style={{ height: 40, width: 200,borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeText1(text)}
                    keyboardType="numeric"
                    value={amount}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={{alignItems: 'left'}}> Description </Text>
                <TextInput
                    style={{ height: 150, width: 200, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeText2(text)}
                    value={description}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                    <Button title="Cancel" onPress={onCancel} titleStyle={{
                        color: 'white',
                        marginHorizontal: 20,
                }}/>
                </View>
                <View style={styles.button}>
                    <Button
                    title="Confirm"
                    onPress={() => {
                        onAdd();
                        onCancel();
                    }}
                    disabled={(description.length | amount.length)? false: true}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        marginTop: -200,
        color: 'pink',
        borderWidth: 2,
        borderColor: 'pink',
        padding: 10,
        borderRadius: 3
    },
    inputContainer: {
        width: "80%",
        maxWidth: "90%",
        minWidth: 250,
        margin: 5,
        alignItems: "center"
    },
    button: {
        margin: 5,
        width:'30%',
        backgroundColor: 'pink',
        borderRadius: 3
    },
    buttonsContainer: {
        flexDirection:'row',
        margin: 20
    }
})