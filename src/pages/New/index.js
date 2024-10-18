import React, { useState } from 'react';
import { Background, Input, SubmitButton, SubmitText } from './style';

import { Keyboard, SafeAreaView, TouchableWithoutFeedback, Alert } from 'react-native';

import Header from '../../components/Header';
import RegisterTypes from '../../components/RegisterTypes';
import api from '../../services/api';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

export default function New() {
  const navigation = useNavigation();
  const [labelInput, setLabelInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [type, setType] = useState('Eingaben');

  let Euro = valueInput.toLocaleString('en-DE', {
    style: 'currency',
    currency: 'EUR',
  });

  function handleSubmit() {
    Keyboard.dismiss();
    if (isNaN(parseFloat(Euro)) || type === null) {
      alert('Füllen Sie alle Felder aus');
      return;
    }

    Alert.alert(
      'Bestätigen der eingegebenen Daten',
      `Typ: ${type} - Wert: € ${parseFloat(Euro).toFixed(2)} - Datum:  ${format(new Date(), 'dd/MM/yyyy')}`,
      [
        {
          text: 'Abbrechen',
          style: 'cancel',
        },
        {
          text: 'Weiter',
          onPress: () => handleAdd(),
        },
      ]
    );
  }

  async function handleAdd() {
    Keyboard.dismiss();
    await api.post('/receive', {
      description: labelInput,
      value: Number(Euro),
      type: type,
      date: format(new Date(), 'dd/MM/yyyy'),
    });
    setLabelInput('');
    setValueInput('');
    alert('Erfolgreich registriert!');
    navigation.navigate('Home');
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header title="Registrierung" />

        <SafeAreaView style={{ marginTop: 14, alignItems: 'center' }}>
          <Input
            placeholder="Beschreibung des Registers"
            value={labelInput}
            onChangeText={(text) => setLabelInput(text)}
          />
          <Input
            placeholder="Gewünschten Wert"
            keyboardType="numeric"
            value={Euro}
            onChangeText={(text) => setValueInput(text)}
          />
          <RegisterTypes type={type} sendTypeChanged={(item) => setType(item)} />
          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrieren</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}
