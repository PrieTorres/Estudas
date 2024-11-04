"use client";

import { Section } from "@/components/Section";
import { useContext } from "react";
import { LoadingSection } from "@/components/LoadingSection";
import { PageContext } from "@/context/pageContext";
import { Container } from "./styles";
import { Login } from "@/components/Login";

export default function LoginPage() {
 
  return (
    <Container>
      <Login/>
    </Container>
  );
}
