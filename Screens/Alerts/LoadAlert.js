import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {COLORS, images, SIZES, FONTS} from '../../Components/Constants';
import axiosIns from '../../helpers/helpers';
import Header from '../../Components/Header';
import AlertCard from './AlertCard';
import ActivityIndicatorExample from '../../Components/Loading';
import TextButton from '../../Components/TextButton';
import {SwipeListView} from 'react-native-swipe-list-view';
export default function LoadAlert({navigation, route}) {
  const [alert, setAlerts] = React.useState([]);
  const [species, setSpcies] = React.useState([]);
  const [id, setId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function loadFinance() {
    let {data} = await axiosIns.get('alerts/');
    setLoading(true);
    return data;
  }
  React.useEffect(() => {
    setId(global.id);
    setSpcies(global.species);
    loadFinance().then(data => {
      setAlerts(data);
      // console.log(data)
    });
    global.alertlength = alert;
  }, []);
  function delAlert(id){
    axiosIns.delete(`alerts/${id}`).then(()=>{alert("Alert deleted sucessfully")})
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
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{width: 30, height: 30, tintColor: COLORS.darkGray2}}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Alerts'}
      />
    );
  }

  return (
    <View style={{flex: 1}}>
      {renderHeader()}
      <Text style={{...FONTS.h4,color:COLORS.Primary,alignSelf:"center"}}>
                Swipe Left To{" "} 
            <Text style={{...FONTS.h4,color:COLORS.red,marginLeft:10}}>
             Delete
            </Text>
            </Text>
      {loading ? (
        <SwipeListView
          data={alert}
          keyExtractor={item => `${item.id}`}
          contentContainerStyle={{
            // marginTop: SIZES.radius,
            // paddingHorizontal: SIZES.padding,
            // paddingBottom: SIZES.padding * 2
        }}
          renderItem={(data, rowMap) => (
            <View
              style={{
                backgroundColor: COLORS.lightGray2,
                flex:1,
                height: 120,
                margin: SIZES.base2,
                borderRadius: SIZES.radius,
                width: '88%',
                alignSelf: 'center',
                padding:8
              }}>
              <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <View style={{flexDirection:"column",padding:4}}>
            <Text style={
              Platform.OS=="android"?{...FONTS.h2}:{...FONTS.h2}
                }>{`Issue: ${data.item.title}`}</Text>
            <Text style={
                Platform.OS=="android"?{...FONTS.body3}:{...FONTS.body2}
            }>{`Solution: ${data.item.content}`}</Text>
            {
              data.item.tag!=undefined||""?(<Text style={
                Platform.OS=="android"?{...FONTS.h3}:{...FONTS.h2}
            }>{`${data.item.tag}`}</Text>):
              (<View></View>)
            }
            <View style={{flexDirection:"row",justifyContent:"space-between",width:"55%"}}>
            <Text style={
                Platform.OS=="android"?{...FONTS.h4,color:COLORS.Primary}:{...FONTS.h2,color:COLORS.Primary}
            }>{`Date: ${data.item.alert_date}`}</Text>
            <Text style={
                Platform.OS=="android"?{...FONTS.h4}:{...FONTS.h2}
            }>    {`Time: ${data.item.alert_time.slice(0,6)}`}</Text>
            </View>
            </View></View>
            </View>
          )}
          renderHiddenItem={(data, rowMap) => (
            <TextButton
            key={rowMap}
              buttonContainerStyle={{
                flex: 1,
                justifyContent: 'flex-end',
                marginTop: 10,
                marginBottom: 10,
                backgroundColor:"#ff5b5b"
              }}
              
              icon={images.delet}
              iconStyle={{
                marginRight: 15,
              }}
              onPress={() => delAlert(data.item.id)}
            />
          )}
          disableRightSwipe={true}
          // leftOpenValue={0}
          rightOpenValue={-75}
        />
      ) : (
        <ActivityIndicatorExample />
      )}

      <TextButton
        onPress={() => {
          navigation.replace('Alerts', {
            sep: species,
            id: id,
          });
        }}
        icon={images.bell}
        buttonContainerStyle={{
          //   flex:1,
          height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label={'Add Alert'}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});
