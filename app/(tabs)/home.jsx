import { Image, StyleSheet, Platform , Text, View} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';


export default function HomeScreen() {
  return (
   <View className="justify-center mt-10" >
    <Image 
      source={require("../../assets/images/galize_logo.png")}
      className="h-[250px] w-[250px] mt-10"
      resizeMode="contain"
    />
    <Link href="/">Voltar</Link>
    <Text style={{margin:100, justifyContent: 'center' , color: "#fff"}}>Ola</Text>
   </View>
  );
}
