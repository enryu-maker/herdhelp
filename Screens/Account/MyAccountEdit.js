import React, {useState} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '../../Components/Header';
import TextButton from '../../Components/TextButton';
import FormInput from '../../Components/FormInput';
// import ImagePicker from 'react-native-image-picker';
import {
  launchImageLibrary,
} from 'react-native-image-picker';
import {COLORS, SIZES, images} from '../../Components/Constants';
import axiosIns from '../../helpers/helpers';

const MyAccountEdit = ({navigation,route}) => {
  const [pic, setPic] = React.useState('');
  const [picdata, setPicdata] = React.useState('');
  const [fullName, setFullName] = useState(route.params.user.fullname);
  const [phoneNo, setPhoneNo] = useState(route.params.user.phone);
  const [idCard, setIdCard] = useState(route.params.user.farm_name);
  const [addr, setAddr] = useState(route.params.user.address);
  const [user,setUser]=React.useState([])

  const updateprofile = async () => {
      try {
        await axiosIns.patch(`updateprofile/2`,
        {
          "fullname": fullName,
          "phone": phoneNo,
          "farm_name": idCard,
          "address": addr
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        ).then(()=>{alert("Details updated")})
      } catch (e) {
        console.log('error', e.response.data);
      }
    };
  React.useEffect(() => {
    let { user } = route.params
    setUser(user)
  },[]);
  function openCamara() {
    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.assets) {
        imageAssetsArray = response.assets[0].uri;
        setPic(imageAssetsArray);
        setPicdata(response.assets[0].base64);
      }
    });
  }
  function renderFileUri() {
    if (pic!="") {
      return (
        <Image
        source={{uri:"https://joeschmoe.io/api/v1/" + user.fullname}}

          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            alignSelf: 'center',
          }}
        />
      );
    } else {
      return (
        <Image
        source={{uri:"https://joeschmoe.io/api/v1/" + user.fullname}}

          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            alignSelf: 'center',
            // tintColor: COLORS.Primary,
          }}
        />
      );
    }
  }
  function renderHeader() {
    return (
      <Header
        leftComponent={
          <View
            style={{
              justifyContent: 'center',
              position: 'absolute',
              marginTop: 25,
              zIndex: 1,
            }}>
            <TouchableOpacity
              style={{
                marginLeft: 25,
              }}
              onPressIn={() => {
                navigation.replace("MyAccount");
              }}>
              <Image
                source={images.back}
                style={{width: 28, height: 28, tintColor: COLORS.darkGray2}}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Edit Account'}
        titleStyle={{
          // alignSelf:"center",
          marginLeft: 50,
        }}
        rightComponent={
          <View
            style={{
              width: 40,
            }}
          />
        }
      />
    );
  }

  function renderForm() {
    return (
      <View
        style={{
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        
        {/* Name */}
        <FormInput
          label="Full Name"
          value={fullName}
          onChange={value => {
            setFullName(value);
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
        />

        {/* Phone Number */}
        <FormInput
          label="Phone Number"
          value={phoneNo}
          onChange={value => {
            setPhoneNo(value);
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
        />

        {/* ID Card */}
        <FormInput
          label="Farm Name"
          value={idCard}
          onChange={value => {
            setIdCard(value);
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
        />
        {/* Address */}
        <FormInput
          label="Address"
          value={addr}
          onChange={value => {
            setAddr(value);
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: 40,
        }}>
        {renderForm()}
      </KeyboardAwareScrollView>

      <TextButton
      icon={images.update}
        buttonContainerStyle={{
          height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label="Save"
        onPress={() => {
          updateprofile();
        }}
      />
    </View>
  );
};

export default MyAccountEdit;
