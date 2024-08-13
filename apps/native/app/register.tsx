import { Text, GestureResponderEvent } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Language, validators } from "@repo/shared";
import { useTheme, validCountries } from "../providers/theme";
import { CountrySelect } from "../components/country-select";
import { H1, Input, YStack } from "tamagui";
import { useForm } from '@tanstack/react-form';
import { yupValidator } from '@tanstack/yup-form-adapter'
import * as yup from 'yup'
import { useEffect } from "react";
import { strings } from '../strings';
import { Link } from "expo-router";
import { FieldInfo } from "../components/field-info";

const language: Language = 'en';

export const Register = () => {
  const { theme, country } = useTheme();

  const MyForm = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      country,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      alert(strings[language].formSubmitted);
    },
    validatorAdapter: yupValidator(),
  });

  useEffect(() => {
    const meta = MyForm.getFieldMeta('username');
    if (meta && !meta.isPristine && meta.isTouched && !meta.isValidating) {
      MyForm.validateField('username', 'change');
    }
  }, [country]);

  return (
    <YStack ai='center' jc='center' h='100%'>
      <H1 mb='$3'>Register - {theme}</H1>

      <MyForm.Field
        name="username"
        validators={{
          onChangeListenTo: ['country'],
          onBlurListenTo: ['country'],
          onChange: validators.registerUsernameSchemas(language)[MyForm.getFieldValue('country')],
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
        name="email"
        validators={{
          onChange: validators.registerEmailValidator(language),
        }}
        children={(field) => (
          <YStack w='80%'>
            <Text>{strings[language].emailLabel}</Text>
            <Input
              value={field.state.value}
              onChangeText={field.handleChange}
            />
            <FieldInfo field={field} />
          </YStack>
        )}
      />

      <MyForm.Field
        name="password"
        validators={{
          onChange: validators.registerPasswordValidator(language),
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

      <MyForm.Field
        name="confirmPassword"
        validators={{
          onChangeListenTo: ['password'],
          onChange: ({ value, fieldApi }) => {
            if (value !== fieldApi.form.getFieldValue('password')) {
              return strings[language].errors.confirmPasswordMismatch
            }
            return undefined
          },
        }}
        children={(field) => (
          <YStack w='80%'>
            <Text>{strings[language].confirmPasswordLabel}</Text>
            <Input
              value={field.state.value}
              onChangeText={field.handleChange}
              secureTextEntry
            />
            <FieldInfo field={field} />
          </YStack>
        )}
      />

      <MyForm.Field
        name="country"
        validators={{
          onChange: yup.string().oneOf(validCountries.map(c => c.code)).required(strings[language].errors.countryRequired)
        }}
        children={(field) => (
          <YStack w='80%' mb='$3'>
            <Text>{strings[language].countryLabel}</Text>
            <CountrySelect value={field.state.value} handleValueChange={(newVal) => {
              field.handleChange(newVal as any)
            }}
            />
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

      <Link href="/login"><Text>Already have an account? Log in!</Text></Link>
      <StatusBar style="auto" />
    </YStack>
  );
}

export default Register;
