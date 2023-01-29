//@ts-check

import { deleteFileData, findFileDataById } from "../data/file_repository.js";

export const fileServiceErrorCodes = {
  fileNotFound: 'file-not-found'
}
/**
 * 
 * @param {string} id 
 * @returns 
 */
export async function deleteFile(id) {
  return await deleteFileData(id)
}

export async function findFilePathById(id) {
  const foundFile = await findFileDataById(id)
  if (!foundFile) { throw fileServiceErrorCodes.fileNotFound }
  return foundFile.path
}