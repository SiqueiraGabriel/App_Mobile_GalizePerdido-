import { View, Text , CheckBox} from 'react-native'
import React from 'react'

const CustomCheckBox = ({isSelect, setSelection, text}) => {
  return (
    <View>
      <CheckBox
        value={isSelect}
        onValueChange={setSelection}
      />
      <Text>{text}</Text>
    </View>
  )
}

export default CustomCheckBox