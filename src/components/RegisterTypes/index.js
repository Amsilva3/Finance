import React, { useState } from 'react';

import { RegisterContainer, RegisterTypeButton, RegisterLabel } from './styles';
import Feather from 'react-native-vector-icons/Feather';

export default function RegisterTypes({ type, sendTypeChanged }) {
  const [typeChecked, setTypeChecked] = useState(type);
  function changeType(name) {
    if (name === 'Eingaben') {
      setTypeChecked('Eingaben');
      sendTypeChanged('Eingaben');
    } else {
      setTypeChecked('Ausgaben');
      sendTypeChanged('Ausgaben');
    }
  }
  return (
    <RegisterContainer>
      <RegisterTypeButton
        checked={typeChecked === 'Eingaben' ? true : false}
        onPress={() => changeType('Eingaben')}
      >
        <Feather name="arrow-up" size={25} color="#121212" />
        <RegisterLabel>Eingaben</RegisterLabel>
      </RegisterTypeButton>

      <RegisterTypeButton
        checked={typeChecked === 'Ausgaben' ? true : false}
        onPress={() => changeType('Ausgaben')}
      >
        <Feather name="arrow-down" size={25} color="#121212" />
        <RegisterLabel>Ausgaben</RegisterLabel>
      </RegisterTypeButton>
    </RegisterContainer>
  );
}
