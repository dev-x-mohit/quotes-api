import type { VercelRequest, VercelResponse } from '@vercel/node';
import { QUOTES, Quote } from '../data/quotesData';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers so anyone can use it from the internet
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { random, limit, page, category, author, sourceType } = req.query;

  // Validate parameters
  let numLimit = 10; // Default limit
  if (limit) {
    const parsedLimit = parseInt(limit as string, 10);
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      return res.status(400).json({ error: 'Limit must be a positive integer.' });
    }
    // Production grade limit max 100
    numLimit = Math.min(parsedLimit, 100);
  }

  let numPage = 1;
  if (page) {
    const parsedPage = parseInt(page as string, 10);
    if (isNaN(parsedPage) || parsedPage <= 0) {
      return res.status(400).json({ error: 'Page must be a positive integer.' });
    }
    numPage = parsedPage;
  }

  // Filtering
  let filteredQuotes: Quote[] = QUOTES;

  if (category) {
    const catQuery = (category as string).toLowerCase();
    filteredQuotes = filteredQuotes.filter(q => q.category.toLowerCase() === catQuery);
  }

  if (author) {
    const authQuery = (author as string).toLowerCase();
    filteredQuotes = filteredQuotes.filter(q => q.author.toLowerCase() === authQuery);
  }

  if (sourceType) {
    const stQuery = (sourceType as string).toLowerCase();
    filteredQuotes = filteredQuotes.filter(q => q.sourceType === stQuery);
  }

  if (filteredQuotes.length === 0) {
    return res.status(404).json({ error: 'No quotes found matching the specified filters.' });
  }

  // Random Selection
  if (random === 'true') {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    // Add cache header for random so it's not cached the same way
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return res.status(200).json(filteredQuotes[randomIndex]);
  }

  // Pagination
  const startIndex = (numPage - 1) * numLimit;
  const endIndex = startIndex + numLimit;
  
  const paginatedQuotes = filteredQuotes.slice(startIndex, endIndex);

  // Cache header for paginated results
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');

  return res.status(200).json({
    data: paginatedQuotes,
    pagination: {
      total: filteredQuotes.length,
      page: numPage,
      limit: numLimit,
      totalPages: Math.ceil(filteredQuotes.length / numLimit)
    }
  });
}
