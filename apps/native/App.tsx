import { StyleSheet, Text, TextInput, GestureResponderEvent } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@repo/ui";
import { ThemeProvider, useTheme, validCountries } from "./providers/theme";
import { CountrySelect } from "./components/country-select";
import { TamaguiProvider, YStack } from "tamagui";
import tamaguiConfig from './tamagui.config';
import { FieldApi, useForm } from '@tanstack/react-form';
import { yupValidator } from '@tanstack/yup-form-adapter'
import * as yup from 'yup'

const FieldInfo = ({ field }: { field: FieldApi<any, any, any, any> }) => {
  return (
    <YStack>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <Text>{field.state.meta.errors.join(',')}</Text>
      ) : null}
      {field.state.meta.isValidating ? <Text>'Validating...'</Text> : null}
    </YStack>
  )
}

const usernameSchemas = {
  'India': yup.string().required('Username is required').matches(/^[a-zA-Z].{6,}$/, 'Username must start with a letter and be at least 6 characters long'),
  'Portugal': yup.string().required('Username is required').min(5, 'Username must be at least 5 characters long'),
  'UAE': yup.string().required('Username is required').matches(/[a-zA-Z0-9].{5,}$/, 'Username must be alphanumeric and be at least 5 characters long'),
  'UK': yup.string().required('Username is required').min(5, 'Username must be at least 5 characters long'),
}

export function Native() {
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
      // Do something with form data
      console.log(value);
      alert('Form submitted');
    },
    validatorAdapter: yupValidator(),
  })

  return (
    <YStack ai='center' jc='center' h='100%'>
      <Text style={styles.header}>Native App with {theme}</Text>

      <MyForm.Field
        name="username"
        validators={{
          onChangeListenTo: ['country'],
          onChange: usernameSchemas[country],
        }}
        children={(field) => (
          <YStack w='80%'>
            <Text>Username</Text>
            <TextInput
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
          onChange: yup.string().email().required('Email is required'),
        }}
        children={(field) => (
          <YStack w='80%'>
            <Text>Email</Text>
            <TextInput
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
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            ),
        }}
        children={(field) => (
          <YStack w='80%'>
            <Text>Password</Text>
            <TextInput
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
              return 'Passwords do not match'
            }
            return undefined
          },
        }}
        children={(field) => (
          <YStack w='80%'>
            <Text>Confirm Password</Text>
            <TextInput
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
          onChange: yup.string().oneOf(validCountries.map(c => c.code)).required('Country is required')
        }}
        children={(field) => (
          <YStack w='80%'>
            <Text>County of Residence</Text>
            <CountrySelect value={field.state.value} handleValueChange={field.handleChange}
            />
          </YStack>
        )}
      />

      <MyForm.Subscribe
        selector={state => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            disabled={!canSubmit || isSubmitting}
            text={canSubmit ?
              isSubmitting ? "Submitting..." : "Register"
              : "can't submit yet"}
            onPress={(e: GestureResponderEvent) => {
              e.preventDefault();
              e.stopPropagation();
              MyForm.handleSubmit();
            }}
          />
        )}
      />
      <StatusBar style="auto" />
    </YStack>
  );
}

const App = () => {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <ThemeProvider>
        <Native />
      </ThemeProvider>
    </TamaguiProvider>
  )
}

export default App;

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
