import multer, { diskStorage } from "multer"

import { rootDirPath, tempPath } from "../index.js";
import { createDirectoryIfNotExists, generateRandomFileNameFrom } from "../utils/file_utils.js";

/**
 * 
 * @param {string} uploadDirectoryName 
 * @returns 
 */
export function createMultipartFormHandler(uploadDirectoryName) {
  const storage = diskStorage({
    destination: (req, file, cb) => {
      const path = `${rootDirPath}/${tempPath}/${uploadDirectoryName}`
      createDirectoryIfNotExists(path, (err) => cb(err, path))
    },
    filename: (req, file, cb) => cb(null, generateRandomFileNameFrom(file.originalname))
  })
  
  const handler = multer({ storage: storage })
  return handler
}
