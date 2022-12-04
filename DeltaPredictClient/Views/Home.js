import React from "react";
import { StyleSheet, Text, View ,ActivityIndicator, StatusBar, Alert } from 'react-native';
import { useState, useEffect } from 'react'
import { fetch_clock,fetch_from_server } from "../client/deltaPredicrClient";
import { Searchbar } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";
import { useInterval } from "react-use";


function Home({route, navigation}){
    const [activeStocks, setActive] = React.useState("");
    const [loserStocks, setLosers] = useState(""); 
    const [gainerStocks, setGainers] = useState(""); 
    const [market, setMarket] = useState(""); 
    const [searchQuery, setSearchQuery] = React.useState('');
    const [currentPrice, setAPrice] = useState([]);   
    const [loading, setLoad] = useState(true); 
    const onChangeSearch = query => setSearchQuery(query);
    const user = route.params;
    const [getUser, setUser] = useState(user);
    
    

    async function getMarketData() {
        try { 
          const promise = new Promise((resolve, reject) => {
            resolve(fetch_clock() )
          })
          promise.then((response) => {
            setMarket(response["clock"].date+" , "+  response["clock"].description+  " next change: "+ response["clock"].next_change)
          })
        } catch (error) {}
    }

    async function getActive() {
        try { 
          const promise = new Promise((resolve, reject) => {
            resolve(fetch_from_server("GET",'activeStockData') )
          })
          promise.then((response) => {
            var obj=null; 
            const active =new Array();
            for(let i=0;i<Object.keys(response).length;i++)
            {
              obj= JSON.parse(response[i])
              active.push(obj)
            }
            setActive(active)
            setLoad(false)
          })
        } catch (error) {

        } finally {}
        
    }

    async function getLosers() {
      try { 
        const promise = new Promise((resolve, reject) => {
          resolve(fetch_from_server("GET",'losersStockData') )
        })
        promise.then((response) => {
          var obj=null; 
          const losers =new Array();
          for(let i=0;i<Object.keys(response).length;i++)
          {
            obj= JSON.parse(response[i])
            losers.push(obj)
          }
          setLosers(losers)
        })

      } catch (error) {

      } finally {}
    }

    async function getGainers() {
      try { 
        const promise = new Promise((resolve, reject) => {
          resolve(fetch_from_server("GET",'gainersStockData') )
        })
        promise.then((response) => {
          var obj=null; 
          const losers =new Array();
          for(let i=0;i<Object.keys(response).length;i++)
          {
            obj= JSON.parse(response[i])
            losers.push(obj)
          }
          setGainers(losers)
          
        })
      } catch (error) {
      } finally {}
    }

    //get active stock data not more than once in 3000 ms
    useInterval(() => {
        getActive()
      }, 3000   // Delay in milliseconds or null to stop it
    )
    useInterval(() => {
      getMarketData()
    },  3000    // Delay in milliseconds or null to stop it
    )
    useInterval(() => {
      getLosers()
    },  3000    // Delay in milliseconds or null to stop it
    )
    useInterval(() => {
      getGainers()
    },  3000    // Delay in milliseconds or null to stop it
    )

  const handleColors = (newPrice, stockSymbol) => {
    
    const myNextList = [...currentPrice];
    if(myNextList.find(a=>a.symbol === stockSymbol) === undefined ){  
      currentPrice.push({ symbol: stockSymbol, price: newPrice })
        // Items after the insertion point:
    }else{
      const artwork = myNextList.find(a=>a.symbol === stockSymbol)
      if(artwork.symbol == stockSymbol) {
        if(artwork.price < newPrice ){
          artwork.price = newPrice
          return '#1f8779';
        }
        else if (artwork.price > newPrice ){
          
          currentPrice.price = newPrice
          return '#af2d3a';
        }
        else{
            return "white";
        }
      }
    }
  };
  const checkInputSearchbar = () => {
    if(searchQuery != "")
      navigation.navigate('StockScreen',{otherParam: searchQuery, userParam: getUser})
    else alert("Stock not found")
  }


    
  return (
 
    <View style={styles.container}>
      <View style={{backgroundColor: "#131722"}}>
        <View style={styles.centered}>
          <Searchbar 
            style={{height: 40}}
            placeholder="enter symbol"
            type="text"
            value={searchQuery}
            onChangeText={onChangeSearch}
            onIconPress={checkInputSearchbar}
          /> 
        </View>

        <View style={{backgroundColor: "#131722"}}>
          <View style={styles.viewMarketTime}>
            <Icon name="time-outline" size={33} color="white"/>
            <Text style={styles.textMarketTime}>
              {market}
            </Text>
          </View>
        </View>

        <View style={{backgroundColor: "#131722"}}>
        
          <View style={styles.blackScreen}>

              <View style={styles.viewSubTitle}> 
                <Text style={styles.subTitle}>  Most Active ↑↓ </Text>
                <Text style={styles.textStocks}> { Object.values(activeStocks).map(({ close, symbol }) => (
                  <p key={close}> <Text style={{ color: 'white'}}>   {symbol} : </Text> <Text style={{ color: handleColors(close,symbol) }}> {close} </Text> </p>))} 
                </Text>
              </View>
              
              <View style={styles.viewSubTitle}>
                <Text style={styles.subTitle}>  Top Losers ↑↓  </Text>
                <Text style={styles.textStocks}> { Object.values(loserStocks).map(({ close, symbol }) => (
                  <p key={close}> <Text style={{ color: 'white'}}>   {symbol} : </Text> <Text style={{ color: handleColors(close,symbol) }}> {close} </Text> </p>))} 
                </Text>
                <ActivityIndicator style={{backgroundColor: "#131722"}} size="large" color="#307D7E"  animating={loading} hidesWhenStopped={true} /> 
              </View>

              <View style={styles.viewSubTitle}>
                <Text style={styles.subTitle}>  Top Gainers ↑↓  </Text>
                <Text style={styles.textStocks}>  { Object.values(gainerStocks).map(({ close, symbol }) => (
                  <p key={close}> <Text style={{ color: 'white'}}> {symbol} : </Text> <Text style={{ color: handleColors(close,symbol) }}> {close} </Text> </p>))}
                </Text>
              </View>

          </View>
        </View>
        
      </View>
    </View>
  );


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#131722",
      justifyContent: 'flex-start',
      alignItem: "center",
    },
    viewMarketTime: {
      backgroundColor: "#131722",
      flexDirection: 'row',
      margin: 35,
      alignItem: "center",
    },
    textMarketTime: {
      color: 'white',
      marginLeft: 15,
      fontSize: 25,
      fontWeight: 'bold',
    },
    blackScreen: {
      alignItem: "center",
      backgroundColor: "#131722",
      flexDirection: "row",
      margin:20
    },
    viewSubTitle: {
      backgroundColor: "#131722",
      margin: 10,
      flex: 0.333,
    },
    subTitle: {
      backgroundColor: "#307d7e",
      color: '#131822',
      borderRadius: 8,
      borderWidth: 3,
      borderColor: '#1e222d',
      fontSize: 25,
      fontWeight: 'bold',
      alignSelf: "center",
    },
    textStocks: {
      fontSize: 20,
      alignSelf: "center",
    },
    centered: {
      alignSelf: "center",
      justifyContent: 'flex-start',
      backgroundColor: "#131722",
      marginTop: 50,
      
    },
  });
  

export default Home;