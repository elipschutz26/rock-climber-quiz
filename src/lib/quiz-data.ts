export type ClimberType = 'Boulderer' | 'Sport Climber' | 'Trad Climber' | 'Multi-Pitch Adventurer'

export interface Question {
  id: number
  text: string
  options: {
    text: string
    type: ClimberType
  }[]
}

export const questions: Question[] = [
  {
    id: 1,
    text: "What does your ideal climbing day look like?",
    options: [
      { text: "Short approach, crush hard moves, done by noon", type: "Boulderer" },
      { text: "Warm up on easy routes, redpoint attempt on my project", type: "Sport Climber" },
      { text: "All day on a single pitch figuring out gear placements", type: "Trad Climber" },
      { text: "6am alpine start to summit something before weather rolls in", type: "Multi-Pitch Adventurer" },
    ],
  },
  {
    id: 2,
    text: "What's your relationship with your crash pad?",
    options: [
      { text: "It goes everywhere with me — it IS my climbing", type: "Boulderer" },
      { text: "I own one but mostly use it for sitting at the crag", type: "Sport Climber" },
      { text: "What crash pad? I have a rope and gear for a reason", type: "Trad Climber" },
      { text: "Too heavy to carry on a 4-hour approach", type: "Multi-Pitch Adventurer" },
    ],
  },
  {
    id: 3,
    text: "Pick your ideal piece of gear to own:",
    options: [
      { text: "A pair of ultra-aggressive downturned shoes", type: "Boulderer" },
      { text: "A perfectly matched lightweight sport draws set", type: "Sport Climber" },
      { text: "A full rack of cams and nuts", type: "Trad Climber" },
      { text: "A 70m dry-treated rope and a light harness", type: "Multi-Pitch Adventurer" },
    ],
  },
  {
    id: 4,
    text: "How do you feel about rope management?",
    options: [
      { text: "Ropes are obstacles between me and the rock", type: "Boulderer" },
      { text: "I clip bolts — rope management is pretty simple", type: "Sport Climber" },
      { text: "I think about rope drag constantly. It haunts me.", type: "Trad Climber" },
      { text: "I can coil a rope 12 different ways", type: "Multi-Pitch Adventurer" },
    ],
  },
  {
    id: 5,
    text: "What's your relationship with heights?",
    options: [
      { text: "10 feet feels plenty scary when you're on slopers", type: "Boulderer" },
      { text: "Fine once I'm past the crux and near the anchor", type: "Sport Climber" },
      { text: "Heights are fine. Runouts are where the real feeling lives.", type: "Trad Climber" },
      { text: "The higher the better — I can see mountain ranges from up there", type: "Multi-Pitch Adventurer" },
    ],
  },
  {
    id: 6,
    text: "Your friends ask what grade you climb. You say:",
    options: [
      { text: "V7 outdoors, projecting V9", type: "Boulderer" },
      { text: "5.12b, trying to break into 5.12d", type: "Sport Climber" },
      { text: "5.10 trad, which is way harder than 5.10 sport", type: "Trad Climber" },
      { text: "Grade doesn't matter — I focus on completing objectives", type: "Multi-Pitch Adventurer" },
    ],
  },
  {
    id: 7,
    text: "How do you feel about camping?",
    options: [
      { text: "I'd rather drive home and sleep in my bed", type: "Boulderer" },
      { text: "A nice campground close to the crag is perfect", type: "Sport Climber" },
      { text: "I'll bivy under a ledge if I have to", type: "Trad Climber" },
      { text: "Wall tent at base camp with a stove — yes please", type: "Multi-Pitch Adventurer" },
    ],
  },
  {
    id: 8,
    text: "What does success look like on a climbing day?",
    options: [
      { text: "Sending a problem that has shut me down for weeks", type: "Boulderer" },
      { text: "Clipping the anchors on my project without falling", type: "Sport Climber" },
      { text: "Leading a committing trad pitch clean with solid gear", type: "Trad Climber" },
      { text: "Summiting and getting back to the car before dark", type: "Multi-Pitch Adventurer" },
    ],
  },
  {
    id: 9,
    text: "Pick a famous climbing destination:",
    options: [
      { text: "Hueco Tanks, TX — legendary bouldering", type: "Boulderer" },
      { text: "Rifle, CO — steep limestone sport routes", type: "Sport Climber" },
      { text: "Yosemite, CA — granite crack climbing", type: "Trad Climber" },
      { text: "Chamonix, France — alpine routes on Mont Blanc", type: "Multi-Pitch Adventurer" },
    ],
  },
  {
    id: 10,
    text: "After a hard day of climbing, your recovery looks like:",
    options: [
      { text: "Finger stretches, tape job, foam rolling my forearms", type: "Boulderer" },
      { text: "Protein shake, hot tub at the campground", type: "Sport Climber" },
      { text: "Cleaning gear, reorganizing the rack, planning the next route", type: "Trad Climber" },
      { text: "Checking the weather forecast for tomorrow's objective", type: "Multi-Pitch Adventurer" },
    ],
  },
]

export const resultDescriptions: Record<ClimberType, { title: string; description: string; emoji: string; color: string }> = {
  Boulderer: {
    title: "You're a Boulderer",
    emoji: "🪨",
    color: "from-amber-900 to-stone-800",
    description:
      "Power, precision, and puzzles. You love the pure physical challenge of short, intense problems. No rope, no partner required — just you, the rock, and a crash pad. Font and Bishop are calling your name.",
  },
  "Sport Climber": {
    title: "You're a Sport Climber",
    emoji: "🔩",
    color: "from-blue-900 to-slate-800",
    description:
      "Efficiency and endurance. You live for the redpoint — that moment when a month of effort clicks into a perfect, clean ascent. You have strong opinions about bolt spacing and probably own at least three pairs of shoes.",
  },
  "Trad Climber": {
    title: "You're a Trad Climber",
    emoji: "🧰",
    color: "from-green-900 to-slate-800",
    description:
      "Self-reliance and adventure. You build your own protection and accept a little more uncertainty in exchange for that feeling of true commitment. You have a deep appreciation for crack climbing and a complicated relationship with gear weight.",
  },
  "Multi-Pitch Adventurer": {
    title: "You're a Multi-Pitch Adventurer",
    emoji: "⛰️",
    color: "from-indigo-900 to-slate-900",
    description:
      "The summit is the goal. You plan ahead, move efficiently, and are always thinking about the next pitch. You find meaning in big objectives and the full-day experience of a long route in the mountains.",
  },
}

export function scoreQuiz(answers: number[], qs: Question[]): ClimberType {
  const counts: Record<ClimberType, number> = {
    Boulderer: 0,
    "Sport Climber": 0,
    "Trad Climber": 0,
    "Multi-Pitch Adventurer": 0,
  }

  answers.forEach((answerIndex, questionIndex) => {
    const question = qs[questionIndex]
    if (question && question.options[answerIndex]) {
      counts[question.options[answerIndex].type]++
    }
  })

  return Object.entries(counts).sort(([, a], [, b]) => b - a)[0][0] as ClimberType
}
