import type { VercelRequest, VercelResponse } from '@vercel/node';

const QUOTES = [
  // Craftsmanship & Engineering
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Well done is better than well said.", author: "Benjamin Franklin" },
  { text: "Great things are done by a series of small things brought together.", author: "Vincent van Gogh" },
  { text: "Quality is not an act, it is a habit.", author: "Will Durant" },
  { text: "The details are not the details. They make the design.", author: "Charles Eames" },
  { text: "Excellence is a continuous process and not an accident.", author: "A. P. J. Abdul Kalam" },
  { text: "The beginning is the most important part of the work.", author: "Plato" },
  { text: "What we think, we become.", author: "Attributed to Buddha" },
  { text: "The reward of a thing well done is to have done it.", author: "Ralph Waldo Emerson" },
  { text: "Nothing is particularly hard if you divide it into small jobs.", author: "Henry Ford" },

  // Programming & Computer Science
  { text: "Controlling complexity is the essence of computer programming.", author: "Brian Kernighan" },
  { text: "The most effective debugging tool is still careful thought.", author: "Brian Kernighan" },
  { text: "A good programmer is someone who looks both ways before crossing a one-way street.", author: "Doug Linder" },
  { text: "The purpose of software engineering is to control complexity, not to create it.", author: "Pamela Zave" },
  { text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" },
  { text: "The cheapest, fastest, and most reliable components are those that aren't there.", author: "Gordon Bell" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "One of my most productive days was throwing away 1,000 lines of code.", author: "Ken Thompson" },
  { text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
  { text: "If debugging is the process of removing bugs, then programming must be the process of putting them in.", author: "Edsger W. Dijkstra" },

  // Learning & Curiosity
  { text: "I have no special talent. I am only passionately curious.", author: "Albert Einstein" },
  { text: "The important thing is not to stop questioning.", author: "Albert Einstein" },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { text: "Wisdom begins in wonder.", author: "Socrates" },
  { text: "The more I learn, the more I realize how much I don't know.", author: "Attributed to Albert Einstein" },
  { text: "It is not that I'm so smart, but I stay with problems longer.", author: "Attributed to Albert Einstein" },
  { text: "Anyone who has never made a mistake has never tried anything new.", author: "Attributed to Albert Einstein" },
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "The beautiful thing about learning is that nobody can take it away from you.", author: "B. B. King" },

  // Focus & Discipline
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Energy and persistence conquer all things.", author: "Benjamin Franklin" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Attributed to Confucius" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "Lost time is never found again.", author: "Benjamin Franklin" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { text: "Amateurs sit and wait for inspiration. The rest of us just get up and go to work.", author: "Stephen King" },
  { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
  { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche" },
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },

  // Design & Aesthetics
  { text: "Everything should be made as simple as possible, but not simpler.", author: "Attributed to Albert Einstein" },
  { text: "Art is never finished, only abandoned.", author: "Leonardo da Vinci" },
  { text: "Have nothing in your houses that you do not know to be useful or believe to be beautiful.", author: "William Morris" },
  { text: "To design is to communicate clearly by whatever means you can control or master.", author: "Milton Glaser" },
  { text: "Color is a power which directly influences the soul.", author: "Wassily Kandinsky" },
  { text: "The whole is more than the sum of its parts.", author: "Aristotle" },
  { text: "Everything has beauty, but not everyone sees it.", author: "Attributed to Confucius" },
  { text: "Art enables us to find ourselves and lose ourselves at the same time.", author: "Thomas Merton" },
  { text: "The ability to simplify means to eliminate the unnecessary so that the necessary may speak.", author: "Hans Hofmann" },
  { text: "There is no excellent beauty that hath not some strangeness in the proportion.", author: "Francis Bacon" },

  // Innovation & Building
  { text: "The best way out is always through.", author: "Robert Frost" },
  { text: "Nothing will work unless you do.", author: "Maya Angelou" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "The true sign of intelligence is not knowledge but imagination.", author: "Attributed to Albert Einstein" },
  { text: "Ideas are easy. Implementation is hard.", author: "Guy Kawasaki" },
  { text: "Great things are not done by impulse, but by a series of small things brought together.", author: "Vincent van Gogh" },
  { text: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", author: "William Butler Yeats" },
  { text: "The secret of change is to focus all of your energy not on fighting the old, but on building the new.", author: "Attributed to Socrates" },

  // Virat Kohli
  { text: "Self-belief and hard work will always earn you success.", author: "Virat Kohli" },
  { text: "I love playing under pressure.", author: "Virat Kohli" },
  { text: "Let your performance make the noise.", author: "Inspired by Virat Kohli" },
  { text: "You don't become a champion when you win. You become one in the hours nobody sees.", author: "Inspired by Virat Kohli" },
  { text: "Let them doubt you. Give them a reason to remember you.", author: "Inspired by Virat Kohli" },
  { text: "Your standards must be higher than the expectations of others.", author: "Inspired by Virat Kohli" },

  // MS Dhoni
  { text: "Till the full stop doesn't come, the sentence is not complete.", author: "MS Dhoni" },
  { text: "Forget fear. Do something different.", author: "MS Dhoni" },
  { text: "Pressure reveals whether you trust your preparation.", author: "Inspired by MS Dhoni" },
  { text: "Stay calm. Make your move. Let the result speak.", author: "Inspired by MS Dhoni" },
  { text: "The scoreboard remembers the result, not the excuses.", author: "Inspired by MS Dhoni" },

  // Rohit Sharma
  { text: "One bad day doesn't define your entire journey.", author: "Inspired by Rohit Sharma" },
  { text: "Be patient. Your moment will come.", author: "Inspired by Rohit Sharma" },
  { text: "Back yourself when nobody else does.", author: "Inspired by Rohit Sharma" },
  { text: "A setback is a moment. It doesn't have to become your identity.", author: "Inspired by Rohit Sharma" },

  // Sachin Tendulkar
  { text: "People throw stones at you, and you convert them into milestones.", author: "Sachin Tendulkar" },
  { text: "Enjoy the game and chase your dreams.", author: "Inspired by Sachin Tendulkar" },
  { text: "Talent gets you noticed. Discipline keeps you there.", author: "Inspired by Sachin Tendulkar" },

  // Rahul Dravid
  { text: "You have to earn your place every single day.", author: "Inspired by Rahul Dravid" },
  { text: "The work nobody applauds is often the work that matters most.", author: "Inspired by Rahul Dravid" },

  // AB de Villiers
  { text: "Play with freedom. Prepare with discipline.", author: "Inspired by AB de Villiers" },
  { text: "Never let the fear of failure limit your game.", author: "Inspired by AB de Villiers" },

  // Yuvraj Singh
  { text: "Fight through the innings life gives you.", author: "Inspired by Yuvraj Singh" },
  { text: "Your hardest chapter doesn't have to be your last.", author: "Inspired by Yuvraj Singh" },

  // Ricky Ponting
  { text: "Great teams are built on standards, not speeches.", author: "Inspired by Ricky Ponting" },

  // Cristiano-style cricket energy — general
  { text: "Be obsessed with the work, not addicted to applause.", author: "Cricket Mindset" },
  { text: "Form is temporary. The work you put in stays with you.", author: "Cricket Mindset" },
  { text: "When the pressure rises, let your preparation answer.", author: "Cricket Mindset" },
  { text: "They see the innings. They don't see the years.", author: "Cricket Mindset" },
  { text: "You can lose a match without losing your hunger.", author: "Cricket Mindset" },

  // Tony Stark / Iron Man
  { text: "I am Iron Man.", author: "Tony Stark" },
  { text: "Sometimes you gotta run before you can walk.", author: "Tony Stark" },
  { text: "Part of the journey is the end.", author: "Tony Stark" },

  // Steve Rogers / Captain America
  { text: "I can do this all day.", author: "Steve Rogers" },
  { text: "I don't like bullies.", author: "Steve Rogers" },
  { text: "Avengers... assemble.", author: "Steve Rogers" },

  // Thor
  { text: "I choose to run toward my problems.", author: "Thor" },
  { text: "I'm still worthy.", author: "Thor" },

  // Bruce Banner / Hulk
  { text: "That's my secret, Cap. I'm always angry.", author: "Bruce Banner" },
  { text: "Puny god.", author: "Hulk" },

  // Natasha Romanoff / Black Widow
  { text: "I've got red in my ledger.", author: "Natasha Romanoff" },
  { text: "I used to have nothing.", author: "Natasha Romanoff" },

  // Clint Barton / Hawkeye
  { text: "You didn't see that coming?", author: "Clint Barton" },

  // Peter Parker / Spider-Man
  { text: "With great power comes great responsibility.", author: "Spider-Man" },
  { text: "I just wanted to be like you.", author: "Peter Parker" },

  // T'Challa / Black Panther
  { text: "Wakanda forever.", author: "T'Challa" },
  { text: "In times of crisis, the wise build bridges.", author: "T'Challa" },

  // Doctor Strange
  { text: "We're in the endgame now.", author: "Doctor Strange" },
  { text: "I went forward in time.", author: "Doctor Strange" },

  // Wanda Maximoff / Scarlet Witch
  { text: "You took everything from me.", author: "Wanda Maximoff" },
  { text: "What is grief, if not love persevering?", author: "Vision" },

  // Loki
  { text: "I am burdened with glorious purpose.", author: "Loki" },
  { text: "I assure you, brother, the sun will shine on us again.", author: "Loki" },

  // Thanos
  { text: "I am inevitable.", author: "Thanos" },
  { text: "The hardest choices require the strongest wills.", author: "Thanos" },

  // Nick Fury
  { text: "Until such time as the world ends, we will act as though it intends to spin on.", author: "Nick Fury" },

  // Sam Wilson / Falcon
  { text: "When you do, you gotta do it yourself.", author: "Sam Wilson" },

  // Yelena Belova
  { text: "It's a family.", author: "Yelena Belova" },

  // Deadpool
  { text: "Maximum effort.", author: "Deadpool" },

  // Groot
  { text: "I am Groot.", author: "Groot" },

  // ORIGINAL — COLD, HARD-HITTING & SAVAGE
  { text: "Be so consistent that your potential becomes undeniable.", author: "STACK" },
  { text: "Nobody is coming. Build yourself.", author: "STACK" },
  { text: "Stay quiet. Let the results introduce you.", author: "STACK" },
  { text: "Your excuses know you better than your ambitions do.", author: "STACK" },
  { text: "Discipline is keeping a promise you made to yourself.", author: "STACK" },
  { text: "You don't need revenge. You need a life you're proud of.", author: "STACK" },
  { text: "Become someone your younger self would feel safe with.", author: "STACK" },
  { text: "The comeback begins when the excuses end.", author: "STACK" },
  { text: "Let the old version of you stay buried.", author: "STACK" },
  { text: "You can miss someone and still choose yourself.", author: "STACK" },
  { text: "Some chapters end without giving you the answers.", author: "STACK" },
  { text: "You outgrow people before you stop missing them.", author: "STACK" },
  { text: "Don't let one painful season convince you that life is cruel.", author: "STACK" },
  { text: "The silence after letting go can feel louder than the goodbye.", author: "STACK" },
  { text: "One day, this version of you will be the reason you made it.", author: "STACK" }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers so anyone can use it from the internet
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const { random, limit } = req.query;

  if (random === 'true') {
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    return res.status(200).json(QUOTES[randomIndex]);
  }

  if (limit) {
    const numLimit = parseInt(limit as string, 10);
    if (!isNaN(numLimit) && numLimit > 0) {
      return res.status(200).json(QUOTES.slice(0, numLimit));
    }
  }

  return res.status(200).json(QUOTES);
}
