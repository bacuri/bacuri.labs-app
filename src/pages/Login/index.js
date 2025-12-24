import { useEffect, useRef } from 'react';
import { Keyboard } from 'react-native';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Container, Input, ErrorMessage } from '../../components/GlobalStyles';
import {
  Header,
  ForgotPassword,
  ForgotPasswordText,
  SignUp,
  SignUpText,
  SignUpLink,
  SignUpLinkText,
} from './styles';
import Button from '../../components/Button';

import Logo from '../../assets/logo.svg';
import Edge from '../../assets/canto.svg';

import { useAuth } from '../../contexts/auth';

function Login() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { login } = useAuth();

  const loginSchema = yup.object({
    email: yup
      .string()
      .email(t('validation.emailInvalid'))
      .required(t('validation.emailRequired')),
    password: yup
      .string()
      .min(6, t('validation.passwordMin'))
      .required(t('validation.passwordRequired')),
  });

  const passwordRef = useRef();

  useEffect(() => {
    if (passwordRef) {
      passwordRef.current.setNativeProps({
        style: { fontFamily: 'Roboto_400Regular' },
      });
    }
  }, []);

  const handleLogin = async (values, actions) => {
    Keyboard.dismiss();

    const { email, password } = values;

    try {
      await login(email, password);
    } catch (err) {
      const { error } = err.response.data;

      if (error === 'invalid_grant')
        actions.setFieldError('general', t('validation.invalidCredentials'));

      actions.setSubmitting(false);
    }
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
      <Edge
        width="300"
        height="180"
        style={{ position: 'absolute', top: 0, right: 0 }}
      />
      <Header>
        <Logo width="150" height="150" />
      </Header>

      {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}

      <Input
        placeholder={t('login.emailPlaceholder')}
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
        placeholder={t('login.passwordPlaceholder')}
        secureTextEntry
        ref={passwordRef}
        autoCapitalize="none"
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        value={values.password}
        onSubmitEditing={handleSubmit}
      />
      {touched.password && errors.password && (
        <ErrorMessage>{errors.password}</ErrorMessage>
      )}

      <ForgotPassword>
        <ForgotPasswordText>{t('login.forgotPassword')}</ForgotPasswordText>
      </ForgotPassword>

      <Button
        onPress={handleSubmit}
        loading={isSubmitting}
        disabled={!isValid || isSubmitting}
      >
        {t('login.submit')}
      </Button>

      <SignUp>
        <SignUpText>{t('login.noAccount')}</SignUpText>
        <SignUpLink>
          <SignUpLinkText onPress={() => navigation.navigate('SignUp')}>
            {t('login.createAccountNow')}
          </SignUpLinkText>
        </SignUpLink>
      </SignUp>
    </Container>
  );
}

export default Login;
