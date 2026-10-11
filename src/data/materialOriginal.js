const modulo = [
  {
    id: "sistema-politico",
    title: "Sistema político",
    description:
      "Conoce cómo se organiza el sistema político costarricense y cuáles son sus principales características.",

    topics: [
      {
        id: "sistema-introduccion",
        title: "Introducción",
        type: "content",
        content:
          "El sistema político es el conjunto de instituciones, normas y procesos mediante los cuales se organiza el poder público y se toman decisiones para dirigir un país. Permite mantener el orden social y la convivencia pacífica.",

        cards: [
          {
            id: 1,
            title: "Instituciones",
            frontText: "Conoce uno de los elementos del sistema político.",
            backText:
              "Las instituciones organizan el poder público y permiten el funcionamiento del Estado.",
          },
          {
            id: 2,
            title: "Normas",
            frontText: "Descubre por qué las normas son importantes.",
            backText:
              "Las normas establecen reglas que regulan la convivencia y el ejercicio del poder.",
          },
          {
            id: 3,
            title: "Participación",
            frontText: "Aprende cómo participa la ciudadanía.",
            backText:
              "La ciudadanía participa mediante el voto, la opinión pública y otras formas de organización.",
          },
        ],
      },

      {
        id: "sistema-democracia",
        title: "Democracia costarricense",
        type: "content",
        content:
          "Costa Rica posee un sistema democrático representativo, pluralista y participativo. La ciudadanía elige periódicamente a sus gobernantes y cuenta con garantías constitucionales que protegen los derechos fundamentales de las personas.",
        cards: [
          {
            id: 1,
            title: "Representativa",
            frontText: "¿Por qué es representativa?",
            backText:
              "Porque delegamos la toma de decisiones en personas electas mediante el voto popular.",
          },
          {
            id: 2,
            title: "Pluralista",
            frontText: "¿Qué significa el pluralismo?",
            backText:
              "Garantiza la coexistencia de diversas ideas políticas, partidos y opiniones.",
          },
        ],
      },

      {
        id: "sistema-instituciones",
        title: "Instituciones políticas",
        type: "content",
        content:
          "Las instituciones políticas organizan el funcionamiento del Estado, garantizan el cumplimiento de las leyes y permiten la participación ciudadana. Su equilibrio evita el abuso de poder y fortalece el Estado de Derecho.",
        cards: [
          {
            id: 1,
            title: "Estado de Derecho",
            frontText: "¿Qué es el Estado de Derecho?",
            backText:
              "Asegura que todas las personas e instituciones estén sujetas a la ley por igual.",
          },
          {
            id: 2,
            title: "Rendición de Cuentas",
            frontText: "¿Por qué deben rendir cuentas?",
            backText:
              "Obliga a las autoridades a explicar el uso de los recursos públicos y sus acciones.",
          },
        ],
      },

      {
        id: "quiz-sistema",
        title: "Quiz",
        type: "quiz",
        quizId: 1,

        questions: [
          {
            id: 1,
            question: "¿Qué es el abstencionismo?",
            options: [
              "Participar activamente en las elecciones",
              "No votar aunque se tenga derecho a hacerlo",
              "Cambiar de partido político",
              "Votar más de una vez",
            ],
            correctAnswer: 1,
            explanation:
              "El abstencionismo ocurre cuando una persona con derecho al voto decide no participar en una elección.",
          },
          {
            id: 2,
            question: "¿Qué representa la democracia?",
            options: [
              "El poder de una sola persona",
              "La participación de la ciudadanía",
              "La eliminación de las elecciones",
              "La ausencia de leyes",
            ],
            correctAnswer: 1,
            explanation:
              "La democracia permite que la ciudadanía participe en la elección de sus representantes y en los asuntos públicos.",
          },
          {
            id: 3,
            question: "¿Qué es el sufragio?",
            options: [
              "El derecho al voto",
              "Una protesta ciudadana",
              "Una sanción política",
              "Un partido político",
            ],
            correctAnswer: 0,
            explanation:
              "El sufragio es el derecho político de participar en una elección mediante el voto.",
          },
        ],
      },
    ],
  },

  {
    id: "como-votar",
    title: "Cómo votar",
    description:
      "Aprende los requisitos y pasos necesarios para participar correctamente en una elección.",

    topics: [
      {
        id: "votar-requisitos",
        title: "Requisitos para votar",
        type: "content",
        content:
          "Para votar en Costa Rica se debe ser ciudadano costarricense por nacimiento o naturalización, tener al menos 18 años cumplidos al día de la elección y estar debidamente inscrito en el padrón electoral.",
        cards: [
          {
            id: 1,
            title: "Cédula de Identidad",
            frontText: "Documento indispensable",
            backText:
              "Es el único documento válido para verificar la identidad al momento de votar.",
          },
          {
            id: 2,
            title: "Padrón Electoral",
            frontText: "¿Qué es el padrón?",
            backText:
              "Es la lista oficial de todas las personas inscritas y habilitadas para ejercer el voto.",
          },
        ],
      },

      {
        id: "votar-proceso",
        title: "Proceso de votación",
        type: "content",
        content:
          "La persona electora debe presentarse en su junta receptora de votos, mostrar la cédula de identidad, recibir las papeletas oficiales, marcar la opción elegida en secreto dentro de la casilla y depositar las papeletas en las urnas correspondientes.",
        cards: [
          {
            id: 1,
            title: "Voto Secreto",
            frontText: "¿Por qué es secreto?",
            backText:
              "Garantiza que nadie pueda presionar o condicionar la decisión de la persona electora.",
          },
          {
            id: 2,
            title: "Juntas Receptoras",
            frontText: "¿Quiénes las integran?",
            backText:
              "Son integradas por miembros de mesa propuestos por los partidos y supervisados por el TSE.",
          },
        ],
      },

      {
        id: "votar-tipos",
        title: "Voto válido, nulo y en blanco",
        type: "content",
        content:
          "Un voto es válido cuando la marca expresa con claridad la intención sobre una sola casilla. Se considera nulo si se marca más de una opción, si la papeleta tiene tachaduras o está rota, y en blanco cuando no se realiza ninguna marca.",
        cards: [
          {
            id: 1,
            title: "Voto Válido",
            frontText: "¿Cuándo cuenta el voto?",
            backText:
              "Cuando se marca claramente con una 'X' dentro de la casilla de la candidatura elegida.",
          },
          {
            id: 2,
            title: "Voto Nulo",
            frontText: "¿Por qué se anula?",
            backText:
              "Si contiene signos ofensivos, múltiples marcas o no permite identificar la intención.",
          },
        ],
      },

      {
        id: "quiz-votar",
        title: "Quiz",
        type: "quiz",
        quizId: 2,
        questions: [],
      },
    ],
  },

  {
    id: "funciones-tse",
    title: "Funciones del TSE",
    description:
      "Descubre la importancia del Tribunal Supremo de Elecciones dentro de la democracia costarricense.",

    topics: [
      {
        id: "tse-definicion",
        title: "¿Qué es el TSE?",
        type: "content",
        content:
          "El Tribunal Supremo de Elecciones (TSE) es el órgano constitucional autónomo encargado de la organización, dirección y vigilancia de los actos relativos al sufragio. En la práctica, actúa con la misma independencia que los poderes del Estado.",
        cards: [
          {
            id: 1,
            title: "Independencia",
            frontText: "¿Cuál es su rango constitucional?",
            backText:
              "Tiene independencia funcional para garantizar elecciones imparciales y transparentes.",
          },
        ],
      },

      {
        id: "tse-funciones",
        title: "Funciones principales",
        type: "content",
        content:
          "Entre sus tareas destacan convocar a elecciones populares, inscribir candidaturas y partidos políticos, escrutar los votos, declarar los resultados oficiales y resolver demandas electorales de manera definitiva.",
        cards: [
          {
            id: 1,
            title: "Convocatoria",
            frontText: "¿Cuándo convoca a elecciones?",
            backText:
              "Se realiza oficialmente con meses de anticipación según lo estipulado por el Código Electoral.",
          },
          {
            id: 2,
            title: "Escrutinio",
            frontText: "¿Qué es el escrutinio?",
            backText:
              "Es la revisión y conteo oficial y definitivo de los votos emitidos en todo el país.",
          },
        ],
      },

      {
        id: "tse-registro",
        title: "Registro Civil",
        type: "content",
        content:
          "El Registro Civil es una dependencia fundamental del TSE. Se encarga de registrar nacimientos, matrimonios, defunciones, la expedición de cédulas de identidad y la actualización permanente del padrón electoral.",
        cards: [
          {
            id: 1,
            title: "Identificación",
            frontText: "¿Qué emite el Registro Civil?",
            backText:
              "La cédula de identidad para nacionales y los documentos de naturalización.",
          },
        ],
      },

      {
        id: "quiz-tse",
        title: "Quiz",
        type: "quiz",
        quizId: 3,
        questions: [],
      },
    ],
  },

  {
    id: "poderes-estado",
    title: "Poderes del Estado",
    description:
      "Conoce las funciones de los tres poderes de la República y la relación que existe entre ellos.",

    topics: [
      {
        id: "poder-ejecutivo",
        title: "Poder Ejecutivo",
        type: "content",
        content:
          "El Poder Ejecutivo administra los recursos públicos y ejecuta las leyes. Está compuesto por la Presidencia de la República, las Vicepresidencias y el Gabinete de Ministros y Ministras.",
        cards: [
          {
            id: 1,
            title: "Presidencia",
            frontText: "¿Quién lo encabeza?",
            backText:
              "La persona electa como Presidente/a de la República por un período de cuatro años.",
          },
          {
            id: 2,
            title: "Ministerios",
            frontText: "¿Qué labor realizan?",
            backText:
              "Dirigen áreas específicas del gobierno como Salud, Educación, Obras Públicas y Seguridad.",
          },
        ],
      },

      {
        id: "poder-legislativo",
        title: "Poder Legislativo",
        type: "content",
        content:
          "Representado por la Asamblea Legislativa, está compuesto por 57 diputados y diputadas electos por el pueblo. Su función es redactar, debatir, aprobar o derogar las leyes de la República, además de ejercer el control político.",
        cards: [
          {
            id: 1,
            title: "Diputaciones",
            frontText: "¿Cuántas bancadas existen?",
            backText:
              "Se distribuyen entre 57 diputados representando a las 7 provincias del país.",
          },
          {
            id: 2,
            title: "Control Político",
            frontText: "¿Qué es el control político?",
            backText:
              "Es la facultad de fiscalizar la gestión del Gobierno y el uso de los fondos públicos.",
          },
        ],
      },

      {
        id: "poder-judicial",
        title: "Poder Judicial",
        type: "content",
        content:
          "El Poder Judicial administra la justicia en nombre de la Nación. Está integrado por la Corte Suprema de Justicia, los tribunales y juzgados. Garantiza que las leyes se cumplan e interpreta la Constitución a través de la Sala Cuarta.",
        cards: [
          {
            id: 1,
            title: "Corte Suprema",
            frontText: "¿Cómo se organiza?",
            backText:
              "Está compuesta por magistrados y magistradas distribuidos en cuatro Salas especializadas.",
          },
          {
            id: 2,
            title: "Sala Constitucional",
            frontText: "¿Qué es la Sala IV?",
            backText:
              "Velar por la protección de los derechos fundamentales y el respeto a la Constitución.",
          },
        ],
      },

      {
        id: "quiz-poderes",
        title: "Quiz",
        type: "quiz",
        quizId: 4,
        questions: [],
      },
    ],
  },

  {
    id: "partidos-politicos",
    title: "Partidos políticos",
    description:
      "Comprende qué son los partidos políticos y cuál es su función dentro de una democracia.",

    topics: [
      {
        id: "partidos-definicion",
        title: "¿Qué son?",
        type: "content",
        content:
          "Los partidos políticos son agrupaciones de ciudadanas y ciudadanos constituidas voluntariamente para participar en los asuntos públicos, formular planes de gobierno y proponer candidaturas a cargos de elección popular.",
        cards: [
          {
            id: 1,
            title: "Plan de Gobierno",
            frontText: "¿Qué presentan los partidos?",
            backText:
              "Propuestas concretas de políticas públicas sobre economía, salud, educación y ambiente.",
          },
        ],
      },

      {
        id: "partidos-funciones",
        title: "Funciones",
        type: "content",
        content:
          "Sirven como canal de mediación entre la población y el gobierno. Promueven la formación política, estructuran las opciones electorales y representan las diversas corrientes ideológicas de la sociedad.",
        cards: [
          {
            id: 1,
            title: "Candidaturas",
            frontText: "¿Cómo eligen candidaturas?",
            backText:
              "Mediante procesos internos democráticos de convención o asambleas de partido.",
          },
          {
            id: 2,
            title: "Formación",
            frontText: "Capacitación ciudadana",
            backText:
              "Fomentan el debate de ideas y la preparación de futuros líderes comunitarios y nacionales.",
          },
        ],
      },

      {
        id: "partidos-participacion",
        title: "Participación ciudadana",
        type: "content",
        content:
          "La participación ciudadana trasciende el acto de votar. Incluye la fiscalización comunitaria, el debate informado, la militancia en organizaciones, el voluntariado en mesas electorales y la exigencia de transparencia a los representantes.",
        cards: [
          {
            id: 1,
            title: "Ciudadanía Activa",
            frontText: "Más allá del voto",
            backText:
              "Involucrarse activamente en proyectos comunales y monitorear el trabajo de las autoridades.",
          },
        ],
      },

      {
        id: "quiz-partidos",
        title: "Quiz",
        type: "quiz",
        quizId: 5,
        questions: [],
      },
    ],
  },
];

export default modulo;