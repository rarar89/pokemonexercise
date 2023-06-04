import fs from 'fs';
import fetch from 'node-fetch';

export const getImageFileName = (url: string) => {

  const parts = url.split('/');
  const fileName = parts[parts.length - 1];
  return fileName;
}

export async function saveFileLocally(fileUrl: string): Promise<string> {
    try {
      
        const response = await fetch(fileUrl);
        const fileName = getImageFileName(fileUrl);
        const filePath = `pokemon_images/${fileName}`;
  
        const fileStream = fs.createWriteStream(filePath);

        if(!response.body) {
            throw 'could not fetch body';
        }
        response.body.pipe(fileStream);
        return filePath;
    } catch (error) {
       throw Error('Failed to save file');
    }
}


