const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Locus = db.define('Locus', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  assemblyId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'assembly_id',
  },
  locusName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'locus_name',
  },
  publicLocusName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'public_locus_name',
  },
  chromosome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  strand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  locusStart: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'locus_start',
  },
  locusStop: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'locus_stop',
  },
  memberCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'member_count',
  },
}, {
  tableName: 'rnc_locus',
  timestamps: false,
});

module.exports = Locus;
