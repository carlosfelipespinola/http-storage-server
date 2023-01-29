import { DataTypes } from 'sequelize';

export const fileColumns = {
  id: 'id',
  path: 'path'
}

export const fileSchema = {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    field: fileColumns.id
  },
  path: {
    type: DataTypes.STRING,
    field: fileColumns.path
  }
}