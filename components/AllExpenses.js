import { Text, View, SafeAreaView, FlatList, StyleSheet} from "react-native";
import { useState, useEffect } from "react";

import { firestore } from '../firebase/firebase_setup';
import { collection, onSnapshot } from 'firebase/firestore';
import ExpenseItem from "./ExpenseItem";

export default function AllExpenses({ navigation }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "expenses"),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setExpenses([]);
          return;
        }
        setExpenses(
          querySnapshot.docs.map((snapDoc) => {
            let data = snapDoc.data();
            data = { ...data, key: snapDoc.id };
            return data;
          })
        );
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.bottomContainer}>
      <FlatList
        data={expenses}
        renderItem={({ item }) => {
          return (
            <ExpenseItem
              expense={item}
              navigation={navigation}
            />
          );
        }}
        contentContainerStyle={styles.scrollViewItems}
      ></FlatList>
    </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: "pink",
  },
  scrollViewItems: {
    alignItems: "center",
  },
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    color: "blue",
    padding: 30,
    margin: 30,
  },
  text: { fontSize: 12 },
});