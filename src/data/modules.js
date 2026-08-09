const modules = [
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
          "El sistema político es el conjunto de instituciones, normas y procesos mediante los cuales se organiza el poder público y se toman decisiones para dirigir un país.",

        cards: [
          {
            id: 1,
            title: "Instituciones",
            frontText:
              "Conoce uno de los elementos del sistema político.",
            backText:
              "Las instituciones organizan el poder público y permiten el funcionamiento del Estado.",
          },
          {
            id: 2,
            title: "Normas",
            frontText:
              "Descubre por qué las normas son importantes.",
            backText:
              "Las normas establecen reglas que regulan la convivencia y el ejercicio del poder.",
          },
          {
            id: 3,
            title: "Participación",
            frontText:
              "Aprende cómo participa la ciudadanía.",
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
          "Costa Rica posee un sistema democrático representativo. La ciudadanía elige mediante el voto a las personas que ocuparán diferentes cargos públicos.",
      },

      {
        id: "sistema-instituciones",
        title: "Instituciones políticas",
        type: "content",
        content:
          "Las instituciones políticas organizan el funcionamiento del Estado, garantizan el cumplimiento de las leyes y permiten la participación ciudadana.",
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
          "Para votar en Costa Rica se debe ser ciudadano costarricense, tener al menos 18 años y estar inscrito en el padrón electoral.",
      },

      {
        id: "votar-proceso",
        title: "Proceso de votación",
        type: "content",
        content:
          "La persona electora debe presentarse en la junta receptora correspondiente, mostrar su documento de identidad y seguir las instrucciones para emitir el voto.",
      },

      {
        id: "votar-tipos",
        title: "Voto válido, nulo y en blanco",
        type: "content",
        content:
          "Un voto es válido cuando la intención de la persona electora es clara. Puede considerarse nulo cuando se marca de manera incorrecta, mientras que el voto en blanco no selecciona ninguna opción.",
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
          "El Tribunal Supremo de Elecciones es la institución encargada de organizar, dirigir y vigilar los procesos electorales de Costa Rica.",
      },

      {
        id: "tse-funciones",
        title: "Funciones principales",
        type: "content",
        content:
          "Entre sus funciones se encuentran convocar elecciones, elaborar el padrón electoral, declarar los resultados y garantizar la transparencia del proceso.",
      },

      {
        id: "tse-registro",
        title: "Registro Civil",
        type: "content",
        content:
          "El Registro Civil forma parte del TSE y se encarga de registrar nacimientos, matrimonios, defunciones y otros hechos relacionados con la identidad de las personas.",
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
          "El Poder Ejecutivo administra el país. Está encabezado por la Presidencia de la República y las personas responsables de los ministerios.",
      },

      {
        id: "poder-legislativo",
        title: "Poder Legislativo",
        type: "content",
        content:
          "El Poder Legislativo está representado por la Asamblea Legislativa y tiene como función principal crear, modificar y aprobar las leyes.",
      },

      {
        id: "poder-judicial",
        title: "Poder Judicial",
        type: "content",
        content:
          "El Poder Judicial administra justicia, resuelve conflictos y vela por el cumplimiento de las leyes.",
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
          "Los partidos políticos son organizaciones de personas que comparten ideas y propuestas sobre la forma de gobernar el país.",
      },

      {
        id: "partidos-funciones",
        title: "Funciones",
        type: "content",
        content:
          "Los partidos presentan candidaturas, promueven propuestas y permiten que diferentes sectores de la población participen en la política.",
      },

      {
        id: "partidos-participacion",
        title: "Participación ciudadana",
        type: "content",
        content:
          "La ciudadanía puede participar informándose, dialogando, votando y colaborando en actividades políticas de manera responsable.",
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

export default modules;