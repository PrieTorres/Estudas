"use client";

import { Section } from "@/components/Section";
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
