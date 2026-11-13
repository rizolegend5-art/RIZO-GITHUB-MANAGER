import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { ref, set } from 'firebase/database';
import { auth, db } from './firebase';
Notifications.setNotificationHandler({handleNotification:async()=>({shouldShowAlert:true,shouldPlaySound:true,shouldSetBadge:false})});
export async function registerPushToken(){
 if(Platform.OS!=='android')return;
 const user=auth.currentUser;if(!user)return;
 const permission=await Notifications.getPermissionsAsync();
 let status=permission.status;
 if(status!=='granted') status=(await Notifications.requestPermissionsAsync()).status;
 if(status!=='granted')return;
 const projectId=Constants.expoConfig?.extra?.eas?.projectId;
 if(!projectId || projectId==='REPLACE_WITH_YOUR_EAS_PROJECT_ID')return;
 const token=(await Notifications.getExpoPushTokenAsync({projectId})).data;
 const deviceId=token.replace(/[^a-zA-Z0-9_-]/g,'_').slice(-120);
 await set(ref(db,`devices/${user.uid}/${deviceId}`),{platform:'android',pushToken:token,updatedAt:Date.now()});
}
