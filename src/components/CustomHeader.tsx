import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useResponsiveStyles } from '../hooks/responsiveStyles'
import { useAppSelector } from '../hooks/storeHooks'
import CustomText from './CustomText'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { scale } from 'react-native-size-matters'
import { DrawerActions, useNavigation } from '@react-navigation/native'

type HeaderProps = {
    headerLabel?: string,
    isGoBack?: boolean
}

const CustomHeader = ({
    headerLabel = "",
    isGoBack = false
}: Readonly<HeaderProps>) => {
    const navigation = useNavigation()
    const COLORS = useAppSelector(state => state.theme.colors)
    const styles = useResponsiveStyles({
        baseStyles: {
            screen: {
                paddingHorizontal: scale(10),
                columnGap: scale(10),
                backgroundColor: COLORS.headerColor,
                borderBottomWidth: 0.2,
                borderColor: COLORS.textColor,
                flexDirection: "row",
                alignItems: "center"
            },
            buttonView: {
                alignItems: "center",
                justifyContent: "center",
                width: scale(40),
                height: scale(40),
            }

        }
    })

    function handleDrawerButtonPress() {
        if (isGoBack) {
            navigation.goBack()
        } else {
            navigation.dispatch(DrawerActions.toggleDrawer());
        }
    };
    return (
        <View style={styles.screen}>
            <TouchableOpacity style={styles.buttonView} onPress={handleDrawerButtonPress}>
                <MaterialIcons name={isGoBack ? "arrow-back" : 'menu'} size={scale(20)} color={COLORS.textColor} />
            </TouchableOpacity>
            <CustomText customSize='large'>{headerLabel}</CustomText>
        </View >
    )
}

export default CustomHeader