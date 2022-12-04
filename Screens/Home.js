import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../Styling/Bootstrap';
import {style} from '../Styling/Styling';

function Home({navigation}) {
  const [data, setData] = useState([]);
  const [loader, setloader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  console.log(allCategories);
  const [Txt, setTxt] = useState('');
  // let move = (e) => {
  //   navigation.navigate('Product', e);
  // };
  const searchtxt = e => {
    setTxt(e.taget.value);
  };
  console.log(Txt);
  let datasearch = data.filter(item => {
    return Object.keys(item).some(key =>
      item[key].toString().toLowerCase().includes(Txt.toString().toLowerCase()),
    );
  });
  let handleRefresh = () => {
    setRefresh(true);
    // getProducts()
    setTimeout(() => {
      setRefresh(false);
      ToastAndroid.show('Refreshed Successfully', 2000);
    }, 1500);
  };
  let getData = () => {
    setloader(true);
    axios
      .get('https://fakestoreapi.com/products')
      .then(suss => {
        console.log('Data Founded line 15');
        setData(suss.data);
        setloader(false);
      })
      .catch(err => {
        console.log('data not found line 20');
        setloader(false);
      });
  };

  // extracting all categories from main data state Array
  let getCategories = () => {
    let li = data.map(x => x.category);
    li = [...new Set([...li])];
    setAllCategories([...li]);
  };
  // Render Item By TextInput

  useEffect(() => {
    getData();
    getCategories();
  }, []);
  return loader ? (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '1A1A1A',
      }}>
      <Text style={{fontSize: 30, textAlign: 'center', color: '#91F877'}}>
        LoagingPlease wait......
      </Text>
    </View>
  ) : (
    <>
      <View style={[style.BackGround]}>
        <View>
          <Text
            style={[
              style.Heading,
              {
                fontSize: 30,
                marginVertical: 10,
                marginLeft: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#91F877',
                paddingVertical: 10,
              },
            ]}>
            Fake Store
            {/* <Icon name='search' size={20} color='white' /> */}
          </Text>
        </View>

        <View style={{marginHorizontal: 15}}>
          <TextInput
            style={style.input}
            placeholder="Search...."
            onChangeText={e => {
              setTxt(e);
            }}
          />
        </View>

        <View style={{flexDirection: 'row', margin: 6}}>
          <ScrollView horizontal={true} style={{paddingVertical: 4}}>
            {allCategories.map((item, index) => (
              <View style={{marginHorizontal: 5}} key={index}>
                <TouchableOpacity style={style.btn}>
                  <Text style={{color: 'black', fontWeight: '600', padding: 3}}>
                    {item}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
        <View>
          <ScrollView
            refreshControl={
              <RefreshControl onRefresh={handleRefresh} refreshing={refresh} />
            }
            style={style.scrollview}
            contentContainerStyle={styles.contentContainer}>
            <View
              style={[
                styles.flexRow,
                styles.flexWrap,
                styles.w100,
                {height: '100%'},
              ]}>
              {datasearch.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate('Product', item)}
                  style={[style.cards, {marginHorizontal: 8, margin: 20,}]}>
                  <View>
                    <Image
                      source={{uri: item.image}}
                      style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        marginTop: 10,
                        marginBottom: 4,
                        color: 'black',
                      }}>
                      {' '}
                      {item.title.slice(0, 20) +
                        (item.title.length > 20 ? '...' : '')}
                    </Text>
                    <Text
                      style={{marginVertical: 3, color: 'black', fontSize: 13}}>
                      Ratings: {item.rating.rate}
                    </Text>
                    <Text style={{color: 'black', fontSize: 13}}>
                      Price: ${item.price}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

export default Home;
