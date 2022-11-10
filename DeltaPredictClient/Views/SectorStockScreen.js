
import { Dimensions, Text, View } from 'react-native';

import React from "react";
import {fetcSectorData} from "../client/deltaPredicrClient";
import { useState } from 'react'
import { StyleSheet, Platform, ScrollView, Pressable, FlatList} from 'react-native';
import { useInterval } from "react-use";
import { Badge, Button, Card, Paragraph } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import ScrollViewIndicator from 'react-native-scroll-indicator';
import { Table, Row} from 'react-native-table-component';
import Icon from "react-native-vector-icons/Ionicons";


function SectorStockScreen({ route, navigation }) {

  const [stockData, setData] = useState(""); 
  const [loading, setLoad] = useState(true); 
  const [searchQuery, setSearchQuery] = React.useState('');
  const [saveChange, setChange] = useState(""); 
  const onChangeSearch = query => setSearchQuery(query);
  const sector_name = useRoute();
  const header = ['Symbol', 'Company', 'Volume', 'Price', 'Change']


  async function fetch_Data(text) {
    try { 
      
      const promise = new Promise((resolve, reject) => {
        resolve(fetcSectorData(text) )
      })
    
      promise.then((response) => {
        setData(response)
        setLoad(false)
        
      })
    } catch (error) {
    } 
    }
    
    useInterval(() => {

      fetch_Data(sector_name)
    },  7000// Delay in milliseconds or null to stop it
    
    )
    
    function _onPressButton (symbol) { // On press button its transition to stock page.
      console.log(symbol)
      navigation.navigate('StockScreen',{otherParam: symbol.key,}) 
    }

   

  return (
    
    <View style={styles.container}>
      
      <View style={styles.centeredSearch}>
          <Searchbar 
              style={{height: 40}}
              placeholder="enter symbol"
              type="text"
              justifyContent= "center"
              alignItems= "center"
              value={searchQuery}
              onChangeText={onChangeSearch} 
              onIconPress={ event =>event != "" ?  navigation.navigate('StockScreen',{otherParam: searchQuery,}) : ""}
          /> 
      </View> 
      
      <Table borderStyle={{ borderWidth: 3.5, borderColor: '#1e222d'}} style={{marginTop: 50, height: 32}}>
                <Row textStyle={{color: 'white', textAlign: 'center' , fontSize: 20, fontWeight: 'bold'}} flexArr={[0.5, 2, 1, 1, 1]} style={{height: 30}} data={header} />
                
      </Table>
              
      <ScrollViewIndicator  shouldIndicatorHide={false} flexibleIndicator={false} scrollIndicatorStyle={{ backgroundColor: '#50535e'}} style={styles.flat}>
        <FlatList 
          data={Object.values(stockData).map(({ Ticker, Company, Price, Volume, Change }) => (
          <p key={Ticker}> <View style={{width:150}}><Text>{Ticker}</Text></View>
            <View style={{ flexDirection: "row", position: "absolute", marginLeft: 150, alignSelf: "center", flex: 0.2, }}><Text style={{ textAlign: 'center'}}>{Company}</Text></View>
            <View style={{flex: 0.2, width: 150, flexDirection: "row", alignSelf: "center", marginLeft: 600}}><Text style={{ textAlign: 'center'}}>{Price}</Text></View> 
            <View style={{flex: 0.2, width: 150, flexDirection: "row", alignSelf: "center",marginLeft:150 }}><Text style={{textAlign: 'center'}}>{Volume}</Text></View>
            <View style={{flex: 0.2, width: 150, flexDirection: "row", alignSelf: "center", marginLeft:150 }}><Text style={{ textAlign: 'center'}}>{Change}</Text></View>
          
          </p>
          ))}
                renderItem={(stockData) => {
                return (
                <View style={styles.listItem}>
                <Pressable onPress={(item) => _onPressButton(stockData.item)}><Text style={styles.textList}>{stockData.item}</Text></Pressable>
                </View>
                );}}    
              />
      </ScrollViewIndicator>
      
      
      
    </View>
    
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#131722",
    },
    flat:{
      backgroundColor: "#131722",
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 50,
      alignSelf: "center",
    },
    titles:{
      color: '#307d7e',
    },
    listItem: {
      borderWidth: 1,
      marginTop: 10,
      backgroundColor: "#1e222d",
      paddingLeft: 20,
    },
    textList:{
      color: '#faf9fb',
      fontSize: 20,
      flex: 0.2,
      alignItems: "center",
      justifyContent: 'center'
    },
    centeredSearch: {
      flex: 0.2,
      alignItems: "center",
      backgroundColor: "#131722",
      marginTop: 50,
    },
});


export default SectorStockScreen;