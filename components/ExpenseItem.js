import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import Colors from "../assets/Colors";

export default function ExpenseItem({expense, navigation}) {

    function onItemPress(expense) {
        navigation.navigate("Edit Expense", { expenseObject: expense });
    }

    return (
        <View style={styles.goalTextContainer}>
            <Pressable
                onPress={() => {
                onItemPress(expense);
                }}
                android_ripple={{ color: "#223355", foreground: true }}
                style={(obj) => {
                return obj.pressed && styles.pressedItem;
                }}
            >
                <View style={styles.itemContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.goalText}> {expense.description} </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.goalText}> {expense.amount} </Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    goalTextContainer: {
      margin: 10,
      borderRadius: 5,
      width: 250,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "right",
    },
    goalText: {
      fontSize: 20,
      padding: 8,
    },
    pressedItem: {
      opacity: 0.5,
    },
    itemContainer: {
        width: '80%',
        backgroundColor: Colors.purple,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 3,
        shadowColor: "#111"
    },
    textContainer:{
        width: '65%',
        backgroundColor: Colors.white,
        borderRadius: 3,
        paddingHorizontal: 15
    }
  });