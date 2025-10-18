import { DataTypes, Model } from 'sequelize';

export class User extends Model {
  toJSON() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }
}

export const initUser = (sequelize) => {
  User.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    full_name: { type: DataTypes.STRING(150), allowNull: false },
    email:    { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING(100), allowNull: false },
    role:     { type: DataTypes.ENUM('admin','reclutador','tecnico','cliente'), allowNull: false, defaultValue: 'reclutador' },
    active:   { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  }, {
    sequelize,
    tableName: 'users',
    indexes: [{ unique: true, fields: ['email'] }]
  });
  return User;
};
