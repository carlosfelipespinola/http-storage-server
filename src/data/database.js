import { Sequelize } from 'sequelize';
import { afterFileDestroy, beforeFileUpdate } from './file_hooks.js';
import { fileSchema } from './file_schema.js';

// Option 1: Passing a connection URI
const sequelizeInstance = new Sequelize({
  dialect: 'sqlite',
  storage: 'database/database.sqlite'
});

export const FileModel = sequelizeInstance.define(
  'FileModel',
  fileSchema, {
  timestamps: true,
  hooks: {
    beforeUpdate: beforeFileUpdate,
    afterDestroy: afterFileDestroy
  }
})

export async function initializeDatabase() {
  await sequelizeInstance.authenticate()
  await FileModel.sync()
}

