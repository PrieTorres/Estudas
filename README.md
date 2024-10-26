<h1>Instruções</h1>

<h2>Como rodar o projeto<h2>

<ul>
  <li>Certifique-se de ter NPM instalado ``node -v``<li>
  <li>Instale as dependencias ``npm i``<li>
  <li>Configure o .env (entre em contato com o adm do projeto)<li>
  <li>Execute localmente ``npm run dev``<li>
<ul>


<h2>Como criar/alterar um curso<h2>

<h3>alterar conteúdo do curso<h3>
os cursos estão armezenados em metadata no banco de dados mongodb
para a criação/modificação de cursos foi criada uma api no projeto responsável por receber um metadata em transformar em curso
o arquivo no projeto que pode ser importado no postman para utilização da api está em public/postman, importe o arquivo JSON
a api só vai funcionar com o local em execução, algumas rotas fazem o uso de checar o token, 
para saber o token confira o arquivo env no projeto a chave AUTH_TOKEN e utilize esse token como bearer no authentication do postman

<h3>alterar estilos do curso<h3>
sempre crie uma branch para qualquer alteração e solicite review do pr quando finalizado
os estilos são feitos utilizando styledComponents, é recomendado instalar a extenção do VS code para visualizar como css esses arquivos
dentro de cada pasta de componente e algumas de páginas do cite existe o arquivo styles.ts que é o styledComponent que pode ser entendido como um scss
de preferência a usar valores contido no arquivo theme.ts dentro da pasta Styles
o tailwind pode ser utilizado dentro de componentes tambem, mas de preferência a só utilizá-lo se já conhecer
