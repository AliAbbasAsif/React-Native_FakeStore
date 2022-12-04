import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {style} from '../Styling/Styling';

function Product({navigation, route}) {
  console.log(route.params);
  let data = route.params;
  return (
    <>
      <View style={[style.BackGround, {padding: 20}]}>
        <View
          style={{
            paddingHorizontal: 30,
            borderRadius: 25,
            backgroundColor: 'white',
            marginHorizontal: 30,
            marginVertical: 20,
            height: '60%',
          }}>
          <Image
            source={{uri: data.image}}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
            margin: 8,
            height: '35%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <ScrollView>
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '800',
                  color: 'black',
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1.5,
                  padding: 5,
                }}>
                {data.title}
              </Text>
            </View>
            <View style={{marginTop: 5}}>
              <Text style={{color: 'grey'}}>{data.description}</Text>
            </View>
            <View style={{marginTop: 5}}>
              <Text style={{color: 'black', fontWeight: '600'}}>
                Sold {data.rating.count} Items
              </Text>
            </View>

            <View style={{marginTop: 5}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginTop:15}}>
                  <Text style={{fontWeight:'600',color:'black',fontSize:16}}>Price:{data.price}$</Text>
                </View>
                <View style={{marginLeft: 80}}>
                  <TouchableOpacity style={{borderRadius:20,paddingHorizontal:30,paddingVertical:10,backgroundColor:'black'}}>
                    <Text style={{color:'white',fontWeight:'600'}}>Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

export default Product;
