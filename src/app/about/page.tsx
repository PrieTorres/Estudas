import { CardParticipant } from "@/components/CardParticipant";
import { Section } from "@/components/Section";
import pato from "@/assets/img/pato_programador.png";
import pinguim from "@/assets/img/pinguim.png";
import guaxi from "@/assets/img/guaxi.png";
import gato from "@/assets/img/gato_estudas.png";
import ornito from "@/assets/img/ornitorrinco.png";

const members = [
  {
    name: "Gabriel Tissi",
    description: "Responsável por montar o conteúdo de comandos de entrada e saída e laços de repetição",
    src: ornito
  },
  {
    name: "Bruno Schimiguel",
    description: "Responsável por montar o conteúdo de Lógica de programação e Linguagem de programaçao em C",
    src: pinguim
  },
  {
    name: "Renan",
    description: "Responsável por montar o conteúdo de Bibliotecas básicas em C e Declaração de variáveis",
    src: guaxi
  },
  {
    name: "Erick Andreas Ponticelli",
    description: "Responsável por montar o conteúdo de Condicionais",
    src: gato
  },
  {
    name: "Priscila Torres",
    description: "Desenvolvedora do site, responsável por todo e qualquer possível bug no site",
    src: pato
  },

];

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
      <section style={{ padding: 12 }}>
        <h1>Um pouco sobre nós</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }} className="max-sm:justify-center">
          {members.map((member, i) =>
            <div key={`member_${i}`}>
              <CardParticipant
                name={member.name}
                description={member.description}
                imgProps={{ src: member.src, text: `${member.name} profile` }}
              />
            </div>)}
        </div>
      </section>
    </Section>
  );
};

export default AboutPage;