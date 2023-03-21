db = db.getSiblingDB('softdesign_books');

db.createCollection('users');
db.users.insertMany([
  {
    email: 'jose.test@email.com',
    password: '$2a$12$gYzXFX2G4k8s78rdHKZoM.CdOa/1NK1neoa.8fnq0eTyInCanpJ1G', // josepassword
    name: 'Jose',
  },
]);

db.createCollection('books');
db.books.insertMany([
  {
    title: "Harry Potter and the Philosopher's Stone",
    description:
      "The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school and with the help of his friends, Ron Weasley and Hermione Granger, he faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry's parents, but failed to kill Harry when he was just 15 months old.",
    author: 'J. K. Rowling',
    genre: 'Fantasy',
    isRented: false,
  },
  {
    title: 'Harry Potter and the Chamber of Secrets ',
    description:
      "Harry Potter and the Chamber of Secrets is a fantasy novel written by British author J. K. Rowling and the second novel in the Harry Potter series. The plot follows Harry's second year at Hogwarts School of Witchcraft and Wizardry, during which a series of messages on the walls of the school's compete",
    author: 'J. K. Rowling',
    genre: 'Fantasy',
    isRented: false,
  },
  {
    title: 'Harry Potter and the Prisoner of Azkaban',
    description:
      "Harry Potter and the Prisoner of Azkaban is a fantasy novel written by British author J. K. Rowling and is the third in the Harry Potter series. The book follows Harry Potter, a young wizard, in his third year at Hogwarts School of Witchcraft and Wizardry. Along with friends Ronald Weasley and Hermione Granger, Harry investigates Sirius Black, an escaped prisoner from Azkaban, the wizard prison, believed to be one of Lord Voldemort's old allies.",
    author: 'J. K. Rowling',
    genre: 'Fantasy',
    isRented: false,
  },
  {
    title: 'Harry Potter and the Goblet of Fire',
    description:
      "Harry Potter and the Goblet of Fire is a fantasy novel written by British author J. K. Rowling and the fourth novel in the Harry Potter series. It follows Harry Potter, a wizard in his fourth year at Hogwarts School of Witchcraft and Wizardry, and the mystery surrounding the entry of Harry's name into the Triwizard Tournament, in which he is forced to compete",
    author: 'J. K. Rowling',
    genre: 'Fantasy',
    isRented: false,
  },
  {
    title: 'Harry Potter and the Order of the Phoenix',
    description:
      "Harry Potter and the Order of the Phoenix is a fantasy novel written by British author J. K. Rowling and the fifth novel in the Harry Potter series. It follows Harry Potter's struggles through his fifth year at Hogwarts School of Witchcraft and Wizardry, including the surreptitious return of the antagonist Lord Voldemort, O.W.L. exams, and an obstructive Ministry of Magic.",
    author: 'J. K. Rowling',
    genre: 'Fantasy',
    isRented: false,
  },
  {
    title: 'Harry Potter and the Half-Blood Prince',
    description:
      "Harry Potter and the Half-Blood Prince is a fantasy novel written by British author J. K. Rowling and the sixth and penultimate novel in the Harry Potter series. Set during Harry Potter's sixth year at Hogwarts, the novel explores the past of the boy wizard's nemesis, Lord Voldemort, and Harry's preparations for the final battle against Voldemort alongside his headmaster and mentor Albus Dumbledore.",
    author: 'J. K. Rowling',
    genre: 'Fantasy',
    isRented: false,
  },
  {
    title: 'Harry Potter and the Deathly Hallows ',
    description:
      'Harry Potter and the Deathly Hallows is a fantasy novel written by British author J. K. Rowling and the seventh and final novel of the main Harry Potter series. It was released on 21 July 2007 in the United Kingdom by Bloomsbury Publishing, in the United States by Scholastic, and in Canada by Raincoast Books. The novel chronicles the events directly following Harry Potter and the Half-Blood Prince (2005) and the final confrontation between the wizards Harry Potter and Lord Voldemort.',
    author: 'J. K. Rowling',
    genre: 'Fantasy',
    isRented: false,
  },
  {
    title: 'A Song of Ice and Fire: A Game of Thrones',
    description:
      'A Game of Thrones is the first novel in A Song of Ice and Fire, a series of fantasy novels by American author George R. R. Martin. It was first published on August 1, 1996. The novel won the 1997 Locus Award and was nominated for both the 1997 Nebula Award and the 1997 World Fantasy Award. The novella Blood of the Dragon, comprising the Daenerys Targaryen chapters from the novel, won the 1997 Hugo Award for Best Novella. In January 2011, the novel became a New York Times Bestseller and reached No. 1 on the list in July 2011.',
    author: 'George R. R. Martin',
    genre: 'Fantasia épica',
    isRented: false,
  },
  {
    title: 'A Song of Ice and Fire: A Clash of Kings',
    description:
      'A Clash of Kings is the second of seven planned novels in A Song of Ice and Fire, an epic fantasy series by American author George R. R. Martin. It was first published on November 16, 1998 in the United Kingdom; the first United States edition followed on February 2, 1999.[2] Like its predecessor, A Game of Thrones, it won the Locus Award (in 1999) for Best Novel and was nominated for the Nebula Award (also in 1999) for Best Novel. In May 2005, Meisha Merlin released a limited edition of the novel, fully illustrated by John Howe.',
    author: 'George R. R. Martin',
    genre: 'Fantasia épica',
    isRented: false,
  },
  {
    title: 'A Song of Ice and Fire: A Storm of Swords',
    description:
      'A Storm of Swords is the third of seven planned novels in A Song of Ice and Fire, a fantasy series by American author George R. R. Martin. It was first published on August 8, 2000, in the United Kingdom,[1] with a United States edition following in November 2000. Its publication was preceded by a novella called Path of the Dragon, which collects some of the Daenerys Targaryen chapters from the novel into a single book.',
    author: 'George R. R. Martin',
    genre: 'Fantasia épica',
    isRented: false,
  },
  {
    title: 'A Song of Ice and Fire: A Feast for Crows',
    description:
      'A Feast for Crows is the fourth of seven planned novels in the epic fantasy series A Song of Ice and Fire by American author George R. R. Martin. The novel was first published on October 17, 2005, in the United Kingdom, with a United States edition following on November 8, 2005.',
    author: 'George R. R. Martin',
    genre: 'Fantasia épica',
    isRented: false,
  },
  {
    title: 'A Song of Ice and Fire: A Dance with Dragons',
    description:
      'A Dance with Dragons is the fifth novel of seven planned in the epic fantasy series A Song of Ice and Fire by American author George R. R. Martin. In some areas, the paperback edition was published in two parts, titled Dreams and Dust and After the Feast.',
    author: 'George R. R. Martin',
    genre: 'Fantasia épica',
    isRented: false,
  },
]);
