import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'
import Header from '~/components/Header';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: 'red', headerTitleStyle: { fontSize: 24 },
            headerStyle: { backgroundColor: 'red' }, headerShown: true, tabBarHideOnKeyboard: true, tabBarLabelStyle: { fontSize: 16 }, tabBarStyle: { height: 70 }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerTitle: () => <Header name='Home' isHomeScreen />,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="donate"
                options={{
                    title: 'Blood Requests',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
                }}
            />
            <Tabs.Screen
                name="campaigns"
                options={{
                    title: 'Campaigns',
                    tabBarIcon: ({ color }) => <MaterialIcons size={32} name="campaign" color={color} />,
                }}
            />
        </Tabs>
    );
}
