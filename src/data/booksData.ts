
export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  genre: string;
  description: string;
  publicationYear: number;
  publisher: string;
  isbn: string;
  pages: number;
  available: boolean;
  totalCopies: number;
  availableCopies: number;
  rating: number;
  language: string;
  popularity: string;
  reviews: {
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  relatedBooks: string[];
}

// Sample books data 
export const booksData: Book[] = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fiction',
    description: 'A novel set in the American South during the 1930s, the story explores themes of racial injustice and moral growth. The story takes place in the fictional town of Maycomb, Alabama, during the Great Depression. The novel is told through the eyes of Scout Finch, a young girl whose father, Atticus Finch, is a lawyer defending a black man accused of raping a white woman.',
    publicationYear: 1960,
    publisher: 'J.B. Lippincott & Co.',
    isbn: '978-0446310789',
    pages: 281,
    available: true,
    totalCopies: 3,
    availableCopies: 2,
    rating: 4.5,
    language: 'English',
    popularity: 'High',
    reviews: [
      { user: 'Michael Johnson', rating: 5, comment: 'A timeless classic that still resonates today.', date: '2023-02-15' },
      { user: 'Sarah Thompson', rating: 4, comment: 'Beautifully written with important social commentary.', date: '2023-01-23' }
    ],
    relatedBooks: ['2', '4', '8']
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Science Fiction',
    description: 'A dystopian novel set in a totalitarian society where critical thought is suppressed under a cult of personality.',
    publicationYear: 1949,
    publisher: 'Secker & Warburg',
    isbn: '978-0451524935',
    pages: 328,
    available: true,
    totalCopies: 5,
    availableCopies: 3,
    rating: 4.7,
    language: 'English',
    popularity: 'High',
    reviews: [
      { user: 'James Wilson', rating: 5, comment: 'Prophetic and terrifying. A must-read.', date: '2023-03-10' }
    ],
    relatedBooks: ['3', '5', '7']
  },
  {
    id: '3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverUrl: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Romance',
    description: 'A romantic novel following the emotional development of Elizabeth Bennet who learns about the repercussions of hasty judgments.',
    publicationYear: 1813,
    publisher: 'T. Egerton, Whitehall',
    isbn: '978-0141439518',
    pages: 432,
    available: false,
    totalCopies: 2,
    availableCopies: 0,
    rating: 4.3,
    language: 'English',
    popularity: 'Medium',
    reviews: [
      { user: 'Emma Clark', rating: 4, comment: 'A delightful read with memorable characters.', date: '2023-01-05' }
    ],
    relatedBooks: ['1', '4', '6']
  },
  {
    id: '4',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fiction',
    description: 'This novel depicts the Jazz Age and tells the tragic story of Jay Gatsby and his pursuit of the American Dream.',
    publicationYear: 1925,
    publisher: 'Charles Scribner\'s Sons',
    isbn: '978-0743273565',
    pages: 180,
    available: true,
    totalCopies: 4,
    availableCopies: 1,
    rating: 4.2,
    language: 'English',
    popularity: 'High',
    reviews: [
      { user: 'David Brown', rating: 5, comment: 'Beautifully written exploration of the American Dream.', date: '2023-02-28' },
      { user: 'Lisa Martin', rating: 3, comment: 'Good but overrated in my opinion.', date: '2023-02-01' }
    ],
    relatedBooks: ['1', '3', '8']
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverUrl: 'https://images.unsplash.com/photo-1587583875445-14c0d37659b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fantasy',
    description: 'A fantasy novel about the adventures of a reluctant hero, a powerful wizard, and a treasure-seeking dragon.',
    publicationYear: 1937,
    publisher: 'George Allen & Unwin',
    isbn: '978-0547928227',
    pages: 310,
    available: true,
    totalCopies: 6,
    availableCopies: 4,
    rating: 4.8,
    language: 'English',
    popularity: 'High',
    reviews: [
      { user: 'Robert Taylor', rating: 5, comment: 'The perfect introduction to Middle-earth.', date: '2023-03-15' }
    ],
    relatedBooks: ['6', '7']
  },
  {
    id: '6',
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    coverUrl: 'https://images.unsplash.com/photo-1609866138210-84bb689f3c61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fantasy',
    description: 'The first book in the Harry Potter series introduces a young wizard to the hidden magical world.',
    publicationYear: 1997,
    publisher: 'Bloomsbury',
    isbn: '978-0590353427',
    pages: 223,
    available: false,
    totalCopies: 8,
    availableCopies: 0,
    rating: 4.9,
    language: 'English',
    popularity: 'Very High',
    reviews: [
      { user: 'Sarah Johnson', rating: 5, comment: 'The beginning of a magical journey!', date: '2023-01-18' },
      { user: 'Mark Williams', rating: 5, comment: 'As enchanting now as when I first read it.', date: '2023-02-10' }
    ],
    relatedBooks: ['5', '7']
  },
  {
    id: '7',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fantasy',
    description: 'An epic high-fantasy novel revolving around the struggle for control of the One Ring.',
    publicationYear: 1954,
    publisher: 'Allen & Unwin',
    isbn: '978-0618640157',
    pages: 1178,
    available: true,
    totalCopies: 3,
    availableCopies: 1,
    rating: 4.9,
    language: 'English',
    popularity: 'Very High',
    reviews: [
      { user: 'John Davis', rating: 5, comment: 'The definitive fantasy epic.', date: '2023-02-05' }
    ],
    relatedBooks: ['5', '6']
  },
  {
    id: '8',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fiction',
    description: 'A teenage boy\'s experiences in New York City, exploring themes of adolescence, identity, and alienation.',
    publicationYear: 1951,
    publisher: 'Little, Brown and Company',
    isbn: '978-0316769488',
    pages: 277,
    available: true,
    totalCopies: 4,
    availableCopies: 2,
    rating: 4.1,
    language: 'English',
    popularity: 'Medium',
    reviews: [
      { user: 'Jessica Adams', rating: 4, comment: 'A classic exploration of teenage angst.', date: '2023-03-01' }
    ],
    relatedBooks: ['1', '4']
  }
];
