import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    ActivityIndicator
} from 'react-native';
import { FONTS, COLORS ,SIZES} from "./Constants";
import ActivityIndicatorExample from './Loading';

const TextButton = ({
    buttonContainerStyle,
    disabled,
    label,
    labelStyle,
    label2 = "",
    label2Style,
    onPress,
    icon,
    iconStyle,
    buttonContainerStyle2,
    loading
}) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection:"row",
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.Primary,
                borderRadius:SIZES.radius,
                height:55,
                width:'88%',
                alignSelf:'center',
                ...buttonContainerStyle,

            }}
            disabled={disabled}
            onPress={onPress}
        >
            {
                icon != false &&
                <View
                    style={{
                        margin:10
                    }}
                >
                {
                    loading?
                    <ActivityIndicator
                        animating = {true}
                        color = {COLORS.white}
                        size = "small"
                        />
                        :
                    <Image source={icon} style={{height:25,width:25,tintColor:COLORS.white,...iconStyle}}/> } 
            </View>
            }
            <Text style={{ color: COLORS.white, ...FONTS.h3, ...labelStyle,letterSpacing:2 }}>
                {label}
            </Text>

            {label2 != false &&
                <View
                    style={{
                        
                        backgroundColor: COLORS.red,
                        height:20,
                        width:20,
                        borderRadius:20/2,
                        alignSelf:"center",justifyContent:"center",
                        ...buttonContainerStyle2
                        
                    }}
                >
                <Text style={{ color: COLORS.white, ...FONTS.h3, ...label2Style,letterSpacing:2,alignSelf:"center",justifyContent:"center" }}>
                  {label2}
            </Text>
            </View>
            }
        </TouchableOpacity>
    )
}

export default TextButton;