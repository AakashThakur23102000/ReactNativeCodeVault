import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import WithTimingExample from '../pages/animations/with_timing_Example.tsx/WithTimingExample';
import { NavigationPaths } from '../config/NavigationPaths';
import CustomDrawerNavigation from './CustomDrawerNavigation';
import { scale } from 'react-native-size-matters';
import Button1 from '../pages/reusable_components/button_1/Button1';

const DrawerNavigation = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator
            initialRouteName={NavigationPaths.WITH_TIMING_EXAMPLE}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    width: scale(250)
                }
            }}
            drawerContent={(props) => <CustomDrawerNavigation descriptors={props.descriptors} navigation={props.navigation} state={props.state} />}
        >
            <Drawer.Screen name={NavigationPaths.WITH_TIMING_EXAMPLE} component={WithTimingExample} />
            <Drawer.Screen name={NavigationPaths.BUTTON_1} component={Button1} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation