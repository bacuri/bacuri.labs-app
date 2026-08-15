import { useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { z } from 'zod';
import { Picker } from '@react-native-picker/picker';
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

import { createDependentProfile } from '../../services/user/user.service';

import type { NavigationProp } from '../../@types/navigation';

interface AddDependentValues {
  name: string;
  birth_date: string;
  cpf: string;
  gender: string;
  general: string;
}

function AddDependent() {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();

  const signUpSchema = z.object({
    name: z.string().min(1, t('validation.nameRequired')),
    birth_date: z.string().min(1, t('validation.birthDateRequired')),
    cpf: z
      .string()
      .min(1, t('validation.cpfRequired'))
      .min(11, t('validation.cpfMin')),
    gender: z.string().min(1, t('validation.genderRequired')),
    general: z.string(),
  });

  const birthDateRef = useRef<any>(null);
  const cpfRef = useRef<any>(null);

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<AddDependentValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      birth_date: '',
      cpf: '',
      gender: 'MALE',
      general: '',
    },
    mode: 'onChange',
  });

  const handleSignUp = async (values: AddDependentValues) => {
    try {
      const completeName = values.name.split(' ');

      const birthOfDate = `${values.birth_date
        .split('/')
        .reverse()
        .join('-')}T00:00:00.000Z`;

      const cpf = values.cpf.replace(/\D/g, '');
      const data = {
        profile: {
          firstName: completeName[0] ?? '',
          lastName: completeName[completeName.length - 1] ?? '',
          cic: cpf,
          dateOfBirth: birthOfDate,
          gender: values.gender,
          profile: 'PATIENT',
          image: 'DEFAULT',
        },
      };

      await createDependentProfile(data);

      navigation.goBack();
    } catch (error: any) {
      setError('general', { message: error.message });
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Container style={{ justifyContent: 'space-between' }}>
        <View>
          <Title>{t('addDependent.title')}</Title>

          <Label>{t('addDependent.nameLabel')}</Label>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder={t('addDependent.namePlaceholder')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() =>
                  birthDateRef.current?.getElement().focus()
                }
                blurOnSubmit={false}
              />
            )}
          />
          {touchedFields.name && errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}

          <Label>{t('addDependent.birthDateLabel')}</Label>
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
                textContentType="birthdate"
                maxLength={10}
                placeholder={t('addDependent.birthDatePlaceholder')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                ref={birthDateRef}
                returnKeyType="next"
                onSubmitEditing={() => cpfRef.current?.getElement().focus()}
                blurOnSubmit={false}
              />
            )}
          />
          {touchedFields.birth_date && errors.birth_date && (
            <ErrorMessage>{errors.birth_date.message}</ErrorMessage>
          )}

          <Label>{t('addDependent.cpfLabel')}</Label>
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                masked
                type="cpf"
                maxLength={14}
                placeholder={t('addDependent.cpfPlaceholder')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                ref={cpfRef}
              />
            )}
          />
          {touchedFields.cpf && errors.cpf && (
            <ErrorMessage>{errors.cpf.message}</ErrorMessage>
          )}

          <Label>{t('addDependent.genderLabel')}</Label>
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                mode="dropdown"
                selectedValue={value}
                onValueChange={onChange}
                onBlur={onBlur}
                dropdownIconColor="#FFFFFF"
              >
                <Picker.Item
                  label={t('addDependent.genderMale')}
                  value="MALE"
                />
                <Picker.Item
                  label={t('addDependent.genderFemale')}
                  value="FEMALE"
                />
              </Select>
            )}
          />
          {touchedFields.gender && errors.gender && (
            <ErrorMessage>{errors.gender.message}</ErrorMessage>
          )}

          {errors.general && (
            <ErrorMessage>{errors.general.message}</ErrorMessage>
          )}
        </View>

        <View>
          <Button onPress={handleSubmit(handleSignUp)} loading={isSubmitting}>
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
