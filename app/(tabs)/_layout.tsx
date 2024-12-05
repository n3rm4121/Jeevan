import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'red', headerShown: false, tabBarHideOnKeyboard: true, tabBarLabelStyle: { fontSize: 16 }, tabBarStyle: { height: 70 } }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
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
