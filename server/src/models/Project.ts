import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ProjectAttributes {
  id: string;
  name: string;
  description?: string;
  sceneData: any;
  thumbnailUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id' | 'description' | 'thumbnailUrl'> {}

class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: string;
  public name!: string;
  public description?: string;
  public sceneData!: any;
  public thumbnailUrl?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sceneData: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'projects',
    timestamps: true,
  }
);

export default Project;
