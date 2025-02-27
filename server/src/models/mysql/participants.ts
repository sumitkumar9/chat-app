import { DataTypes, Model } from 'sequelize';
import { MYSQL_CONNECTION } from '../../config/database_mysql';

export enum ROLES {
    ADMIN = 'admin',
    MEMBER = 'member'
}

interface ParticipantAttributes {
    id: number;
    user_id: number;
    chat_id: number;
    role: string;
    created_at: string;
    updated_at: string;
}

export class Participant extends Model<ParticipantAttributes> {}

Participant.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    chat_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM(ROLES.ADMIN, ROLES.MEMBER),
        allowNull: false,
        defaultValue: ROLES.MEMBER,
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
}, {
    tableName: 'Participant',
    sequelize: MYSQL_CONNECTION,
    freezeTableName: true,
    timestamps: false,
})