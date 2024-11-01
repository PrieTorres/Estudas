"use client";
import { useState } from "react";
import { Container } from "./styles";
import Image, { StaticImageData } from "next/image";
import { TranslatedSpan } from "../TranslatedSpan";
import { ThemeProvider } from "styled-components";

export interface SafeImageProps {
  src: string | StaticImageData,
  text: string,
  height?: number,
}

export const SafeImage = ({
  src,
  text,
  height
}: SafeImageProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Container style={{ height }}>
      {!imageError ?
        <Image
          className="invert"
          unoptimized
          src={src}
          alt={text}
          onError={() => setImageError(true)}
        /> : <TranslatedSpan>{text}</TranslatedSpan>
      }
    </Container>
  );
};