import { Text, GestureResponderEvent } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Language, validators } from "@repo/shared";
import { useTheme } from "../providers/theme";
import { H1, Input, YStack } from "tamagui";
import { useForm } from '@tanstack/react-form';
import { yupValidator } from '@tanstack/yup-form-adapter'
import { strings } from '../strings';
import { Link } from "expo-router";
import { FieldInfo } from "../components/field-info";

const language: Language = 'en';

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
          onChange: validators.loginUsernameValidator(language),
        }}
        children={(field) => (
          <YStack w='80%'>
            <Text>{strings[language].usernameLabel}</Text>
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
          onChange: validators.loginPasswordValidator(language),
        }}
        children={(field) => (
          <YStack w='80%'>
            <Text>{strings[language].passwordLabel}</Text>
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
                isSubmitting ? strings[language].submittingButton : strings[language].submitButton
                : strings[language].cantSubmitButton}
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
