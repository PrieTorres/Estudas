import { SafeImage } from "@/components/SafeImage";
import { Section } from "@/components/Section";

const AboutPage = () => {
  return (
    <Section>
      <article style={{ marginBottom: 20, padding: 12 }}>
        <h1>Um pouco sobre o projeto</h1>
        <p style={{ marginBottom: 20 }}>
          O projeto tem o objetivo de trazer conhecimentos básicos sobre programação a qualquer um que tenha o interesse de aprender
          de maneira gratuita e fácil, pelo seu principal objetivo ser algo que ajude a comunidade.
          Montamos o conteúdo com base em como aprendemos e nossa maneira de explicar a iniciantes, o site foi desenvolvido em sala
          pensando no propósito de ensinar a comunidade, todo o conteúdo está sempre apto a atualizações e complementações.
        </p>
        <p>
          Esperamos que tenham um bom aprendizado {"<3"}
        </p>
      </article>
      <article>
        <h1>Um pouco sobre nós</h1>
        <div>
          <article>
            <SafeImage />
            <h2>Priscila Torres</h2>
            <p>
              Desenvolvedora do site, estudante no 1 semestre de engenharia de software, responsável por todo e qualquer possível bug no site (foi mal)
            </p>
          </article>
        </div>
      </article>
    </Section>
  );
};

export default AboutPage;