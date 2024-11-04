"use client";

import { Section } from "@/components/Section";
import { useContext } from "react";
import { LoadingSection } from "@/components/LoadingSection";
import { PageContext } from "@/context/pageContext";
import { SignUp } from "@/components/SingUP_IN";
import { Container } from "./styles";

export default function SignInPage() {

  return (
    <Container>
      <Section>
        <SignUp />
      </Section>
    </Container>
  );
}
