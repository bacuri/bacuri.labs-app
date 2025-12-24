import { useRef, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
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
import { register } from '../../services/authService';

function SignUp() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { login } = useAuth();

  const signUpSchema = yup.object({
    name: yup.string().required(t('validation.nameRequired')),
    email: yup.string().required(t('validation.emailRequired')),
    birth_date: yup.string().required(t('validation.birthDateRequired')),
    cpf: yup
      .string()
      .min(11, t('validation.cpfMin'))
      .required(t('validation.cpfRequired')),
    gender: yup.string().required(t('validation.genderRequired')),
    password: yup
      .string()
      .min(6, t('validation.passwordMin'))
      .required(t('validation.passwordRequired')),
    confirm_password: yup
      .string()
      .min(6, t('validation.confirmPasswordMin'))
      .required(t('validation.confirmPasswordRequired'))
      .oneOf([yup.ref('password'), null], t('validation.passwordsMustMatch')),
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
      await register(data);

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
      gender: 'MALE',
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
      <Title>{t('signup.title')}</Title>

      <Label>{t('signup.nameLabel')}</Label>
      <Input
        placeholder={t('signup.namePlaceholder')}
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

      <Label>{t('signup.emailLabel')}</Label>
      <Input
        placeholder={t('signup.emailPlaceholder')}
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

      <Label>{t('signup.birthDateLabel')}</Label>
      <Input
        masked
        type="datetime"
        options={{
          format: 'DD/MM/YYYY',
        }}
        maxLength={10}
        placeholder={t('signup.birthDatePlaceholder')}
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

      <Label>{t('signup.cpfLabel')}</Label>
      <Input
        masked
        type="cpf"
        maxLength={14}
        placeholder={t('signup.cpfPlaceholder')}
        onChangeText={handleChange('cpf')}
        value={values.cpf}
        onBlur={handleBlur('cpf')}
        ref={cpfRef}
        returnKeyType="next"
        onSubmitEditing={() => genderRef.current.focus()}
        blurOnSubmit={false}
      />
      {touched.cpf && errors.cpf && <ErrorMessage>{errors.cpf}</ErrorMessage>}

      <Label>{t('signup.genderLabel')}</Label>
      <Select
        selectedValue={values.gender}
        onValueChange={itemValue => setFieldValue('gender', itemValue)}
        onBlur={handleBlur('gender')}
      >
        <Picker.Item label={t('signup.genderMale')} value="MALE" />
        <Picker.Item label={t('signup.genderFemale')} value="FEMALE" />
      </Select>
      {touched.gender && errors.gender && (
        <ErrorMessage>{errors.gender}</ErrorMessage>
      )}

      <Label>{t('signup.passwordLabel')}</Label>
      <Input
        placeholder={t('signup.passwordPlaceholder')}
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

      <Label>{t('signup.confirmPasswordLabel')}</Label>
      <Input
        placeholder={t('signup.confirmPasswordPlaceholder')}
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
        <TermsAndConditionsText>{t('signup.termsText')}</TermsAndConditionsText>
        <TermsAndConditionsLink>
          <TermsAndConditionsLinkText>
            {t('signup.termsLink')}
          </TermsAndConditionsLinkText>
        </TermsAndConditionsLink>
      </TermsAndConditions>

      {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}

      <Button onPress={handleSubmit} loading={isSubmitting}>
        {t('signup.createAccount')}
      </Button>

      <GoBack onPress={() => navigation.goBack()}>
        <GoBackText>{t('signup.goBack')}</GoBackText>
      </GoBack>
    </ScrollView>
  );
}

export default SignUp;
