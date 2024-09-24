import { ReactElement } from 'react';
import { Container } from './styles';
import { SafeImage, SafeImageProps } from '../SafeImage';
import profileImg from "@/assets/img/gato_dando_joia.jpg";

interface CardParticipantProps {
  name: string;
  description: string;
  imgProps?: SafeImageProps;
}

const defaultImg = {
  text: "profile image",
  src: profileImg
}

export const CardParticipant = ({ name, description, imgProps = defaultImg }: CardParticipantProps): ReactElement => {

  return (
    <Container>
      <SafeImage {...imgProps} />
      <h2>{name}</h2>
      <p>{description}</p>
    </Container>
  );
};