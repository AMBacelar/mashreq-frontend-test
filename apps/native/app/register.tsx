import { StyleSheet, Text, GestureResponderEvent } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@repo/ui";
import { useTheme, validCountries } from "../providers/theme";
import { CountrySelect } from "../components/country-select";
import { Input, YStack } from "tamagui";
import { FieldApi, useForm } from '@tanstack/react-form';
import { yupValidator } from '@tanstack/yup-form-adapter'
import * as yup from 'yup'
import { useEffect, useMemo } from "react";
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
      alert(strings.en.formSubmitted);
    },
    validatorAdapter: yupValidator(),
  });

  const usernameSchemas = useMemo(() => ({
    'India': yup.string().required(strings.en.errors.usernameRequired)
      .matches(/^[a-zA-Z].{5,}$/, strings.en.usernameSchemaMessages.India),
    'Portugal': yup.string().required(strings.en.errors.usernameRequired)
      .min(5, strings.en.usernameSchemaMessages.Portugal),
    'UAE': yup.string().required(strings.en.errors.usernameRequired)
      .matches(/[a-zA-Z0-9].{4,}$/, strings.en.usernameSchemaMessages.UAE),
    'UK': yup.string().required(strings.en.errors.usernameRequired)
      .min(5, strings.en.usernameSchemaMessages.UK),
  }), []);

  useEffect(() => {
    const meta = MyForm.getFieldMeta('username');
    if (meta && !meta.isPristine && meta.isTouched && !meta.isValidating) {
      MyForm.validateField('username', 'change');
    }
  }, [country]);

  return (
    <YStack ai='center' jc='center' h='100%'>
      <Text style={styles.header}>Register - {theme}</Text>

      <MyForm.Field
        name="username"
        validators={{
          onChangeListenTo: ['country'],
          onBlurListenTo: ['country'],
          onChange: usernameSchemas[MyForm.getFieldValue('country')],
        }}
        children={(field) => (
          <YStack w='80%'>
            <Text>{strings.en.usernameLabel}</Text>
            <Input
              value={field.state.value}
              onChangeText={(newVal) => {
                field.handleChange(newVal)
              }}
              style={styles.input}
            />
            <FieldInfo field={field} />
          </YStack>
        )}
      />

      <MyForm.Field
        name="email"
        validators={{
          onChange: yup.string().email().required(strings.en.errors.emailRequired),
        }}
        children={(field) => (
          <YStack w='80%'>
            <Text>{strings.en.emailLabel}</Text>
            <Input
              value={field.state.value}
              onChangeText={field.handleChange}
              style={styles.input}
            />
            <FieldInfo field={field} />
          </YStack>
        )}
      />

      <MyForm.Field
        name="password"
        validators={{
          onChange: yup.string()
            .required(strings.en.errors.passwordRequired)
            .min(8, strings.en.errors.passwordTooShort)
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              strings.en.errors.passwordComplexity
            ),
        }}
        children={(field) => (
          <YStack w='80%'>
            <Text>{strings.en.passwordLabel}</Text>
            <Input
              value={field.state.value}
              onChangeText={field.handleChange}
              style={styles.input}
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
              return strings.en.errors.confirmPasswordMismatch
            }
            return undefined
          },
        }}
        children={(field) => (
          <YStack w='80%'>
            <Text>{strings.en.confirmPasswordLabel}</Text>
            <Input
              value={field.state.value}
              onChangeText={field.handleChange}
              style={styles.input}
              secureTextEntry
            />
            <FieldInfo field={field} />
          </YStack>
        )}
      />

      <MyForm.Field
        name="country"
        validators={{
          onChange: yup.string().oneOf(validCountries.map(c => c.code)).required(strings.en.errors.countryRequired)
        }}
        children={(field) => (
          <YStack w='80%' mb='$3'>
            <Text>{strings.en.countryLabel}</Text>
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

      <Link href="/login"><Text>Already have an account? Log in!</Text></Link>
      <StatusBar style="auto" />
    </YStack>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 36,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  }
});
