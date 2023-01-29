//@ts-check
import fs from 'fs';
import path from 'path';
import generateId from './unique_id_generator.js';

/**
 * 
 * @param {string} fileName 
 */
export function generateRandomFileNameFrom(fileName) {
  const splittedName = fileName.split('.')
  const extension = splittedName.at(splittedName.length - 1)
  return `${generateId()}.${extension}`
}

export function createDirectoryIfNotExists(path, callback) {
  fs.mkdir(path, {recursive: true}, (err) => {
    callback(err)
  })
}

export function deleteFileFromPath(path) {
  fs.unlink(path, (err) => {})
}

export function extensionNameOf(filePath) {
  return path.extname(filePath)
}

export function nameOf(filePath) {
  return path.basename(filePath)
}

/**
 * 
 * @param  {...string} paths 
 * @returns 
 */
export function joinPaths(...paths) {
  return path.join(...paths)
}

export async function moveFile(oldPath, newPath) {
  return new Promise(function(resolve, reject) {
    fs.rename(oldPath, newPath, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve(null)
      }
    })
  });
}

export function buildFileUrl(req, path) {
  return `${req.protocol}://${req.hostname}/${path.replaceAll("\\", "/")}`
}