import React, { useContext } from 'react';
import { Container, Message, Name, NewLink, NewText, LogoutButton, LogoutText } from './styles';
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const { signOut, user } = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <Container>
      <Header title="Mein Profil" />
      <Message>Willkommen</Message>
      <Name numberOfLines={1}>{user && user.name}</Name>
      <NewLink onPress={() => navigation.navigate('Register')}>
        <NewText>Buchung</NewText>
      </NewLink>
      <LogoutButton onPress={() => signOut()}>
        <LogoutText>Ausloggen</LogoutText>
      </LogoutButton>
    </Container>
  );
}
