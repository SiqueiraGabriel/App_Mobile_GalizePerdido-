import React from 'react'
import { View, Text, ScrollView, StatusBar, StyleSheet, Image} from 'react-native'
import {router} from "expo-router"
import { SafeAreaView } from 'react-native-safe-area-context'
import {CustomButton} from "../components/CustomButton"

const App = () => {
  return (
    <SafeAreaView style={styles.body}>
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View style={styles.container}>
          <Image 
            source={require("../assets/images/galize_logo.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.text}>
              O seu achado é a {'\n'}
              alegria de alguém
            </Text>
            <CustomButton 
              title={"Enviar Foto"}
              handlePress={() => router.push("/camera")}
              styledComponent="mt-10 p-5"
            />

          </View>
      </ScrollView>

      <StatusBar background="#161622" style="light" />
    </SafeAreaView>
    
  )
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#292A2E",
  },
  image: {
    height: 400,
    width: 400 
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: "70%"
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "5%",
    marginBottom: "0%",
    width: "100%",
    height: "20%",
    backgroundColor: "#253D36"
  },

  text: {
    marginTop: 10,
    color: "#F9B25F",
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 36,
    textShadowColor: "#000"

  }
})


export default App
