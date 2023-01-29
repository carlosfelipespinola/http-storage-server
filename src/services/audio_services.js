//@ts-check

import { fileRepositoryErrors, saveFileData } from "../data/file_repository.js";
import { imagesPath, mediaPath, rootDirPath } from "../index.js";
import { deleteFileFromPath, extensionNameOf, joinPaths, moveFile, nameOf } from "../utils/file_utils.js";


export const errorCodes = {
  invalidAudio: 'error-invalid-audio',
  invalidImage: 'error-invalid-image-format',
  fileNotFound: 'error-file-not-found'
}

/**
 * 
 * @param {{mimeType: string, path: string, name: string}} fileData 
 */
function validateAudio(fileData) {
  if (extensionNameOf(fileData.name) !== '.mp3') { throw errorCodes.invalidAudio }
  if (fileData.mimeType !== 'audio/mpeg') { throw errorCodes.invalidAudio }
}

/**
 * 
 * @param {{mimeType: string, path: string, name: string}} fileData 
 */
function validateImage(fileData) {
  const allowedExtensions = /jpeg|jpg|png/;
  const isExtensionValid = allowedExtensions.test(extensionNameOf(fileData.name));
  const isMimeTypeValid = allowedExtensions.test(fileData.mimeType);
  if (isMimeTypeValid && isExtensionValid) { return; }
  throw errorCodes.invalidImage
}

/**
 * 
 * @param {{mimeType: string, path: string, name: string}} fileData 
 */
function validateFile(fileData) {
  if (fileData.mimeType.startsWith('audio/')) {
    validateAudio(fileData)
  } else {
    validateImage(fileData)
  }
}

async function moveFileToExpectedDirectory(fileData) {
  let fullPath
  let relativePath
  if (fileData.mimeType.startsWith('audio/')) {
    relativePath = mediaPath
  } else {
    relativePath = imagesPath
  }
  const name = nameOf(fileData.path)
  relativePath = joinPaths(relativePath, name)
  fullPath = joinPaths(rootDirPath, relativePath)
  await moveFile(fileData.path, fullPath)
  deleteFileFromPath(fileData.path)
  return relativePath
}



/**
 * 
 * @param {{id: string, mimeType: string, path: string, name: string}} fileData 
 */
export async function saveAudioFile(fileData) {
  try {
    validateFile(fileData)
    const relativePath = await moveFileToExpectedDirectory(fileData)
    return await saveFileData({id: fileData.id, path: relativePath})
  } catch (error) {
    if (typeof error !== 'string') { throw error }
    if (Object.values(errorCodes).includes(error) || error == fileRepositoryErrors.fileNotFound) {
      deleteFileFromPath(fileData.path)
    }
    throw error
  }
}
