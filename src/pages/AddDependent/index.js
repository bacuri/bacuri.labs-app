import React, { useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
// import { Picker } from '@react-native-picker/picker';
import { Container, ErrorMessage, Select } from '../../components/GlobalStyles';
import { Title, GoBack, GoBackText } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

function AddDependent() {
  const navigation = useNavigation();

  const signUpSchema = yup.object({
    name: yup.string().required('Nome é um campo obrigatório'),
    birth_date: yup.string().required('Aniversário é um campo obrigatório'),
    cpf: yup
      .string()
      .min(11, 'O CPF deve ter pelo menos 11 números')
      .required('CPF é um campo obrigatório'),
    gender: yup.string().required('Gênero é um campo obrigatório'),
  });

  const emailRef = useRef();
  const birthDateRef = useRef();
  const cpfRef = useRef();
  const genderRef = useRef();

  const handleSignUp = (values, actions) => {
    alert(JSON.stringify(values));

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
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Container style={{ justifyContent: 'space-between' }}>
        <View>
          <Title>
            Olá, precisamos de algumas informações para cadastrar um dependente.
          </Title>

          <Input
            placeholder="NOME"
            onChangeText={handleChange('name')}
            value={values.name}
            onBlur={handleBlur('name')}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            blurOnSubmit={false}
          />
          {touched.name && errors.name && (
            <ErrorMessage>{errors.name}</ErrorMessage>
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
          {touched.cpf && errors.cpf && (
            <ErrorMessage>{errors.cpf}</ErrorMessage>
          )}

          <Select
            mode="dropdown"
            selectedValue={values.gender}
            onValueChange={itemValue => setFieldValue('gender', itemValue)}
            onBlur={handleBlur('gender')}
            dropdownIconColor="#FFFFFF"
          >
            <Select.Item label="GÊNERO" value="" />
            <Select.Item label="MASCULINO" value="masculino" />
            <Select.Item label="FEMININO" value="feminino" />
          </Select>
          {touched.gender && errors.gender && (
            <ErrorMessage>{errors.gender}</ErrorMessage>
          )}
        </View>

        <View>
          <Button onPress={handleSubmit} loading={isSubmitting}>
            Criar dependente
          </Button>

          <GoBack onPress={() => navigation.goBack()}>
            <GoBackText>Voltar</GoBackText>
          </GoBack>
        </View>
      </Container>
    </ScrollView>
  );
}

export default AddDependent;
