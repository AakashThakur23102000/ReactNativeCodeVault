import { View, Text } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../../hooks/storeHooks'
import { useResponsiveStyles } from '../../../hooks/responsiveStyles'
import CustomHeader from '../../../components/CustomHeader'

const WithTimingExample = () => {
    const COLORS = useAppSelector(state => state.theme.colors)
    const styles = useResponsiveStyles({
        baseStyles: {
            screen: {
                flex: 1,
                backgroundColor: COLORS.background1
            }
        }
    })


    return (
        <>
            <CustomHeader headerLabel='WithTiming Example' />
            <View style={styles.screen}>
                <Text>WithTimingExample</Text>
            </View>
        </>
    )
}

export default WithTimingExample