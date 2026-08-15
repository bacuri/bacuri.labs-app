import { useEffect, useRef } from 'react';
import { Keyboard, TextInput } from 'react-native';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { z } from 'zod';
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

import type { NavigationProp } from '../../@types/navigation';

interface LoginValues {
  email: string;
  password: string;
  general: string;
}

function Login() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const { login } = useAuth();

  const loginSchema = z.object({
    email: z
      .string()
      .min(1, t('validation.emailRequired'))
      .email(t('validation.emailInvalid')),
    password: z
      .string()
      .min(1, t('validation.passwordRequired'))
      .min(6, t('validation.passwordMin')),
    general: z.string(),
  });

  const passwordRef = useRef<TextInput>(null);

  useEffect(() => {
    passwordRef.current?.setNativeProps({
      style: { fontFamily: 'Roboto_400Regular' },
    });
  }, []);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid, touchedFields },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      general: '',
    },
    mode: 'onChange',
  });

  const handleLogin = async (values: LoginValues) => {
    Keyboard.dismiss();

    const { email, password } = values;

    try {
      await login(email, password);
    } catch (err) {
      if (axios.isAxiosError<{ error?: string }>(err)) {
        if (err.response?.data.error === 'invalid_grant')
          setError('general', { message: t('validation.invalidCredentials') });
      }
    }
  };

  return (
    <Container>
      <Edge
        width="300"
        height="180"
        style={{ position: 'absolute', top: 0, right: 0 }}
      />
      <Header>
        <Logo width="94" height="150" />
      </Header>

      {errors.general && <ErrorMessage>{errors.general.message}</ErrorMessage>}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder={t('login.emailPlaceholder')}
            keyboardType="email-address"
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      {touchedFields.email && errors.email && (
        <ErrorMessage>{errors.email.message}</ErrorMessage>
      )}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder={t('login.passwordPlaceholder')}
            secureTextEntry
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            ref={passwordRef}
            onSubmitEditing={() => handleSubmit(handleLogin)()}
          />
        )}
      />
      {touchedFields.password && errors.password && (
        <ErrorMessage>{errors.password.message}</ErrorMessage>
      )}

      <ForgotPassword>
        <ForgotPasswordText>{t('login.forgotPassword')}</ForgotPasswordText>
      </ForgotPassword>

      <Button
        onPress={handleSubmit(handleLogin)}
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
