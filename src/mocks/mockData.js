export const mockPartidos = [
  {
    id_partido: 1, nombre: "Partido del Futuro", descripcion: "Enfocado en sostenibilidad e innovación escolar.",
    bandera_url: null, gobierno_id: 1, creador_id: 100, votos: 46, color: "#C9A2D6",
    miembros: [
      { id_miembro: 1, id_estudiante: 100, nombre: "María del Carmen", cargo: "presidente" },
      { id_miembro: 2, id_estudiante: 101, nombre: "Valeria Mora", cargo: "secretario" },
    ],
    propuestas: [
      { id_propuesta: 1, titulo: "Reciclaje en todas las aulas", descripcion: "Colocar contenedores separados por tipo de residuo." },
      { id_propuesta: 2, titulo: "Rincones de estudio al aire libre", descripcion: "Habilitar zonas verdes con mesas para estudiar entre clases." },
    ],
  },
  {
    id_partido: 2, nombre: "Partido Voz Estudiantil", descripcion: "Más espacios de participación, deporte y bienestar.",
    bandera_url: null, gobierno_id: 1, creador_id: 102, votos: 38, color: "#6FC79A",
    miembros: [
      { id_miembro: 3, id_estudiante: 102, nombre: "María del Carmen", cargo: "presidente" },
    ],
    propuestas: [
      { id_propuesta: 3, titulo: "Torneo intercolegial mensual", descripcion: "Organizar torneos deportivos una vez al mes." },
    ],
  },
  {
    id_partido: 3, nombre: "Partido Unidos Avanzamos", descripcion: "Inclusión y acompañamiento entre estudiantes.",
    bandera_url: null, gobierno_id: 1, creador_id: 104, votos: 27, color: "#E05A5A",
    miembros: [
      { id_miembro: 4, id_estudiante: 104, nombre: "María del Carmen", cargo: "presidente" },
    ],
    propuestas: [
      { id_propuesta: 4, titulo: "Programa de mentores entre pares", descripcion: "Estudiantes de niveles superiores acompañan a los más nuevos." },
    ],
  },
  {
    id_partido: 4, nombre: "Partido Nueva Generación", descripcion: "Tecnología y comunicación estudiantil.",
    bandera_url: null, gobierno_id: 1, creador_id: 106, votos: 19, color: "#D66A8D",
    miembros: [
      { id_miembro: 5, id_estudiante: 106, nombre: "María del Carmen", cargo: "presidente" },
    ],
    propuestas: [
      { id_propuesta: 5, titulo: "Boletín digital estudiantil", descripcion: "Un espacio mensual con noticias del colegio hechas por estudiantes." },
    ],
  },
  {
    id_partido: 5, nombre: "Partido Raíces", descripcion: "Cultura, arte y tradición en el colegio.",
    bandera_url: null, gobierno_id: 1, creador_id: 108, votos: 14, color: "#F4B942",
    miembros: [
      { id_miembro: 6, id_estudiante: 108, nombre: "María del Carmen", cargo: "presidente" },
    ],
    propuestas: [
      { id_propuesta: 6, titulo: "Festival cultural anual", descripcion: "Un día para mostrar talentos, danza, música y arte del estudiantado." },
    ],
  },
];

