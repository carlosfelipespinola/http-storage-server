import { Router } from 'express';
import { createMultipartFormHandler } from '../middlewares/multipart_form_middleware.js';
import { saveAudioFile } from '../services/audio_services.js';
import { deleteFile, findFilePathById } from '../services/file_service.js';
import { buildFileUrl } from '../utils/file_utils.js';

const audioRouter = Router();

const multipartFormHandler = createMultipartFormHandler('/audio')


audioRouter.get('/:id', async (req, res) => {
  try {
    const path = await findFilePathById(req.params.id)
    res.sendFile(path)
  } catch (error) {
    if (typeof error !== 'string') { throw error }
    res.status(400).send({ errorCode: error })
  }
})

audioRouter.post('', multipartFormHandler.single('file'), async (req, res) => {
  try {
    const createdModel = await saveAudioFile({
      path: req.file.path,
      mimeType: req.file.mimetype,
      name: req.file.filename
    })
    req.hostname
    res.status(201).send({ id: createdModel.id, url: buildFileUrl(req, createdModel.path)})
  } catch (error) {
    console.log(error)
    if (typeof error !== 'string') { throw error }
    res.status(400).send({ errorCode: error })
  }
})

audioRouter.put('/:id', multipartFormHandler.single('file'), async (req, res) => {
  try {
    console.log(req.params.id)
    const updatedModel = await saveAudioFile({
      id: req.params.id,
      path: req.file.path,
      mimeType: req.file.mimetype,
      name: req.file.filename
    })
    res.status(200).send({ id: updatedModel.id, url: buildFileUrl(req, updatedModel.path)})
  } catch (error) {
    if (typeof error !== 'string') { throw error }
    res.status(400).send({ errorCode: error })
  }
})

audioRouter.delete('/:id', async (req, res) => {
  try {
    await deleteFile(req.params.id)
    res.status(204).send()
  } catch (error) {
    if (typeof error !== 'string') { throw error }
    res.status(400).send({ errorCode: error })
  }
})


export default audioRouter