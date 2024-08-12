import { Text, GestureResponderEvent } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@repo/ui";
import { useTheme } from "../providers/theme";
import { H1, Input, YStack } from "tamagui";
import { FieldApi, useForm } from '@tanstack/react-form';
import { yupValidator } from '@tanstack/yup-form-adapter'
import * as yup from 'yup'
import { strings } from '../strings';
import { Link } from "expo-router";

const FieldInfo = ({ field }: { field: FieldApi<any, any, any, any> }) => {
  return (
    <YStack mb='$3'>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <Text>{field.state.meta.errors.join(',')}</Text>
      ) : null}
      {field.state.meta.isValidating ? <Text>{strings.en.validating}</Text> : null}
    </YStack>
  )
}

export const Login = () => {
  const { theme } = useTheme();

  const MyForm = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      console.log(value);

    },
    validatorAdapter: yupValidator(),
  });

  return (
    <YStack ai='center' jc='center' h='100%'>
      <H1 mb="$3">Login - {theme}</H1>

      <MyForm.Field
        name="username"
        validators={{
          onChange: yup.string().required(strings.en.errors.usernameRequired),
        }}
        children={(field) => (
          <YStack w='80%'>
            <Text>{strings.en.usernameLabel}</Text>
            <Input
              value={field.state.value}
              onChangeText={(newVal) => {
                field.handleChange(newVal)
              }}
            />
            <FieldInfo field={field} />
          </YStack>
        )}
      />

      <MyForm.Field
        name="password"
        validators={{
          onChange: yup.string()
            .required(strings.en.errors.passwordRequired),
        }}
        children={(field) => (
          <YStack w='80%'>
            <Text>{strings.en.passwordLabel}</Text>
            <Input
              value={field.state.value}
              onChangeText={field.handleChange}
              secureTextEntry
            />
            <FieldInfo field={field} />
          </YStack>
        )}
      />

      <MyForm.Subscribe
        selector={state => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <YStack mb='$3'>
            <Button
              disabled={!canSubmit || isSubmitting}
              text={canSubmit ?
                isSubmitting ? strings.en.submittingButton : strings.en.submitButton
                : strings.en.cantSubmitButton}
              onPress={(e: GestureResponderEvent) => {
                e.preventDefault();
                e.stopPropagation();
                MyForm.handleSubmit();
              }}
            />
          </YStack>
        )}
      />

      <Link href="/register"><Text>Not registered? Create an account!</Text></Link>
      <StatusBar style="auto" />
    </YStack>
  );
}

export default Login;
