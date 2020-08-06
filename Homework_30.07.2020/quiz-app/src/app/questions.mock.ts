import { Question } from './interfaces/question';

export const questions: Array<Question> = [
  {
    id: 1,
    text: 'Что из перечисленного не относится к основным признакам государства?',
    variants: [
      {
        text: 'Демократия',
        bool: true
      },
      {
        text: 'Население',
        bool: false
      },
      {
        text: 'Право',
        bool: false
      },
      {
        text: 'Власть',
        bool: false
      }
    ]
  },
  {
    id: 2,
    text: 'Какова доля азота в атмосфере?',
    variants: [
      {
        text: '78%',
        bool: true
      },
      {
        text: '12%',
        bool: false
      },
      {
        text: '96%',
        bool: false
      },
      {
        text: '31%',
        bool: false
      }
    ]
  },
  {
    id: 3,
    text: 'Как называется шестигранник, у которого все грани – параллелограммы?',
    variants: [
      {
        text: 'Пирамида',
        bool: false
      },
      {
        text: 'Трапеция',
        bool: false
      },
      {
        text: 'Параллелепипед',
        bool: true
      },
      {
        text: 'Конус',
        bool: false
      }
    ]
  },
  {
    id: 4,
    text: 'По какому закону одно заряженное тело притягивается к другому?',
    variants: [
      {
        text: 'По закону Архимеда',
        bool: false
      },
      {
        text: 'По закону Эйнштейна',
        bool: false
      },
      {
        text: 'По закону Пифагора',
        bool: false
      },
      {
        text: 'По закону Кулона',
        bool: true
      }
    ]
  },
  {
    id: 5,
    text: 'В каком году христианство разделилось на православие и католицизм?',
    variants: [
      {
        text: 'В 1521 году',
        bool: false
      },
      {
        text: 'В 1054 году',
        bool: true
      },
      {
        text: 'В 33 году',
        bool: false
      },
      {
        text: 'В 988 году',
        bool: false
      }
    ]
  },
  {
    id: 6,
    text: 'Сколько спутников у Земли?',
    variants: [
      {
        text: 'Один',
        bool: true
      },
      {
        text: 'Два',
        bool: false
      },
      {
        text: 'Три',
        bool: false
      },
      {
        text: 'Ни одного',
        bool: false
      }
    ]
  },
  {
    id: 7,
    text: 'Как звали последнего римского императора?',
    variants: [
      {
        text: 'Луций',
        bool: false
      },
      {
        text: 'Марк Аврелий',
        bool: false
      },
      {
        text: 'Ромул Август',
        bool: true
      },
      {
        text: 'Антонин Пий',
        bool: false
      }
    ]
  },
  {
    id: 8,
    text: 'Кому принадлежат слова: «Государство – это я»?',
    variants: [
      {
        text: 'Людовику XIV',
        bool: true
      },
      {
        text: 'Людовику XV',
        bool: false
      },
      {
        text: 'Наполеону',
        bool: false
      },
      {
        text: 'Петру I',
        bool: false
      }
    ]
  },
  {
    id: 9,
    text: 'Помните столицу Бельгии?',
    variants: [
      {
        text: 'Брюгге',
        bool: false
      },
      {
        text: 'Страсбург',
        bool: false
      },
      {
        text: 'Эльзас',
        bool: false
      },
      {
        text: 'Брюссель',
        bool: true
      }
    ]
  },
  {
    id: 10,
    text: 'Сколько рудиментов насчитывается в теле человека?',
    variants: [
      {
        text: '2',
        bool: false
      },
      {
        text: '27',
        bool: false
      },
      {
        text: '90',
        bool: true
      },
      {
        text: '12',
        bool: false
      }
    ]
  }
];
