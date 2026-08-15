import { useRef, useEffect } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { z } from 'zod';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { ErrorMessage, Label, Select } from '../../components/GlobalStyles';
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
import { register as registerUser } from '../../services/auth/auth.service';

import type { NavigationProp } from '../../@types/navigation';

interface SignUpValues {
  name: string;
  email: string;
  birth_date: string;
  cpf: string;
  gender: string;
  password: string;
  confirm_password: string;
  general: string;
}

function SignUp() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const { login } = useAuth();

  const signUpSchema = z
    .object({
      name: z.string().min(1, t('validation.nameRequired')),
      email: z.string().min(1, t('validation.emailRequired')),
      birth_date: z.string().min(1, t('validation.birthDateRequired')),
      cpf: z
        .string()
        .min(1, t('validation.cpfRequired'))
        .min(11, t('validation.cpfMin')),
      gender: z.string().min(1, t('validation.genderRequired')),
      password: z
        .string()
        .min(1, t('validation.passwordRequired'))
        .min(6, t('validation.passwordMin')),
      confirm_password: z
        .string()
        .min(1, t('validation.confirmPasswordRequired'))
        .min(6, t('validation.confirmPasswordMin')),
      general: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: t('validation.passwordsMustMatch'),
      path: ['confirm_password'],
    });

  const emailRef = useRef<TextInput>(null);
  const birthDateRef = useRef<any>(null);
  const cpfRef = useRef<any>(null);
  const genderRef = useRef<any>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  useEffect(() => {
    passwordRef.current?.setNativeProps({
      style: { fontFamily: 'roboto-regular' },
    });
    confirmPasswordRef.current?.setNativeProps({
      style: { fontFamily: 'roboto-regular' },
    });
  }, []);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      birth_date: '',
      cpf: '',
      gender: 'MALE',
      password: '',
      confirm_password: '',
      general: '',
    },
    mode: 'onChange',
  });

  const handleSignUp = async (values: SignUpValues) => {
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
        firstName: completeName[0] ?? '',
        lastName: completeName[completeName.length - 1] ?? '',
        email: values.email,
        dateOfBirth: birthOfDate,
        cic: cpf,
        gender: values.gender,
        password: values.password,
      },
    };

    try {
      await registerUser(data);

      await login(values.email, values.password);
    } catch (error: any) {
      setError('general', { message: error.message });
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, padding: 20 }}
    >
      <Title>{t('signup.title')}</Title>

      <Label>{t('signup.nameLabel')}</Label>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder={t('signup.namePlaceholder')}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            blurOnSubmit={false}
          />
        )}
      />
      {touchedFields.name && errors.name && (
        <ErrorMessage>{errors.name.message}</ErrorMessage>
      )}

      <Label>{t('signup.emailLabel')}</Label>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder={t('signup.emailPlaceholder')}
            keyboardType="email-address"
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => birthDateRef.current?.focus()}
            blurOnSubmit={false}
          />
        )}
      />
      {touchedFields.email && errors.email && (
        <ErrorMessage>{errors.email.message}</ErrorMessage>
      )}

      <Label>{t('signup.birthDateLabel')}</Label>
      <Controller
        control={control}
        name="birth_date"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            masked
            type="datetime"
            options={{
              format: 'DD/MM/YYYY',
            }}
            maxLength={10}
            placeholder={t('signup.birthDatePlaceholder')}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            ref={birthDateRef}
            returnKeyType="next"
            onSubmitEditing={() => cpfRef.current?.focus()}
            blurOnSubmit={false}
          />
        )}
      />
      {touchedFields.birth_date && errors.birth_date && (
        <ErrorMessage>{errors.birth_date.message}</ErrorMessage>
      )}

      <Label>{t('signup.cpfLabel')}</Label>
      <Controller
        control={control}
        name="cpf"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            masked
            type="cpf"
            maxLength={14}
            placeholder={t('signup.cpfPlaceholder')}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            ref={cpfRef}
            returnKeyType="next"
            onSubmitEditing={() => genderRef.current?.focus()}
            blurOnSubmit={false}
          />
        )}
      />
      {touchedFields.cpf && errors.cpf && (
        <ErrorMessage>{errors.cpf.message}</ErrorMessage>
      )}

      <Label>{t('signup.genderLabel')}</Label>
      <Controller
        control={control}
        name="gender"
        render={({ field: { onChange, onBlur, value } }) => (
          <Select
            selectedValue={value}
            onValueChange={onChange}
            onBlur={onBlur}
          >
            <Picker.Item label={t('signup.genderMale')} value="MALE" />
            <Picker.Item label={t('signup.genderFemale')} value="FEMALE" />
          </Select>
        )}
      />
      {touchedFields.gender && errors.gender && (
        <ErrorMessage>{errors.gender.message}</ErrorMessage>
      )}

      <Label>{t('signup.passwordLabel')}</Label>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder={t('signup.passwordPlaceholder')}
            secureTextEntry
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            blurOnSubmit={false}
          />
        )}
      />
      {touchedFields.password && errors.password && (
        <ErrorMessage>{errors.password.message}</ErrorMessage>
      )}

      <Label>{t('signup.confirmPasswordLabel')}</Label>
      <Controller
        control={control}
        name="confirm_password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder={t('signup.confirmPasswordPlaceholder')}
            secureTextEntry
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            ref={confirmPasswordRef}
          />
        )}
      />
      {touchedFields.confirm_password && errors.confirm_password && (
        <ErrorMessage>{errors.confirm_password.message}</ErrorMessage>
      )}

      <TermsAndConditions>
        <TermsAndConditionsText>{t('signup.termsText')}</TermsAndConditionsText>
        <TermsAndConditionsLink>
          <TermsAndConditionsLinkText>
            {t('signup.termsLink')}
          </TermsAndConditionsLinkText>
        </TermsAndConditionsLink>
      </TermsAndConditions>

      {errors.general && <ErrorMessage>{errors.general.message}</ErrorMessage>}

      <Button onPress={handleSubmit(handleSignUp)} loading={isSubmitting}>
        {t('signup.createAccount')}
      </Button>

      <GoBack onPress={() => navigation.goBack()}>
        <GoBackText>{t('signup.goBack')}</GoBackText>
      </GoBack>
    </ScrollView>
  );
}

export default SignUp;
