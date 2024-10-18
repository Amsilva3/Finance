import React, { useState, useContext } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import {
  Background,
  Container,
  Logo,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
  Link,
  LinkText,
} from './styles';
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

export default function SignIn() {
  const navigation = useNavigation();
  const { signIn, loadingAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    signIn(email, password);
  }
  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
        <Logo source={require('../../assets/Logo.png')} />
        <AreaInput>
          <Input placeholder="E-mail" value={email} onChangeText={(text) => setEmail(text)} />
        </AreaInput>
        <AreaInput>
          <Input
            placeholder="Kennwort"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </AreaInput>
        <SubmitButton activeOpacity={0.8} onPress={handleLogin}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF" />
          ) : (
            <SubmitText>Einloggen</SubmitText>
          )}
        </SubmitButton>
        <Link onPress={() => navigation.navigate('SignUp')}>
          <LinkText> Ein Konto erstellen</LinkText>
        </Link>
      </Container>
    </Background>
  );
}
