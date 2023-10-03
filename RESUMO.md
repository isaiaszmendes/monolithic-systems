# monolithic-systems

### O que é uma aplicação monolítica?

* Aplicações "tradicionais"
* "tudo em um"
* "Unidade de deployment"

### Polemica por trás das aplicações monolíticas

* Aplicações da década passada
* Ultrapassada
* Não escalam
* Impedem o crescimento do negócio
* Alto acoplamento

Grande parte desses argumentos são FALSOS!

<!-- Aula [Monoliticos em primeiro Lugar] -->
### Quando utilizar monolíticos pode ser uma boa

* Novos projetos onde o modelo de negócio não está claro
* Instabilidade no core do negoócio
* Evitar complexidade no processo de deploy
* Equipe pequena
* Evitar complexidade na operação

"Martim Fowler" - "Monoith First"


<!-- Aula [Tipos monolitos] -->

### Tipos de sistemas monoíticos

* "single process" [Foco do curso]
* Monoliticos distribuidos
* Black box

### Single process: caracteristicas
* Alto acoplamento
* Modular 
* Modular com bancos de dados segregados


<!-- Aula [Sistemas monolíticos modulares] -->

DDD é um ponto de partida

* Podemos definir bounded context, separando a aplicação em módulos, pra evitar acoplamento

Módulos possuem isolamento

* Módulos quebrados em "bounded context"
* Conversam através de contratos e facades
* Entidades podem ser "dupliadas" tendo apenas os atributos necessários para o contexto
"Entidade é algo que pode ser identificado por um ID"

Posso ter um User que tem o mesmo ID
do User do outro módulo, mas com atributos diferentes

O User do modulo Aluno pode ter atributos diferentes do User do modulo Professor

* Equipes especializadas por módulos
Mesmo estando na mesma aplicação, cada módulo pode ser desenvolvido por uma equipe diferente pois estão em contextos diferentes
* Alta coesão: O que muda junto, permanece junto


<!-- Aula [E os Microsserviços] -->
### Sistemas monolíticos modulares

* Um único deploy
* Única operação
* Observabilidade simplificada
* Sistemas se comunicando internamente
* Única linguagem. Menos governança


# DDD - Domain Driven Design

DDD tbm tem subdominio

* Subdominio é um contexto isolado

Devemos evitar ao máximo acoplamento, mesmo sendo sistemas monolíticos