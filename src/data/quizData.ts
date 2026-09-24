export type Question = {
  id: number;
  question: string;
  options: string[];
  /** zero-based index of the correct option */
  correctAnswer: number;
};

export const round1Questions: Question[] = [
  {
    id: 1,
    question:
      "I answer confidently. I use big words. I even give you references sometimes. The only problem? None of it happened. What am I doing?",
    options: ["Overfitting", "Hallucinating", "Caching", "Compiling"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question:
      "Gamers wanted me for better graphics. AI researchers wanted me for something completely different. Both discovered I'm very good at doing lots of calculations at once. What am I?",
    options: ["RAM", "CPU", "GPU", "SSD"],
    correctAnswer: 2,
  },
  {
    id: 3,
    question:
      "Same AI. Same model. Same question. One person gets a terrible answer, another gets an amazing one. What might they have changed?",
    options: ["The prompt", "The keyboard", "The browser", "The Wi-Fi"],
    correctAnswer: 0,
  },
  {
    id: 4,
    question:
      "I wasn't created by OpenAI, Google, or Meta. Yet without the idea introduced in a famous 2017 research paper, much of today's generative AI would look very different. What architecture am I?",
    options: ["CNN", "Transformer", "Decision Tree", "Blockchain"],
    correctAnswer: 1,
  },
  {
    id: 5,
    question:
      "One AI creates a fake. Another AI tries to catch it. They keep getting better by fighting each other. What kind of system is this?",
    options: ["GAN", "RNN", "VPN", "SQL"],
    correctAnswer: 0,
  },
  {
    id: 6,
    question:
      "I remember the changes made to your code over time. You accidentally break everything, but I can help you go back to an earlier version.",
    options: ["Git", "Docker", "Linux", "Python"],
    correctAnswer: 0,
  },
  {
    id: 7,
    question:
      'I am not a programming language. I am not a database. I am not the internet. Yet almost every developer has heard me say: "It works on my machine."',
    options: ["Docker", "Photoshop", "Excel", "Bluetooth"],
    correctAnswer: 0,
  },
  {
    id: 8,
    question:
      "You type a website name into your browser. Somehow, the browser discovers the numerical address of that website. Who helps make that translation?",
    options: ["DNS", "CPU", "HTTPS", "HTML"],
    correctAnswer: 0,
  },
  {
    id: 9,
    question:
      "My name sounds like something you'd say when you discover an ancient treasure. But instead of predicting the future, I store and manage a LOT of corporate data.",
    options: ["Oracle", "Anthropic", "OpenAI", "NVIDIA"],
    correctAnswer: 0,
  },
  {
    id: 10,
    question:
      "I am the bouncer of a network. Some traffic gets in. Some traffic gets blocked. I decide based on rules. Who am I?",
    options: ["CDN", "Firewall", "DNS", "API"],
    correctAnswer: 1,
  },
];

export const bonusQuestion: Omit<Question, "id"> = {
  question:
    "I created something worth billions. People know my name, but nobody knows who I actually am. I disappeared from the project and left the world guessing.",
  options: ["Vitalik Buterin", "Elon Musk", "Satoshi Nakamoto", "Sam Altman"],
  correctAnswer: 2,
};

export const BONUS_POINTS = 5;

export const prizeData = {
  title: "[PRIZE TITLE]",
  description: "[PRIZE DESCRIPTION]",
  image: "",
  sponsor: "",
  winnerName: "",
};

export const eventConfig = {
  eventName: "GDG GENESIS 4.0",
  tagline: "TECH. FUN. GENESIS.",
  photoText: "MAKE IT OFFICIAL.",
};
