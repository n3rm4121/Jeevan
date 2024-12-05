import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '~/components/Header';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#ef4444', // Active red tint
                headerShown: true,
                headerStyle: { backgroundColor: 'white' },
                tabBarHideOnKeyboard: true,
                tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerTitle: () => <Header name="Home" isHomeScreen={true} />,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="donate"
                options={{
                    title: 'Blood Requests',
                    headerStyle: { height: 0 },
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
                }}
            />
            <Tabs.Screen
                name="campaigns"
                options={{
                    title: 'Campaigns',
                    headerStyle: { height: 0 },
                    headerTintColor: '#1f2937',
                    // headerTitle: () => <Header name="Campaigns" isHomeScreen={false} />,
                    tabBarIcon: ({ color }) => <MaterialIcons size={32} name="campaign" color={color} />,
                }}
            />
        </Tabs>
    );
}
