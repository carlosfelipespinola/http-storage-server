import { deleteFileFromPath } from "../utils/file_utils.js";


export function beforeFileUpdate(model) {
  deleteFileFromPath(model._previousDataValues.path)
}

export function afterFileDestroy(model) {
  deleteFileFromPath(model.path)
}