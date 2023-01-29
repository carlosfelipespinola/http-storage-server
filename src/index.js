import express from 'express';
import path from 'path';
import { initializeDatabase } from './data/database.js';
import audioRouter from './routes/audio_routes.js';
import { createDirectoryIfNotExists } from './utils/file_utils.js';

export const rootDirPath = path.resolve()
export const tempPath = `files\\temp`;
export const mediaPath = `files\\media`;
export const imagesPath = `files\\images`;

(async function run() {

  for (let directory of [tempPath, mediaPath, imagesPath]) {
    directory = `${rootDirPath}\\${directory}`
    createDirectoryIfNotExists(directory, (err) => {})
  }

  await initializeDatabase()
  const port = 4000;

  const app = express()

  app.use(`/files`, express.static(path.join(rootDirPath, imagesPath)))

  app.use(`/files/media/:fileName/stream`, (req, res) => res.status(405).send())

  app.use('/audio', audioRouter)

  app.use((err, req, res, next) => res.status(500).send())

  app.listen(port)
})()