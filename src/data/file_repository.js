import generateId from "../utils/unique_id_generator.js";
import { FileModel } from "./database.js";


export const fileRepositoryErrors = {
  fileNotFound: 'file-not-found'
}
/**
 * 
 * @param {{id: string?, path: string}} fileData 
 */
export async function saveFileData(fileData) {
  if (fileData.id) {
    const foundFile = await FileModel.findByPk(fileData.id)
    if (!foundFile) { throw fileRepositoryErrors.fileNotFound }
    foundFile.path = fileData.path
    await foundFile.save()
    return foundFile
  } else {
    return await FileModel.create({id: generateId(), path: fileData.path})
  }
}


export async function deleteFileData(id) {
  const foundModel = await FileModel.findByPk(id)
  if (foundModel) {
    await foundModel.destroy()
  }
}

export async function findFileDataById(id) {
  return await FileModel.findByPk(id)
}