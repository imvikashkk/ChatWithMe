import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigation/Navigation'
import {UserContext} from './UserContext'

export default function App() {
  return (
    <>  
       <UserContext>
          <Navigation/>
       </UserContext>
    </>
  );
}

const styles = StyleSheet.create({
 
});
