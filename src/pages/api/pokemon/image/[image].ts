import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { image } = req.query;
    const file = await fs.readFile(`pokemon_images/${image}`);
    res.setHeader('Content-Type', 'image/png');
    res.send(file);
}