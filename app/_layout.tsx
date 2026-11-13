import {Stack} from 'expo-router';import {StatusBar} from 'expo-status-bar';import {AuthProvider} from '../src/auth';
export default function Layout(){return <AuthProvider><StatusBar style="light"/><Stack screenOptions={{headerShown:false,contentStyle:{backgroundColor:'#0D0F16'}}}/></AuthProvider>;}
