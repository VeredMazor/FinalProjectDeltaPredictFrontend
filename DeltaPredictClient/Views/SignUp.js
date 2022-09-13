import React, { useEffect,useState ,TouchableOpacity} from "react";
import {StyleSheet, Text, View, TextInput, Button, Image} from "react-native";
import { useNavigation } from '@react-navigation/native';




export default function SignUp()    {

    return (
        <View style={styles.container}>
            
                
            <View style={styles.inputTextContainer}>
                <View>
                    <Text style={styles.HaedLineText}> Sign Up to ΔPredict</Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.TextInput}
                        placeholder="Email."
                        placeholderTextColor="#fff"
                        onChangeText={(email) => setEmail(email)}>
                    </TextInput>
                </View>

                <View style={styles.inputView}>
                    <TextInput style={styles.TextInput}
                        placeholder="Password."
                        placeholderTextColor="#fff"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}>
                    </TextInput>
                </View>
                
                <View style={styles.inputView}>
                    <TextInput style={styles.TextInput}
                        placeholder="Confirm Password."
                        placeholderTextColor="#fff"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}>
                    </TextInput>


                </View>
                    <View style={styles.btnSignUp}>
                        <Button style={styles.btnSignUpText} uppercase = {true} title ="Sign Up" color = "#01a37b"
                        onPress={() => navigation.navigate('SignUp')}/>
                    
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
    },

    HaedLineText: {
        marginBottom: 45,
        margin: 'auto',
        fontSize: 30,
        fontWeight: "bold",
        color: 'white',
        justifyContent: 'flex-start',
    },
    inputTextContainer: {
        flex: 1, 
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputView: {
        backgroundColor: "#131722",
        borderRadius: 10,
        marginTop: 20,
        borderWidth: 3,
        borderColor: '#50535e',
        width: "18%",
        height: "4.5%",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        borderColor: "grey",
        color: 'white',
    },
    btnSignUp:{
        width: "100%",
        height: 50,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'lowercase',
    },
    btnSignUpText:{
        textTransform:'capitalize',
        width: 330,
        height: 150,

    },

})