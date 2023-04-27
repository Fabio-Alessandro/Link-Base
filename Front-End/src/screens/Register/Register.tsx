import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import axios from "axios";
import { ArrowBackIcon, Button, Text } from "native-base";
import { Title, Description, Input } from "./styles";
import { RegisterProps } from "../../../App";
import DropdownComponent from "../../components/Dropdown";
import { ScrollView } from "react-native-gesture-handler";

type RegisterUser = {
  user: {
    fullName: string;
    email: string;
    password: string;
    charge: string;
  };
  company: {
    name: string;
  };
};

export type DropdownOptions = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Form = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  company: string;
  charge: string;
};

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const [companies, setCompanies] = useState<DropdownOptions[]>([]);
  const [form, setForm] = useState<Form>({
    fullName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    company: "",
    charge: "",
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function requestCompanies() {
      try {
        const { data } = await axios.get(`${process.env.IP_ADDRESS}/companies`);
        setCompanies(data);
      } catch (error: any) {
        console.error(error.response.data);
      }
    }

    requestCompanies();
  }, []);

  useEffect(() => {
    setIsSubmitDisabled(true);

    const hasEmpty = Object.values(form).some((value) => value === "");

    if (hasEmpty) return;
    if (form.password === form.passwordConfirm) setIsSubmitDisabled(false);
  }, [form]);

  const handleInputChange = (key: keyof Form, value: string): void => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true)

    const { passwordConfirm, company, ...profileData } = form;
    const requestBody: RegisterUser = {
      user: { ...profileData },
      company: { name: company },
    };

    try {
      await axios.post(`${process.env.IP_ADDRESS}/users/register`, requestBody);

      setIsLoading(false)

      const title = "Aviso";
      const message = "¡Te has registrado con éxito!";

      Alert.alert(title, message, [
        {
          text: "Continuar",

          onPress: () => {
            navigation.navigate({ name: "Log In", params: { isAdmin: false } });
          },
        },
      ]);
    } catch (error: any) {
      setIsLoading(false)
      const title = "Aviso";
      const message = error.response.data;

      Alert.alert(title, message, [
        {
          text: "Regresar",

          onPress: () => {
            navigation.navigate("Register");
          },
        },
      ]);
    }
  };

  if (!companies.length) return null;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAwareScrollView
        style={{ backgroundColor: "#fff" }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{
          paddingTop: 80,
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        scrollEnabled={true}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Intro")}>
            <ArrowBackIcon
              size="6" 
              color="#464444" 
              style={{
                alignSelf: "flex-start",
                position: "absolute",
                top: 2,
                left: 40,
              }}
            />
          </TouchableOpacity>
          <Text
            mx="auto"
            mt="-1.5"
            mb="2"
            fontFamily="body"
            fontSize="3xl"
            fontWeight="700"
            color="#464444"
          >Registrarse</Text>
        </View>
        <Text mt="22" mb="41" px="16" fontFamily="body" fontWeight="400" textAlign="center">
          Crea una cuenta para empezar a conectar con proveedores cerca de ti
        </Text>
        <ScrollView>
          <Input
            placeholder="Nombre y Apellido"
            value={form.fullName}
            onChangeText={(value) => handleInputChange("fullName", value)}
          />
          <Input
            placeholder="Email"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
          <Input
            placeholder="Contraseña"
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => handleInputChange("password", value)}
          />
          <Input
            placeholder="Confirmar Contraseña"
            secureTextEntry={true}
            value={form.passwordConfirm}
            onChangeText={(value) =>
              handleInputChange("passwordConfirm", value)
            }
          />
          <DropdownComponent
            data={companies}
            placeholderName={"Nombre de la compañía"}
            formInput={"company"}
            onSelect={handleInputChange}
          />
          <Input
            placeholder="Puesto en la compañía"
            value={form.charge}
            onChangeText={(value) => handleInputChange("charge", value)}
          />
          <Button
            isLoading={isLoading}
            disabled={isSubmitDisabled ? isSubmitDisabled : isLoading}
            width="320"
            height="60"
            borderRadius="15"
            bg={isSubmitDisabled ? "#808080" : "#981D9A"}
            _pressed={{ bg: "#6f1570" }}
            onPress={handleSubmit}
          >
            <Text
              fontFamily="body"
              fontSize="lg"
              fontWeight="700"
              color="white"
            >
              Crear Cuenta
            </Text>
          </Button>
        </ScrollView>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Register;
