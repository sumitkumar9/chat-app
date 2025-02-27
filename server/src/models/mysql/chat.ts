import { DataTypes, Model } from 'sequelize';
import { MYSQL_CONNECTION } from '../../config/database_mysql';

export enum TYPES {
    PRIVATE = 'private',
    GROUP = 'group',
}

interface ChatAttributes {
    id: number;
    name: string,
    type: string,
    created_by: string,
    created_at: string,
    updated_at: string,
}

export class Chat extends Model<ChatAttributes> {}

Chat.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM(TYPES.PRIVATE, TYPES.GROUP),
            allowNull: false,
            defaultValue: TYPES.PRIVATE,
        },
        created_by: {
            type: DataTypes.UUID,
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
        },
    },
    {
        tableName: 'Chat',
        sequelize: MYSQL_CONNECTION,
        freezeTableName: true,
        timestamps: false,
    }
)