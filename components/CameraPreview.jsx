import { View, Text, Alert , Image, CheckBox} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'

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
       
    

    

    const [tipoAnimal, setTipoAnimal] = useState()

  console.log("Entrando no camera preview")
    
  return (
    <SafeAreaView>
        <View className="bg-primary justify-center items-center">
            <Image 
                source={{uri: photo && photo.uri}}
                className="h-[450px] w-[450px] mt-2"
                resizeMode='contain'
            />
            <View className="bg-secondary-100 w-full mt-2 items-center p-5">
                <Text className="text-white font-psemibold text-center" >Rua Luiz Fernando Hastreiter 180, {'\n'}São Bento do Sul, SC, {'\n'}89283-081</Text>
            </View>
            <View className="bg-secondary-100 w-full mt-2 items-center p-5">
                <Text className="text-white font-psemibold text-center" >Sex. 29/05/2024 {'\n'} 9:45</Text>
            </View>
            <View className="bg-secondary-100 w-full mt-2 items-center p-5">
                <Text className="text-white font-psemibold text-center" >{data}</Text>
            </View>
            <View>
                
            </View>
            
        </View>
    </SafeAreaView>
    
  )
}

export default CameraPreview