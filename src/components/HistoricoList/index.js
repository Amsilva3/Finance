import React from 'react';
import { TipoText, Container, Tipo, IconView, ValorText } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableWithoutFeedback, Alert } from 'react-native';

export default function HistoricoList({ data, deleteItem }) {
  function handleDeleteItem() {
    Alert.alert('Achtung', 'wollen Sie diesen Datensatz wirklich löschen?', [
      {
        text: 'Abbrechen',
        style: 'cancel',
      },
      {
        text: 'Weiter',
        onPress: () => deleteItem(data.id),
      },
    ]);
  }

  return (
    <TouchableWithoutFeedback onLongPress={handleDeleteItem}>
      <Container>
        <Tipo>
          <IconView tipo={data.type}>
            <Icon
              name={data.type === 'Ausgaben' ? 'arrow-down' : 'arrow-up'}
              size={20}
              color="#FFF"
            />
            <TipoText>{data.type}</TipoText>
          </IconView>
        </Tipo>
        <ValorText>{data.value} €</ValorText>
      </Container>
    </TouchableWithoutFeedback>
  );
}
