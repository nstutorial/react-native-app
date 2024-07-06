import { View, Text,TextInput, StyleSheet } from 'react-native'
import React from 'react'

const InputBox = ({
    placeholder,
    autoCorrect,
    autoCapitalize,
    inputmode,
    onChangeText,
    secureTextEntry,
    value ,
    
 }) => {
    return (
        <View style={styles.inputView}>
            <TextInput style={styles.input} placeholder={placeholder}  autoCorrect={autoCorrect}
                autoCapitalize={autoCapitalize} inputmode ={inputmode }
                onChangeText={onChangeText} secureTextEntry ={secureTextEntry }
                value={value}
                />

        </View>
    )
}

export default InputBox

const styles = StyleSheet.create({
    inputView : {
        gap : 15,
        width : "100%",
        paddingHorizontal : 40,
        marginBottom  :5
      },
      input : {
        height : 50,
        paddingHorizontal : 20,
        borderColor : "red",
        borderWidth : 1,
        borderRadius: 7
      },
})