export const mockModulosVotacion = [
  {
    id: 1,
    numero: 1,
    icono: "banco",
    color: "#F3D9E1",
    nombre: "Sistema político",
    resumen: "Conoce cómo funciona la democracia costarricense, quién gobierna y cómo se eligen.",
    datoClave: "Costa Rica no tiene ejército desde 1948, lo que le permite invertir esos recursos en educación y salud.",
    puntosClave: [
      "El poder viene del pueblo y se ejerce mediante representantes elegidos.",
      "Existen tres poderes independientes que se vigilan entre sí.",
      "Los períodos de gobierno son fijos: nadie se queda más tiempo del que la Constitución permite.",
    ],
    contenido: `Costa Rica es una república democrática, unitaria y representativa. Esto significa
que el poder no está en manos de una sola persona: el pueblo elige a quienes lo representan
mediante el voto, y esas personas gobiernan por un período definido (cuatro años, en el caso
de la Presidencia y las diputaciones).

El poder se organiza en tres ramas independientes entre sí —Ejecutivo, Legislativo y
Judicial— para que ninguna concentre demasiada autoridad. A esto se le llama separación de
poderes, y sirve para que cada rama vigile a las demás.

La Constitución Política de 1949 es la norma más importante del país: en ella se definen los
derechos de las personas y las reglas que debe seguir el gobierno. Ninguna ley, decreto ni
autoridad puede contradecirla.

Costa Rica es reconocida internacionalmente como una de las democracias más estables de
América Latina, con elecciones ininterrumpidas desde 1953 y una larga tradición de alternancia
pacífica en el poder.

En un gobierno estudiantil pasa algo parecido: cuando tu colegio elige un gobierno
estudiantil, ese grupo representa a todo el estudiantado y debe rendir cuentas de sus
decisiones, igual que un gobierno nacional.`,
  },
  {
    id: 2,
    numero: 2,
    icono: "voto",
    color: "#C9A2D6",
    nombre: "¿Cómo votar?",
    resumen: "Paso a paso para emitir el voto correctamente y qué hace válido o nulo un voto.",
    datoClave: "El voto en Costa Rica es universal, secreto y libre: nadie puede obligarte a votar por una opción ni averiguar por quién votaste.",
    puntosClave: [
      "Necesitas tu cédula (o carné) vigente para poder votar.",
      "Marcas tu opción a solas, dentro de la cámara secreta.",
      "El voto en blanco cuenta y es una forma válida de participar.",
    ],
    contenido: `Votar es un proceso sencillo, pero cada paso importa:

1. Verificas tu identidad con tu cédula (o carné, en el caso del simulacro escolar).
2. Recibes la papeleta oficial dentro del recinto de votación.
3. Entras solo/a a la cámara secreta para marcar tu opción sin que nadie te vea.
4. Marcas una sola opción con una equis o marca clara dentro del recuadro del partido elegido.
5. Doblas la papeleta y la depositas tú mismo/a en la urna transparente.

Un voto es válido cuando marca claramente una sola opción. Es nulo cuando tiene marcas en
más de una opción, cuando está roto o rayado de forma que no se entiende la intención de
quien votó, o cuando trae mensajes o dibujos ajenos a la papeleta. El voto en blanco es
válido: es una forma de participar sin apoyar a ninguna opción.

Al cierre de la votación, las juntas receptoras cuentan los votos frente a los fiscales de
cada partido, para que el conteo sea transparente y cualquier persona pueda verificarlo. Los
resultados se declaran solo cuando ese conteo queda documentado y firmado.

Practicar este proceso en el colegio —con boleta, cámara secreta y urna propias— ayuda a
perder el miedo a votar y a entender por qué cada uno de estos pasos protege tu decisión.`,
  },
  {
    id: 3,
    numero: 3,
    icono: "balanza",
    color: "#B7E6CC",
    nombre: "Funciones del TSE",
    resumen: "Qué hace el Tribunal Supremo de Elecciones y por qué garantiza elecciones transparentes.",
    datoClave: "El TSE es considerado un \"cuarto poder\" en Costa Rica, con el mismo rango que el Ejecutivo, el Legislativo y el Judicial.",
    puntosClave: [
      "Es un órgano independiente: ningún gobierno de turno puede manipularlo.",
      "Organiza las elecciones y también emite la cédula de identidad.",
      "Resuelve los conflictos entre partidos políticos antes y después de votar.",
    ],
    contenido: `El Tribunal Supremo de Elecciones (TSE) es el órgano encargado de organizar, dirigir y
vigilar todos los actos relativos al sufragio en Costa Rica. Es independiente de los otros
poderes del Estado, precisamente para que ningún gobierno de turno pueda manipular una
elección.

Entre sus funciones están: mantener el padrón electoral (el registro de quién puede votar),
emitir la cédula de identidad, organizar y fiscalizar los procesos electorales, resolver
conflictos entre partidos políticos, y declarar los resultados oficiales.

El TSE también inscribe legalmente a los partidos políticos, revisa que cumplan los
requisitos para participar, y fiscaliza cómo financian sus campañas, para que ningún partido
tenga una ventaja indebida por recibir dinero de forma irregular.

Además, el TSE promueve la educación cívica en escuelas y colegios de todo el país, mediante
programas y simulacros como este, para que las nuevas generaciones lleguen a su primera
elección real sabiendo cómo funciona el proceso.

En un simulacro escolar, el equivalente sería un comité neutral —por ejemplo, un grupo de
docentes o estudiantes de otros grados— que organiza la votación y cuenta los votos sin
favorecer a ningún partido estudiantil.`,
  },
  {
    id: 4,
    numero: 4,
    icono: "gobierno",
    color: "#A9E0D3",
    nombre: "Poderes del Estado",
    resumen: "Ejecutivo, Legislativo y Judicial, con funciones y ejemplos.",
    datoClave: "La Asamblea Legislativa tiene 57 diputaciones, elegidas por provincia según su cantidad de población.",
    puntosClave: [
      "Ejecutivo: gobierna y aplica las leyes en el día a día.",
      "Legislativo: crea y aprueba las leyes, y fiscaliza al Ejecutivo.",
      "Judicial: resuelve conflictos e imparte justicia de forma independiente.",
    ],
    contenido: `Poder Ejecutivo: lo integran la Presidencia, las Vicepresidencias y los ministerios.
Se encarga de ejecutar las leyes y administrar el país día a día (seguridad, salud,
educación, etc.).

Poder Legislativo: lo forma la Asamblea Legislativa, con 57 diputados y diputadas. Su
función principal es crear, reformar y derogar leyes, además de aprobar el presupuesto
nacional y fiscalizar al Ejecutivo.

Poder Judicial: administra justicia de forma independiente, a través de juzgados y
tribunales. Resuelve conflictos y sanciona el incumplimiento de las leyes.

A estos tres se suma, como se vio en el módulo anterior, el Tribunal Supremo de Elecciones,
que en Costa Rica funciona con independencia similar a la de un cuarto poder, dedicado
exclusivamente a los temas electorales.

Ningún poder puede hacer todo lo que quiera: existen "pesos y contrapesos" entre ellos, como
que la Asamblea puede rechazar el presupuesto que propone el Ejecutivo, o que la Sala
Constitucional (parte del Poder Judicial) puede anular una ley si viola la Constitución.

En un gobierno estudiantil, la presidencia y sus compañeros de directiva serían el
"Ejecutivo", una asamblea de representantes de cada sección sería el "Legislativo", y un
comité disciplinario o de convivencia cumpliría un rol parecido al "Judicial".`,
  },
  {
    id: 5,
    numero: 5,
    icono: "partidos",
    color: "#F3D9E1",
    nombre: "Partidos políticos",
    resumen: "Qué son, cómo se organizan y qué proponen a la ciudadanía.",
    datoClave: "Para inscribirse ante el TSE, un partido debe presentar sus estatutos, su ideología y un plan de trabajo por escrito.",
    puntosClave: [
      "Un partido agrupa personas con ideas afines sobre cómo gobernar.",
      "Tiene estructura interna, propuestas y un símbolo o color distintivo.",
      "Sus propuestas deben poder evaluarse: qué cambiarían y cómo lo harían.",
    ],
    contenido: `Un partido político es un grupo de personas que comparten ideas sobre cómo debería
gobernarse un país (o un colegio) y se organizan para proponer candidatos y candidatas a
elección popular.

Cada partido tiene una estructura interna (presidencia, secretaría, tesorería, entre otros
cargos), un plan de trabajo o "propuestas", y un símbolo o color que lo identifica en la
papeleta.

Los partidos también tienen una ideología o visión general: algunos priorizan más el papel
del Estado en la economía, otros prefieren más iniciativa privada; algunos enfatizan temas
ambientales, otros temas sociales o de seguridad. Ninguna postura es "la correcta": lo
importante es que puedas identificar cuál se acerca más a lo que te importa a vos.

Cuando analizas un partido antes de votar, es útil fijarte en: quiénes lo integran, qué
propuestas concretas presentan, si esas propuestas responden a problemas reales de tu
comunidad o colegio, y si son realistas de cumplir en el tiempo que dura el gobierno.

En el simulacro de tu colegio, cada partido estudiantil funciona igual: tiene una directiva,
un color que lo representa y propuestas concretas para mejorar la vida escolar, que podés
revisar antes de decidir tu voto.`,
  },
  {
    id: 6,
    numero: 6,
    icono: "lista",
    color: "#BFD9F2",
    nombre: "Tipos de elecciones",
    resumen: "Presidenciales, municipales, diputaciones y referendos: cuándo y para qué sirve cada una.",
    datoClave: "Las elecciones municipales se celebran en fecha distinta a las nacionales, precisamente para que cada tema reciba su propia atención.",
    puntosClave: [
      "Nacionales: eligen Presidencia, Vicepresidencias y diputaciones cada 4 años.",
      "Municipales: eligen alcaldías y concejos, también cada 4 años.",
      "Referendo: consulta directa a la ciudadanía sobre una ley concreta.",
    ],
    contenido: `En Costa Rica existen distintos tipos de procesos electorales:

- Elecciones presidenciales y legislativas: cada cuatro años se elige a la Presidencia,
  las dos Vicepresidencias y las 57 diputaciones, todas el mismo día.
- Elecciones municipales: se eligen alcaldías, concejos municipales y otros cargos locales,
  también cada cuatro años, en fecha distinta a las nacionales.
- Referendo: consulta directa a la ciudadanía para aprobar o rechazar una ley específica.
- Plebiscito: consulta popular sobre un tema de interés general, generalmente a nivel
  cantonal, convocada por la municipalidad.

Cada tipo de elección responde a necesidades distintas: las nacionales definen el rumbo del
país, las municipales atienden asuntos más cercanos como calles, parques o servicios locales,
y los referendos permiten que la ciudadanía decida directamente sobre una ley puntual, sin
pasar por sus representantes.

En un colegio, el equivalente sería distinguir entre elegir el gobierno estudiantil general
y elegir, por ejemplo, representantes de cada sección o comités específicos (ambiental,
deportivo, cultural), cada uno con su propio proceso y propósito.`,
  },
  {
    id: 7,
    numero: 7,
    icono: "mapa",
    color: "#FBE3BC",
    nombre: "Centros de votación",
    resumen: "Qué es un centro de votación, cómo consultar dónde votar y qué documentos llevar.",
    datoClave: "Podés consultar tu junta receptora de votos (dónde te toca votar) en la página oficial del TSE antes del día de la elección.",
    puntosClave: [
      "Cada persona vota en el centro que corresponde a su domicilio electoral.",
      "La cédula vigente es obligatoria: sin ella no se puede votar.",
      "Es buena práctica revisar el padrón con anticipación, no el mismo día.",
    ],
    contenido: `Un centro de votación es el lugar físico (normalmente una escuela o colegio) donde se
instalan las juntas receptoras de votos el día de las elecciones. Cada persona vota en el
centro que le corresponde según su domicilio electoral.

Para votar se necesita la cédula de identidad vigente. Sin ese documento, por regla general,
no se puede ejercer el sufragio, aunque el nombre aparezca en el padrón.

Antes del día de la elección, el TSE publica el padrón electoral para que cada persona pueda
verificar en qué junta receptora de votos le corresponde votar, y así evitar contratiempos o
filas en el lugar equivocado.

El día de la votación, cada centro tiene varias juntas receptoras (mesas), cada una atendida
por miembros de mesa capacitados para verificar identidades, entregar papeletas y resguardar
las urnas hasta el cierre y conteo.

En la versión escolar del simulacro, el "centro de votación" puede ser un aula o el gimnasio
del colegio, y el "documento" puede ser el carné estudiantil, para practicar la misma lógica
de verificación de identidad.`,
  },
  {
    id: 8,
    numero: 8,
    icono: "escudo",
    color: "#FFD9A8",
    nombre: "Participación ciudadana",
    resumen: "Por qué votar importa y cómo seguir participando más allá del día de la elección.",
    datoClave: "Votar es un derecho y también una responsabilidad colectiva: cada voto ayuda a definir el resultado final.",
    puntosClave: [
      "Votar es una forma de participación, pero no la única.",
      "Informarte y exigir rendición de cuentas también es participar.",
      "Los espacios estudiantiles son un buen lugar para practicar estas habilidades.",
    ],
    contenido: `Votar es una de las formas de participación ciudadana, pero no es la única. También se
participa cuando te informas sobre temas públicos, cuando exiges rendición de cuentas a tus
representantes, cuando te organizas en grupos comunitarios o estudiantiles, o cuando
supervisás que un proceso electoral sea transparente.

La participación ciudadana fortalece la democracia porque hace que las decisiones reflejen
mejor los intereses de toda la población, no solo de quienes tienen más poder o recursos.

Existen además formas de participación permanente, no solo el día de las elecciones: asistir
a cabildos o audiencias públicas, ser fiscal de un partido político, integrar una junta
receptora de votos, o simplemente conversar con otras personas sobre temas públicos para
formarte una opinión propia.

La desinformación es uno de los principales riesgos para la participación ciudadana: por eso
es tan importante contrastar la información que recibís, revisar más de una fuente y
desconfiar de mensajes que buscan generar miedo o rabia en lugar de explicar hechos.

Participar en el gobierno estudiantil de tu colegio —ya sea votando, siendo candidato/a, o
supervisando el proceso— es una manera concreta de practicar estas mismas habilidades antes
de ejercerlas como ciudadano o ciudadana adulta.`,
  },
];

export const mockVotos = [];
