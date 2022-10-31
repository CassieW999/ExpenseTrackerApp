import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

import { firestore } from "./firebase_setup";

export async function writeToDB(expense) {
    try {
        const docRef = await addDoc(collection(firestore, "expenses"), expense);
    } catch (err) {
        console.log(err);
    }
}

export async function deleteFromDB(key) {
    try {
        await deleteDoc(doc(firestore, "expenses", key));
    } catch (err) {
        console.log(err);
    }
}

export async function editImportanceFromDB(key) {
    try {
        await updateDoc(doc(firestore, "expenses", key), {important: true});
    } catch (err) {
        console.log(err);
    }
}