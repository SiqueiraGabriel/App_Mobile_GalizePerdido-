import { View, Text, Alert , Image, CheckBox} from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import {Permissions, Location} from 'expo';
import CustomButton from '../components/CustomButton';


// Localização
import Geolocation from 'react-native-geolocation-service'
import {requestForegroundPermissionsAsync, getCurrentPosition, getCurrentPositionAsync} from 'expo-location';
import Geocoder from "react-native-geocoding"

const CameraPreview = ({photo}) => {

    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]

    const [data, setData] = useState(null)
    
    
    if(data == null){
        let d = getHora()
        setData(d["data_completa"])
    };

    function getHora(){
        let data = new Date()

        let dia = data.getDay()
        let mes = data.getMonth()
        let ano = data.getFullYear()
        let hora = data.getHours()
        let minuto = data.getMinutes()
        let diaSemana = diasSemana[data.getUTCDay()-1]

        return {
            "dia": dia,
            "mes": mes, 
            "ano": ano,
            "hora": hora,
            "minuto": minuto,
            "data_completa": `${diaSemana} ${dia}/${mes}/${ano} \n ${hora}:${minuto}`
        }
    }
    


    // ------------------------------- LOCATION
    const [location, setLocation] = useState(false)
    const [address, setAddress] = useState(false)
    

    //request permission
    const  requestLocationPermission = async () => {
        try {
            const { status } = await requestForegroundPermissionsAsync();
            if (status === 'granted') {

                // Obter a localização em coordenadas 
                const locationActual = await getCurrentPositionAsync()
                setLocation({
                    "latitude": locationActual.coords.latitude,
                    "longitude": locationActual.coords.longitude
                });
                Geocoder.init("AIzaSyAzde8vEAAns0Kia7RCtiAXaX8pv-_5fUE")
                // Obter o endereço

                let lat =  location.latitude
                let long =  location.longitude

                // Obter o endereço 
                Geocoder.from(lat, long)
                .then(json => {
                    const address = json.results[0];

                    
                    console.log('Address:', address.long_name);
                    setAddress({
                        "street": address.address_components[0]
                    })
                })

                console.log('Location permission granted');
                console.log(location)

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

    



  // ---------------------------------->>

    

    const [tipoAnimal, setTipoAnimal] = useState()

  console.log("Entrando no camera preview")
    
  return (
    <SafeAreaView>
        <View className="bg-primary justify-center items-center">
            <Image 
                source={{uri:"https://th.bing.com/th/id/OIP.BD-axKm2_LAjwrhrwg-JoAHaE8?rs=1&pid=ImgDetMain"}}
                className="h-[450px] w-[450px] mt-2"
                resizeMode='contain'
            />
            <View className="bg-secondary-100 w-full mt-2 items-center p-5">
                <Text className="text-white font-psemibold text-center" >Rua Luiz Fernando Hastreiter 180, {'\n'}São Bento do Sul, SC, {'\n'}89283-081</Text>
            </View>
            
            <View className="bg-secondary-100 w-full mt-2 items-center p-5">
                <Text className="text-white font-psemibold text-center" >{data}</Text>
            </View>
            <View>
            <CustomButton 
             handlePress={requestLocationPermission}
             title="Tirar Fotografia"
             styledComponent="mb-3 ml-2 mr-2 mt-auto"
         />
                
            </View>
            
        </View>
    </SafeAreaView>
    
  )
}

export default CameraPreview