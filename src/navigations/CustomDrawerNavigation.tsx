import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React from 'react'
import { Image, Pressable, View } from 'react-native';
import { useResponsiveStyles } from '../hooks/responsiveStyles';
import { useAppSelector } from '../hooks/storeHooks';
import { AssetsPaths } from '../config/AssetsPaths';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import CustomText from '../components/CustomText';
import { NavigationPaths } from '../config/NavigationPaths';

function CustomDrawerNavigation({
    descriptors,
    navigation,
    state,
}: Readonly<DrawerContentComponentProps>) {
    const COLORS = useAppSelector(state => state.theme.colors)
    const styles = useResponsiveStyles({
        createSheet: ScaledSheet.create,
        baseStyles: {
            screen: {
                flex: 1,
                backgroundColor: COLORS.drawerColor
            },

            // top
            topSegment: {
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: verticalScale(12),
                borderBottomWidth: .2,
                borderColor: COLORS.textColor
            },
            imageContainer: {
                width: scale(75),
                height: scale(75)
            },
            headingText: {
                flexShrink: 1
            },

            // bottom
            bottomSegment: {
                alignSelf: "center",
                alignItems: "center",
                paddingVertical: verticalScale(8),
                rowGap: scale(5),
                width: "90%",
            },

            tabContainerButton: {
                borderWidth: 1,
                borderColor: COLORS.secondary500,
                backgroundColor: COLORS.secondary500,
                padding: scale(2),
                paddingHorizontal: scale(10),
                borderRadius: scale(5),
                width: "100%",
                overflow: "hidden"
            },
            tabContainerButtonSub: {
                alignSelf: "flex-end",
                borderWidth: 1,
                borderColor: COLORS.secondary100,
                padding: scale(2),
                paddingHorizontal: scale(15),
                borderRadius: scale(5),
                width: "90%",
                overflow: "hidden"
            }
        }
    })
    const currentRouteName = state.routes[state.index].name;
    const drawerArray = [
        {
            label: "Reanimated Animations",
            childrenArr: [
                {
                    label: "withTiming Example",
                    navigation: NavigationPaths.WITH_TIMING_EXAMPLE,
                },
            ]
        },
        {
            label: "Components",
            childrenArr: [
                {
                    label: "Button 1",
                    navigation: NavigationPaths.BUTTON_1,
                },
            ]
        },
    ]

    return (
        <View style={styles.screen}>

            {/* Top Segment */}
            <View style={styles.topSegment}>
                <View style={styles.imageContainer}>
                    <Image
                        source={AssetsPaths.images.LOGO}
                        style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "contain"
                        }} />
                </View>
                <CustomText customWeight='700' customSize='extra_large' style={styles.headingText}>{"React Native Code Vault"}</CustomText>
            </View>





            {/* Bottom Segment */}
            <View style={styles.bottomSegment}>
                {drawerArray.map((item, index) => {
                    const isAnyChildSelected = item.childrenArr.some(
                        (child) => child.navigation === currentRouteName
                    );

                    return (
                        <View key={index?.toString()} style={{
                            width: "100%",
                            rowGap: verticalScale(2),
                            alignSelf: "center",
                            alignItems: "center",
                        }}>
                            {/* Parent */}
                            <View
                                style={styles.tabContainerButton}
                            >
                                <CustomText
                                    customWeight={isAnyChildSelected ? "700" : "normal"}
                                    customSize='small'
                                >
                                    {item.label}
                                </CustomText>
                            </View>

                            {/* Children */}
                            {item.childrenArr.map((itemChild, indexChild) => {
                                const isSelected = itemChild.navigation === currentRouteName;

                                return (
                                    <Pressable
                                        key={indexChild?.toString()}
                                        onPress={() => navigation.navigate(itemChild.navigation as never)}
                                        style={[
                                            styles.tabContainerButtonSub,
                                            isSelected && {
                                                backgroundColor: COLORS.secondary100,
                                                borderColor: COLORS.secondary100,
                                            },
                                        ]}
                                        android_ripple={{ color: COLORS.secondary100, foreground: true }}
                                    >
                                        <CustomText
                                            customWeight={isSelected ? "700" : "normal"}
                                            customSize='extra_small'
                                        >
                                            {itemChild.label}
                                        </CustomText>
                                    </Pressable>
                                );
                            })}
                        </View>
                    );
                })}
            </View>
        </View>
    )
}

export default CustomDrawerNavigation