import { createStackNavigator } from '@react-navigation/stack';
import { NavigationPaths } from '../config/NavigationPaths';
import DrawerNavigation from './DrawerNavigation';
const AppNavigation = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName={NavigationPaths.DRAWER_NAVIGATION}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name={NavigationPaths.DRAWER_NAVIGATION} component={DrawerNavigation} />
        </Stack.Navigator>
    )
}
export default AppNavigation