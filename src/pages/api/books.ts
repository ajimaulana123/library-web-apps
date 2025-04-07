import { prisma } from '@/lib/db';
import { Request, Response } from 'express';

// GET /api/books
export const getBooks = async (_req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// POST /api/books
export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await prisma.book.create({
      data: req.body,
    });
    res.status(201).json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Failed to create book' });
  }
};

// PUT /api/books/:id
export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.update({
      where: { id },
      data: req.body,
    });
    res.json(book);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Failed to update book' });
  }
};

// DELETE /api/books/:id
export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.book.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
}; 