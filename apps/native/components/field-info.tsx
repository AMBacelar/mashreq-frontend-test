import { Text } from "react-native";
import { FieldApi } from "@tanstack/react-form"
import { YStack } from "tamagui"
import { strings } from "../strings"

export const FieldInfo = ({ field }: { field: FieldApi<any, any, any, any> }) => {
  return (
    <YStack mb='$3'>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <Text>{field.state.meta.errors.join(',')}</Text>
      ) : null}
      {field.state.meta.isValidating ? <Text>{strings.en.validating}</Text> : null}
    </YStack>
  )
}