import { Text, View, Button, StyleSheet, Alert} from "react-native";
import { deleteFromDB, editImportanceFromDB } from "../firebase/firestore";

export default function EditExpense({ route, navigation }) {
    const expense = route.params.expenseObject;

    const onDelete = async function () {
        const deleteKey = expense.key;
        await deleteFromDB(deleteKey);
        Alert.alert("Expense for "+ expense.description + ":" + expense.amount +" deleted!");
        navigation.goBack();
    }

    const markImportant = async function() {
        const key = route.params.expenseObject.key;
        await editImportanceFromDB(key);
        Alert.alert("Marked expense for "+ expense.description + ":" + expense.amount +" as important!");
        navigation.goBack();
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                    <Button title="Mark as important" onPress={markImportant} 
                        disabled={(expense.important)? true: false}
                        titleStyle={{
                            color: 'white',
                            marginHorizontal: 20,
                }}/>
                </View>
                <View style={styles.button}>
                    <Button title="Delete" onPress={onDelete} titleStyle={{
                        color: 'white',
                        marginHorizontal: 20,
                }}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 5,
        width:'90%',
        backgroundColor: 'pink',
        borderRadius: 3
    },
    buttonsContainer: {
        width: 200,
        flexDirection:'column',
        margin: 20
    }
})