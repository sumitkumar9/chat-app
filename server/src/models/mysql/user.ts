import { DataTypes, Model } from 'sequelize';
import { MYSQL_CONNECTION } from '../../config/database_mysql'; // Adjust the path as needed

interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
}

export class User extends Model<UserAttributes> {}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        username: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        tableName: 'User',
        sequelize: MYSQL_CONNECTION,
        freezeTableName: true,
        timestamps: false,
    }
);