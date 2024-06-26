import { CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useState,Image } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import CameraPreview from '../../components/CameraPreview';
import { sendImage, supabase } from './supabaseClient.js';


export default function camera() {

  const [facing, setFacing] = useState('back');

  const [permission, requestPermission] = useCameraPermissions()

  const [uriPhoto, setUriPhoto] = useState("")

  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)


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

  // ---------------------------------->> LOCALIZATION 
  
  
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

