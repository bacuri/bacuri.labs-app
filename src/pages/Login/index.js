import React, { useEffect, useRef } from 'react';
import { Keyboard } from 'react-native';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { Container, Input, ErrorMessage } from '../../components/GlobalStyles';
import {
  Header,
  Logo,
  Edge,
  ForgotPassword,
  ForgotPasswordText,
  SignUp,
  SignUpText,
  SignUpLink,
  SignUpLinkText,
} from './styles';

import Button from '../../components/Button';

function Login() {
  const navigation = useNavigation();

  const loginSchema = yup.object({
    email: yup
      .string()
      .email('O e-mail deve ser válido')
      .required('E-mail é um campo obrigatório'),
    password: yup
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .required('Senha é um campo obrigatório'),
  });

  const passwordRef = useRef();

  useEffect(() => {
    if (passwordRef) {
      passwordRef.current.setNativeProps({
        style: { fontFamily: 'roboto-regular' },
      });
    }
  }, []);

  const handleLogin = (values, actions) => {
    Keyboard.dismiss();

    alert(JSON.stringify(values));

    actions.setSubmitting(false);
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isValid,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: handleLogin,
  });

  return (
    <Container>
      <Edge />
      <Header>
        <Logo />
      </Header>
      <Input
        placeholder="E-MAIL"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        value={values.email}
      />
      {touched.email && errors.email && (
        <ErrorMessage>{errors.email}</ErrorMessage>
      )}
      <Input
        placeholder="SENHA"
        secureTextEntry
        ref={passwordRef}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        value={values.password}
        onSubmitEditing={handleSubmit}
      />
      {touched.password && errors.password && (
        <ErrorMessage>{errors.password}</ErrorMessage>
      )}

      <ForgotPassword>
        <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
      </ForgotPassword>

      <Button
        onPress={handleSubmit}
        loading={isSubmitting}
        disabled={!isValid || isSubmitting}
      >
        Entrar
      </Button>

      <SignUp>
        <SignUpText>Ainda não tem cadastro? </SignUpText>
        <SignUpLink>
          <SignUpLinkText onPress={() => navigation.navigate('SignUp')}>
            Crie uma conta agora
          </SignUpLinkText>
        </SignUpLink>
      </SignUp>

      {/* <SignUpText>ou entre com</SignUpText> */}
    </Container>
  );
}

export default Login;
