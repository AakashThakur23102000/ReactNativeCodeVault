import { View, Text } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../../hooks/storeHooks'
import { useResponsiveStyles } from '../../../hooks/responsiveStyles'

const WithTimingExample = () => {
    const COLORS = useAppSelector(state => state.theme.colors)
    const styles = useResponsiveStyles({
        baseStyles: {
            screen: {
                flex: 1,
                backgroundColor: COLORS.drawerColor
            }
        }
    })
    return (
        <View style={styles.screen}>
            <Text>WithTimingExample</Text>
        </View>
    )
}

export default WithTimingExample