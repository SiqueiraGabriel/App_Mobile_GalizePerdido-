import { CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useState,Image } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import CameraPreview from '../../components/CameraPreview';
import { sendImage, supabase } from './supabaseClient.js';
import {requestForegroundPermissionsAsync, getCurrentPosition, getCurrentPositionAsync} from 'expo-location';
import Geocoder from "react-native-geocoding"

export default function camera() {

  const [facing, setFacing] = useState('back');

  const [permission, requestPermission] = useCameraPermissions()

  const [uriPhoto, setUriPhoto] = useState("")

  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)

  const [location, setLocation] = useState(false)
  const [address, setAddress] = useState(false)
    


  // Se estiver carregando a permissão para a camera
  if(!permission){
    return <View />
  }


  // Criar o botão para solicitar o acesso a camera
  if(!permission.granted){
    return (
        <SafeAreaView>
            <View className="flex justify-center items-center bg-primary h-full">
                <Text className="mt-5 text-lg text-white ">Precisamos de vossa autorização para tirar fotografias</Text>
                <CustomButton
                    handlePress={requestPermission}
                    title="Permitir Acesso" 
                    styledComponent="mt-5 mb-2"/>
            </View>
        </SafeAreaView>
    )
  }


  // Tirar a foto
  const __takePicture = async () => {
    console.log("Iniciando captura de imagem")
    if (!camera) return
    const photo = await camera.takePictureAsync({base64: true, quality:0.2})
    uploadImage(photo.uri)
    setPreviewVisible(true)
    setCapturedImage(photo)
    requestLocationPermission()
  }


  // Encaminhar a imagem para o supabase
  const uploadImage = async (uri) => {
    const response = await fetch(uri)
    const blob = await response.blob()
    const arrayBuffer = await new Response(blob).arrayBuffer()
    const fileName = `Picture_${Date.now()}.jpg`
    console.log("Iniciando envio para o bd")
    
    

    sendImage(uri, fileName, arrayBuffer)
    Alert.alert("Captura de Imagem", "Imagem salva com sucesso!")
    
  }

  const getCompleteAdress = async ({address_response}) => {
    console.log(address_response)
  }

  // ---------------------------------->> LOCALIZATION 
  const  requestLocationPermission = async () => {
    try {
        const { status } = await requestForegroundPermissionsAsync();
        if (status === 'granted') {

            // Obter a localização em coordenadas 
            const locationActual = await getCurrentPositionAsync()
            let lat =  locationActual.coords.latitude
            let long =  locationActual.coords.longitude



            // Obter o endereço
            Geocoder.init("AIzaSyAzde8vEAAns0Kia7RCtiAXaX8pv-_5fUE")
            Geocoder.from(lat, long)
            .then(json => {
                getCompleteAdress( json.results[0].address_components)
                const result_address = json.results[0].address_components;
                setAddress({
                    street: `${result_address[1].long_name} - ${result_address[0].long_name}`,
                    neighborhood: result_address[2].long_name,
                    city: result_address[3].long_name,
                    state: result_address[4].long_name
                })  
                getCompleteAdress(result_address)
            })
            
            console.log('Location permission granted', );
            return true
        } else {
          console.log('Location permission denied');
          return false
        }
    } catch (error) {
        console.warn('Error requesting location permission:', error);
        return false
    }
}

const getLocation = async () => {
  
}

  
  
  return (
    <View className="bg-primary flex h-full align-bottom justify-between">
      {previewVisible && capturedImage ? (
        <CameraPreview />
        
      ) : (
         <CameraView className="flex flex-col h-screen"  ref = {(r) => {camera = r}}>
         <CustomButton 
             handlePress={__takePicture}
             title="Tirar Fotografia"
             styledComponent="mb-3 ml-2 mr-2 mt-auto"
         />
       </CameraView>



      )} 
     
    </View>
  );
}

