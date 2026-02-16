import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { useAppSelector } from '../hooks/storeHooks';


type customFamilyType = "default" | "WixMadeforText"
type customWeightType = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal' | 'bold'

const getFontFamily = (baseFont: customFamilyType, weight: customWeightType): string => {
    switch (weight) {
        case '100':
            return `${baseFont}-Thin`;
        case '200':
            return `${baseFont}-ExtraLight`;
        case '300':
            return `${baseFont}-Light`;
        case '400':
        case 'normal':
            return `${baseFont}-Regular`;
        case '500':
            return `${baseFont}-Medium`;
        case '600':
            return `${baseFont}-SemiBold`;
        case '700':
        case 'bold':
            return `${baseFont}-Bold`;
        case '800':
            return `${baseFont}-ExtraBold`;
        case '900':
            return `${baseFont}-Black`;
        default:
            return `${baseFont}-Regular`;
    }
};

export const fontSizes = {
    extra_extra_large: scale(35),
    extra_large: scale(25),
    large: scale(18),
    regular: scale(14),
    small: scale(12),
    extra_small: scale(9.5),
    extra_extra_small: scale(8)
};

interface CustomTextProps extends TextProps {
    customWeight?: customWeightType;
    customSize?: keyof typeof fontSizes;
    customFamily?: customFamilyType;
}

const CustomText: React.FC<CustomTextProps> = ({
    children,
    customWeight = "400",
    customSize = 'regular',
    customFamily = "WixMadeforText",
    style,
    ...props
}) => {
    const fontFamily = customFamily !== "default" ? getFontFamily(customFamily, customWeight) : undefined;
    const fontWeight = customFamily === 'default' ? customWeight : undefined;
    var fontSize = fontSizes[customSize] || fontSizes.regular;
    const COLORS = useAppSelector(state => state.theme.colors)
    const styles = StyleSheet.create({
        text: {
            color: COLORS.textColor
        },
    });

    return (
        <Text {...props} style={[styles.text, { fontFamily, fontSize, fontWeight }, style]}>
            {children}
        </Text>
    );
};


export default CustomText;