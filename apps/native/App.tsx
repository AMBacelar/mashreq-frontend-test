import { StyleSheet, Text, View, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@repo/ui";
import { useState } from "react";
import { ThemeProvider, useTheme } from "./providers/theme";
import { CountrySelect } from "./components/country-select";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from './tamagui.config';

export function Native() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Native App with {theme}</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Type something here..."
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password..."
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="confirm password..."
        secureTextEntry={true}
      />

      <CountrySelect />

      {/* <Picker
        style={{ width: "100%" }}
        mode="dropdown"
        selectedValue={country}
        onValueChange={(itemValue, itemIndex) =>
          setCountry(itemValue)
        }>
        <Picker.Item label="United Arab Emirates" value="UAE" />
        <Picker.Item label="India" value="India" />
        <Picker.Item label="United Kingdom" value="UK" />
        <Picker.Item label="Portugal" value="Portugal" />
      </Picker> */}

      <Button
        onClick={() => {
          console.log("Pressed!");
          alert("Pressed!");
        }}
        text="Register"
      />
      <StatusBar style="auto" />
    </View>
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
    marginBottom: 20,
    width: "80%",
  }
});
