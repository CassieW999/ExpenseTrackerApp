import * as React from 'react';
import 'react-native-gesture-handler';
import { Text, View, Button, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AllExpenses from './components/AllExpenses';
import ImportantExpenses from './components/ImportantExpenses';
import AddExpense from './components/AddExpense';
import EditExpense from './components/EditExpenses';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs({navigation}) {
  function rightButton() {
    return (
      <Button
        style={styles.headerButton}
        title="+"
        onPress={() => navigation.navigate('Add Expense')}
      />
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="All Expenses"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="All Expenses"
        component={AllExpenses}
        options={({ route, navigation }) => {
          return {
            tabBarLabel: 'All Expenses',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            headerRight: rightButton,
          };
        }}
      />
      <Tab.Screen
        name="Important Expenses"
        component={ImportantExpenses}
        options={({ route, navigation }) => {
          return {
            tabBarLabel: 'Important Expenses',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bell" color={color} size={size} />
            ),
            headerRight: rightButton,
          };
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Add Expense" 
          component={AddExpense}
          />
        <Stack.Screen name="Edit Expense" component={EditExpense} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  headerButton: {
    fontSize: 12,
    marginRight: 10
  }
})