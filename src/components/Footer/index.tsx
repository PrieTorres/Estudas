import { ReactElement } from 'react';
import { Container } from './styles';
import { TranslatedSpan } from '../TranslatedSpan';

export const Footer = (): ReactElement => {

  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", gap: 4 }}>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <div>&copy; </div>
        <TranslatedSpan>all_rights_reserved</TranslatedSpan>
        <div> Católica, Jaraguá do Sul 2024</div>
      </div>
    </Container>
  )
};