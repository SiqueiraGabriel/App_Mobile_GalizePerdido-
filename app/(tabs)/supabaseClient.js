import 'react-native-url-polyfill'
import { createClient } from '@supabase/supabase-js'

export const config = {
    url: "https://arcxwhwpwwmexdoruemq.supabase.co",
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyY3h3aHdwd3dtZXhkb3J1ZW1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgzMTc4NDgsImV4cCI6MjAzMzg5Mzg0OH0.q8qWm3uLm25S1BpJs_IKvMdLZWvZu7WiJd-nIEBq724"
  
    //url: "https://zfbfmemdhmuthejffthp.supabase.co",
    //key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmYmZtZW1kaG11dGhlamZmdGhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwMjc3NTEsImV4cCI6MjAzMjYwMzc1MX0.R8rUVU0eBVhYrc4HEdKVn78FAk_j-4WA9qCNEofplO4"
  
  }

export const supabase = createClient(config.url, config.key)

export function sendImage(uri, fileName, arrayBuffer) {
    const { error } = supabase
      .storage
      .from('images_teste')
      .upload(fileName, arrayBuffer, {contentType: 'image/jpeg', upsert: false})
      console.log("Consegui enviar")
    if(error){
      console.log('Error uploading image: ', error)
    }
    
}


export function test(){

}