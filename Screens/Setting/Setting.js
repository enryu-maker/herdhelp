import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { images,COLORS } from '../../Components/Constants';
import Header from '../../Components/Header';
export default function Setting({navigation}) {
  function renderheader() {
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
                // marginTop: 20,
                marginLeft: 25,
              }}
              onPress={() =>  {navigation.openDrawer()} }>
              <Image source={images.menu} style={{width:30,height:30,tintColor:COLORS.darkGray2}}/>

            </TouchableOpacity>
          </View>
        }
        title={'Setting'}
      />
    );
  }
  return (
    <View style={{flex:1}}>
      {renderheader()}
    </View>
  )
}