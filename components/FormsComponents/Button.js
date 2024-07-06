import { View, Text, StyleSheet,Pressable } from 'react-native'
import React from 'react'

const FormButton = ({onPress,text,OrLoginText}) => {
  return (
    <View style={styles.buttonView}>
    <Pressable style={styles.button} onPress={onPress} >
        <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
    <Text style={styles.optionsText}>{OrLoginText}</Text>
</View>
  )
}

export default FormButton

const styles =StyleSheet.create({
    buttonView :{
        width :"100%",
        paddingHorizontal : 50
      },
      button : {
        backgroundColor : "red",
        height : 45,
        borderColor : "gray",
        borderWidth  : 1,
        borderRadius : 5,
        alignItems : "center",
        justifyContent : "center"
      }, 
      buttonText : {
        color : "white"  ,
        fontSize: 18,
        fontWeight : "bold"
      }, 
      optionsText : {
        textAlign : "center",
        paddingVertical : 10,
        color : "gray",
        fontSize : 13,
        marginBottom : 6
      },
})