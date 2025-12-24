import React, { useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import {
  Container,
  ErrorMessage,
  Label,
  Select,
} from '../../components/GlobalStyles';
import { Title, GoBack, GoBackText } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { createDependentProfile } from '../../services/userService';

function AddDependent() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const signUpSchema = yup.object({
    name: yup.string().required(t('validation.nameRequired')),
    birth_date: yup.string().required(t('validation.birthDateRequired')),
    cpf: yup
      .string()
      .min(11, t('validation.cpfMin'))
      .required(t('validation.cpfRequired')),
    gender: yup.string().required(t('validation.genderRequired')),
  });

  const birthDateRef = useRef();
  const cpfRef = useRef();

  const handleSignUp = async (values, actions) => {
    try {
      const completeName = values.name.split(' ');

      const birthOfDate = `${values.birth_date
        .split('/')
        .reverse()
        .join('-')}T00:00:00.000Z`;

      const cpf = values.cpf.replace(/\D/g, '');
      const data = {
        profile: {
          firstName: completeName[0],
          lastName: completeName[completeName.length - 1],
          cic: cpf,
          dateOfBirth: birthOfDate,
          gender: values.gender,
          profile: 'PATIENT',
          image: 'DEFAULT',
        },
      };

      await createDependentProfile(data);

      navigation.goBack();
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
      birth_date: '',
      cpf: '',
      gender: 'MALE',
    },
    onSubmit: handleSignUp,
    validationSchema: signUpSchema,
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Container style={{ justifyContent: 'space-between' }}>
        <View>
          <Title>{t('addDependent.title')}</Title>

          <Label>{t('addDependent.nameLabel')}</Label>
          <Input
            placeholder={t('addDependent.namePlaceholder')}
            onChangeText={handleChange('name')}
            value={values.name}
            onBlur={handleBlur('name')}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => birthDateRef.current.getElement().focus()}
            blurOnSubmit={false}
          />
          {touched.name && errors.name && (
            <ErrorMessage>{errors.name}</ErrorMessage>
          )}

          <Label>{t('addDependent.birthDateLabel')}</Label>
          <Input
            masked
            type="datetime"
            options={{
              format: 'DD/MM/YYYY',
            }}
            textContentType="birthdate"
            maxLength={10}
            placeholder={t('addDependent.birthDatePlaceholder')}
            onChangeText={handleChange('birth_date')}
            value={values.birth_date}
            onBlur={handleBlur('birth_date')}
            ref={birthDateRef}
            returnKeyType="next"
            onSubmitEditing={() => cpfRef.current.getElement().focus()}
            blurOnSubmit={false}
          />
          {touched.birth_date && errors.birth_date && (
            <ErrorMessage>{errors.birth_date}</ErrorMessage>
          )}

          <Label>{t('addDependent.cpfLabel')}</Label>
          <Input
            masked
            type="cpf"
            maxLength={14}
            placeholder={t('addDependent.cpfPlaceholder')}
            onChangeText={handleChange('cpf')}
            value={values.cpf}
            onBlur={handleBlur('cpf')}
            ref={cpfRef}
          />
          {touched.cpf && errors.cpf && (
            <ErrorMessage>{errors.cpf}</ErrorMessage>
          )}

          <Label>{t('addDependent.genderLabel')}</Label>
          <Select
            mode="dropdown"
            selectedValue={values.gender}
            onValueChange={itemValue => setFieldValue('gender', itemValue)}
            onBlur={handleBlur('gender')}
            dropdownIconColor="#FFFFFF"
          >
            <Select.Item label={t('addDependent.genderMale')} value="MALE" />
            <Select.Item label={t('addDependent.genderFemale')} value="FEMALE" />
          </Select>
          {touched.gender && errors.gender && (
            <ErrorMessage>{errors.gender}</ErrorMessage>
          )}

          {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
        </View>

        <View>
          <Button onPress={handleSubmit} loading={isSubmitting}>
            {t('addDependent.createDependent')}
          </Button>

          <GoBack onPress={() => navigation.goBack()}>
            <GoBackText>{t('addDependent.goBack')}</GoBackText>
          </GoBack>
        </View>
      </Container>
    </ScrollView>
  );
}

export default AddDependent;
