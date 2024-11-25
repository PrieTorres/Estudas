"use client";
import { use, useEffect, useState } from "react";
import { Container } from "./styles";
import Image, { StaticImageData } from "next/image";
import { TranslatedSpan } from "../TranslatedSpan";
import { ThemeProvider } from "styled-components";
import { useThemeContext } from "../Provider/Provider";



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
  const um=useThemeContext();
  return (
    <Container style={{ height }}>
      {!imageError ?
        <div className={um.isLight ?"invert" :""}>
          <Image
            className="grayscale"
            unoptimized
            src={src}
            alt={text}
            onError={() => setImageError(true)}
            /> 
        </div>
          : <TranslatedSpan>{text}</TranslatedSpan>
      }
    </Container>
  );
};