import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('@FinanzenToken');
      if (storageUser) {
        const response = await api
          .get('/me', {
            headers: {
              Authorization: `Bearer ${storageUser}`,
            },
          })
          .catch(() => {
            setUser(null);
          });
        api.defaults.headers['Authorization'] = `Bearer ${storageUser}`;
        setUser(response.data);
        setLoading(false);
      }
      setLoading(false);
    }
    loadStorage();
  }, []);

  async function signUp(email, password, nome) {
    setLoadingAuth(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await api.post('/users', {
        name: nome,
        password: password,
        email: email,
      });
      setLoadingAuth(false);
      alert('Benutzer erfolgreich registriert!!!');
      navigation.goBack();
    } catch (err) {
      console.log('Fehler bei der Registrierung', err);
      setLoadingAuth(false);
    }
  }
  async function signIn(email, password) {
    setLoadingAuth(true);
    try {
      // eslint-disable-next-line prettier/prettier
      const response = await api.post('/login', {
        email: email,
        password: password,
      });
      const { id, name, token } = response.data;
      // eslint-disable-next-line no-unused-vars
      const data = {
        id,
        name,
        token,
        email,
      };

      await AsyncStorage.setItem('@FinanzenToken', token);

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
      });
      setLoadingAuth(false);
    } catch (err) {
      console.log('Anmeldefehler', err);
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }
  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signUp,
        signIn,
        signOut,
        loadingAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
