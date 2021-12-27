const tasks = [
  {
    id: 0,
    title: "item 1",
    category: "react",
    priority: "high",
    steps: [
      {
        step: "master-react-router",
        completed: false,
      },
      { step: "master-redux", completed: true },
      {
        step: "learn context",
        completed: false,
      },
      {
        step: "learn-asynchronous calls",
        completed: true,
      },
    ],

    description: "this is a booster to learn the concepts",
    comments: [
      {
        no: 0,
        comment: "project to be done in a weeks time",
      },
      {
        no: 1,
        comment: "practice with more than two projects",
      },
    ],
  },
  {
    id: 1,
    title: "item 2",
    category: "css",
    priority: "low",
    steps: [
      {
        completed: true,
        step: "flex-box",
      },
      { completed: false, step: "grid" },
      {
        completed: true,
        step: "bootstrap",
      },
    ],

    description: "implementing responsive web design",
    comments: [
      {
        no: 0,
        comment: "practice for a day",
      },
    ],
  },
  {
    id: 2,
    title: "learn iireact",
    category: "react",
    priority: "high",
    steps: [
      {
        step: "master-react-router",
        completed: false,
      },
      { step: "master-redux", completed: true },
      {
        step: "learn context",
        completed: false,
      },
      {
        step: "learn-asynchronous calls",
        completed: true,
      },
    ],

    description: "this is a booster to learn the concepts",
    comments: [
      {
        no: 0,
        comment: "project to be done in a weeks time",
      },
      {
        no: 1,
        comment: "practice with more than two projects",
      },
    ],
  },
  {
    id: 3,
    title: "checkhhing",
    category: "css",
    priority: "low",
    steps: [
      {
        completed: false,
        step: "flex-box",
      },
      { completed: false, step: "grid" },
      {
        completed: false,
        step: "bootstrap",
      },
    ],

    description: "implementing responsive web design",
    comments: [
      {
        no: 0,
        comment: "practice for a day",
      },
    ],
  },
  {
    id: 4,
    title: "learn react",
    category: "react",
    priority: "high",
    steps: [
      {
        step: "master-react-router",
        completed: false,
      },
      { step: "master-redux", completed: true },
      {
        step: "learn context",
        completed: false,
      },
      {
        step: "learn-asynchronous calls",
        completed: true,
      },
    ],

    description: "this is a booster to learn the concepts",
    comments: [
      {
        no: 0,
        comment: "project to be done in a weeks time",
      },
      {
        no: 1,
        comment: "practice with more than two projects",
      },
    ],
  },
  {
    id: 5,
    title: "learn css",
    category: "css",
    priority: "low",
    steps: [
      {
        completed: true,
        step: "flex-box",
      },
      { completed: false, step: "grid" },
      {
        completed: true,
        step: "bootstrap",
      },
    ],

    description: "implementing responsive web design",
    comments: [
      {
        no: 0,
        comment: "practice for a day",
      },
    ],
  },
  {
    id: 6,
    title: "just changedbbb",
    category: "css",
    priority: "low",
    steps: [
      {
        completed: true,
        step: "flex-box",
      },
      { completed: true, step: "grid" },
      {
        completed: true,
        step: "bootstrap",
      },
    ],

    description: "implementing responsive web design",
    comments: [
      {
        no: 0,
        comment: "practice for a day",
      },
    ],
  },
  {
    id: 7,
    title: "checking 12",
    category: "css",
    priority: "low",
    steps: [
      {
        completed: false,
        step: "flex-box",
      },
      { completed: false, step: "grid" },
      {
        completed: false,
        step: "bootstrap",
      },
    ],

    description: "implementing responsive web design",
    comments: [
      {
        no: 0,
        comment: "practice for a day",
      },
    ],
  },
  {
    id: 8,
    title: "just changed",
    category: "css",
    priority: "low",
    steps: [
      {
        completed: true,
        step: "flex-box",
      },
      { completed: true, step: "grid" },
      {
        completed: true,
        step: "bootstrap",
      },
    ],

    description: "implementing responsive web design",
    comments: [
      {
        no: 0,
        comment: "practice for a day",
      },
    ],
  },
  {
    id: 9,
    title: "checking21",
    category: "css",
    priority: "low",
    steps: [
      {
        completed: false,
        step: "flex-box",
      },
      { completed: false, step: "grid" },
      {
        completed: false,
        step: "bootstrap",
      },
    ],

    description: "implementing responsive web design",
    comments: [
      {
        no: 0,
        comment: "practice for a day",
      },
    ],
  },
  {
    id: 10,
    title: "checking2666",
    category: "css",
    priority: "low",
    steps: [
      {
        completed: false,
        step: "flex-box",
      },
      { completed: false, step: "grid" },
      {
        completed: false,
        step: "bootstrap",
      },
    ],

    description: "implementing responsive web design",
    comments: [
      {
        no: 0,
        comment: "practice for a day",
      },
    ],
  },
  {
    id: 11,
    title: "checking29ou",
    category: "css",
    priority: "low",
    steps: [
      {
        completed: false,
        step: "flex-box",
      },
      { completed: false, step: "grid" },
      {
        completed: false,
        step: "bootstrap",
      },
    ],

    description: "implementing responsive web design",
    comments: [
      {
        no: 0,
        comment: "practice for a day",
      },
    ],
  },
  {
    id: 12,
    title: "12",
    category: "css",
    priority: "low",
    steps: [
      {
        completed: false,
        step: "flex-box",
      },
      { completed: false, step: "grid" },
      {
        completed: false,
        step: "bootstrap",
      },
    ],

    description: "implementing responsive web design",
    comments: [
      {
        no: 0,
        comment: "practice for a day",
      },
    ],
  },
  {
    id: 13,
    title: "13",
    category: "css",
    priority: "low",
    steps: [
      {
        completed: false,
        step: "flex-box",
      },
      { completed: false, step: "grid" },
      {
        completed: false,
        step: "bootstrap",
      },
    ],

    description: "implementing responsive web design",
    comments: [
      {
        no: 0,
        comment: "practice for a day",
      },
    ],
  },
  {
    id: 14,
    title: "masaka",
    category: "css",
    priority: "high",
    steps: [
      {
        completed: false,
        step: "flex-box",
      },
      { completed: false, step: "grid" },
      {
        completed: false,
        step: "bootstrap",
      },
    ],

    description: "checking search functionalty",
    comments: [
      {
        no: 0,
        comment: "practice for a day",
      },
    ],
  }
];

export const getTasks = () => tasks;
