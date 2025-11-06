import sequelize from '../config/database';
import Project from './Project';

const models = {
  Project,
};

export { sequelize, Project };

export default models;
