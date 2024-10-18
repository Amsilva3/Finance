import React, { useMemo } from 'react';
import { Container, Label, Balance } from './styles';

export default function BalanceItem({ data }) {
  const labelName = useMemo(() => {
    if (data.tag === 'Kontostand') {
      return {
        label: 'Kontostand',
        color: '3b3dbf',
      };
    } else if (data.tag === 'Eingaben') {
      return {
        label: 'Eingaben',
        color: '00b94a',
      };
    } else {
      return {
        label: 'Ausgaben',
        color: 'EF463a',
      };
    }
  }, [data]);

  return (
    <Container bg={labelName.color}>
      <Label> {labelName.label} </Label>
      <Balance>
        {data.Kontostand.toLocaleString('en-DE', {
          style: 'currency',
          currency: 'EUR',
        })}
      </Balance>
    </Container>
  );
}
