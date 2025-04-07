import express from 'express';
import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import { put } from '@vercel/blob';
import multer from 'multer';

const app = express();
const prisma = new PrismaClient();
const upload = multer();

app.use(cors());
app.use(express.json());

interface BookRequest {
  title: string;
  author: string;
  isbn?: string;
  publishedYear?: string;
  genre: string;
  status?: string;
  condition: string;
  quantity?: number;
  description?: string;
  coverUrl?: string;
}

// Upload image to Vercel Blob
app.post('/api/upload', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const blob = await put(req.file.originalname, req.file.buffer, {
      access: 'public',
    });

    res.json({ url: blob.url });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Create a new book
app.post('/api/books', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      author,
      isbn,
      publishedYear,
      genre,
      status,
      condition,
      quantity,
      description,
      coverUrl
    } = req.body as BookRequest;

    // Validate required fields
    if (!title || !author || !genre || !condition) {
      res.status(400).json({ 
        error: 'Missing required fields: title, author, genre, and condition are required' 
      });
      return;
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        isbn: isbn || null,
        publishedYear: publishedYear || null,
        genre,
        status: status || 'Tersedia',
        condition,
        quantity: quantity ? Number(quantity) : 1,
        description: description || null,
        coverUrl: coverUrl || null
      }
    });

    res.status(201).json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Failed to create book' });
  }
});

// Get all books
app.get('/api/books', async (_req: Request, res: Response): Promise<void> => {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Update a book
app.put('/api/books/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const book = await prisma.book.update({
      where: { id },
      data: req.body,
    });
    res.json(book);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// Delete a book
app.delete('/api/books/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.book.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle process termination
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
}); 