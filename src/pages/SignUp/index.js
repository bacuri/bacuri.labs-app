import React, { useRef, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { ErrorMessage, Select } from '../../components/GlobalStyles';
import {
  Title,
  TermsAndConditions,
  TermsAndConditionsText,
  TermsAndConditionsLink,
  TermsAndConditionsLinkText,
  GoBack,
  GoBackText,
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

function SignUp() {
  const navigation = useNavigation();
  const { login } = useAuth();

  const signUpSchema = yup.object({
    name: yup.string().required('Nome é um campo obrigatório'),
    email: yup.string().required('E-mail é um campo obrigatório'),
    birth_date: yup.string().required('Aniversário é um campo obrigatório'),
    cpf: yup
      .string()
      .min(11, 'O CPF deve ter pelo menos 11 números')
      .required('CPF é um campo obrigatório'),
    gender: yup.string().required('Gênero é um campo obrigatório'),
    password: yup
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .required('Senha é um campo obrigatório'),
    confirm_password: yup
      .string()
      .min(6, 'A confirmação de senha deve ter pelo menos 6 caracteres')
      .required('Confirmação de senha é um campo obrigatório')
      .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais'),
  });

  const emailRef = useRef();
  const birthDateRef = useRef();
  const cpfRef = useRef();
  const genderRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  useEffect(() => {
    if (passwordRef) {
      passwordRef.current.setNativeProps({
        style: { fontFamily: 'roboto-regular' },
      });
      confirmPasswordRef.current.setNativeProps({
        style: { fontFamily: 'roboto-regular' },
      });
    }
  }, []);

  const handleSignUp = async (values, actions) => {
    const completeName = values.name.split(' ');

    const birthOfDate = `${values.birth_date
      .split('/')
      .reverse()
      .join('-')}T00:00:00.000Z`;

    const cpf = values.cpf.replace(/\D/g, '');

    const data = {
      platform: 'APP',
      role: 'DEFAULT',
      user: {
        firstName: completeName[0],
        lastName: completeName[completeName.length - 1],
        email: values.email,
        dateOfBirth: birthOfDate,
        cic: cpf,
        gender: values.gender,
        password: values.password,
      },
    };

    try {
      await api.post('/register', data);

      await login(values.email, values.password);
    } catch (error) {
      actions.setFieldError('general', error.message);
    }

    actions.setSubmitting(false);
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    touched,
    errors,
    values,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      birth_date: '',
      cpf: '',
      gender: '',
      password: '',
      confirm_password: '',
    },
    onSubmit: handleSignUp,
    validationSchema: signUpSchema,
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, padding: 20 }}
    >
      <Title>Olá, precisamos de suas informações para criar sua conta.</Title>
      <Input
        placeholder="NOME"
        onChangeText={handleChange('name')}
        value={values.name}
        onBlur={handleBlur('name')}
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current.focus()}
        blurOnSubmit={false}
      />
      {touched.name && errors.name && (
        <ErrorMessage>{errors.name}</ErrorMessage>
      )}

      <Input
        placeholder="E-MAIL"
        keyboardType="email-address"
        onChangeText={handleChange('email')}
        autoCapitalize="none"
        value={values.email}
        onBlur={handleBlur('email')}
        ref={emailRef}
        returnKeyType="next"
        onSubmitEditing={() => birthDateRef.current.focus()}
        blurOnSubmit={false}
      />
      {touched.email && errors.email && (
        <ErrorMessage>{errors.email}</ErrorMessage>
      )}

      <Input
        masked
        type="datetime"
        options={{
          format: 'DD/MM/YYYY',
        }}
        maxLength={10}
        placeholder="DATA DE NASCIMENTO"
        onChangeText={handleChange('birth_date')}
        value={values.birth_date}
        onBlur={handleBlur('birth_date')}
        ref={birthDateRef}
        returnKeyType="next"
        onSubmitEditing={() => cpfRef.current.focus()}
        blurOnSubmit={false}
      />
      {touched.birth_date && errors.birth_date && (
        <ErrorMessage>{errors.birth_date}</ErrorMessage>
      )}

      <Input
        masked
        type="cpf"
        maxLength={14}
        placeholder="CPF"
        onChangeText={handleChange('cpf')}
        value={values.cpf}
        onBlur={handleBlur('cpf')}
        ref={cpfRef}
        returnKeyType="next"
        onSubmitEditing={() => genderRef.current.focus()}
        blurOnSubmit={false}
      />
      {touched.cpf && errors.cpf && <ErrorMessage>{errors.cpf}</ErrorMessage>}

      <Select
        selectedValue={values.gender}
        onValueChange={itemValue => setFieldValue('gender', itemValue)}
        onBlur={handleBlur('gender')}
      >
        <Picker.Item label="GÊNERO" value="" />
        <Picker.Item label="MASCULINO" value="MALE" />
        <Picker.Item label="FEMININO" value="FEMALE" />
      </Select>
      {touched.gender && errors.gender && (
        <ErrorMessage>{errors.gender}</ErrorMessage>
      )}

      <Input
        placeholder="SENHA"
        secureTextEntry
        onChangeText={handleChange('password')}
        value={values.password}
        onBlur={handleBlur('password')}
        ref={passwordRef}
        returnKeyType="next"
        onSubmitEditing={() => confirmPasswordRef.current.focus()}
        blurOnSubmit={false}
      />
      {touched.password && errors.password && (
        <ErrorMessage>{errors.password}</ErrorMessage>
      )}

      <Input
        placeholder="CONFIRMAR SENHA"
        secureTextEntry
        onChangeText={handleChange('confirm_password')}
        value={values.confirm_password}
        onBlur={handleBlur('confirm_password')}
        ref={confirmPasswordRef}
      />
      {touched.confirm_password && errors.confirm_password && (
        <ErrorMessage>{errors.confirm_password}</ErrorMessage>
      )}

      <TermsAndConditions>
        <TermsAndConditionsText>
          Declaro que aceito os termos de uso.
        </TermsAndConditionsText>
        <TermsAndConditionsLink>
          <TermsAndConditionsLinkText>Ver termos</TermsAndConditionsLinkText>
        </TermsAndConditionsLink>
      </TermsAndConditions>

      {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}

      <Button onPress={handleSubmit} loading={isSubmitting}>
        Criar uma conta agora
      </Button>

      <GoBack onPress={() => navigation.goBack()}>
        <GoBackText>Voltar</GoBackText>
      </GoBack>
    </ScrollView>
  );
}

export default SignUp;
