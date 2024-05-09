import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name', length: 255 })
    firstName: string;

    @Column({ name: 'last_name', length: 255 })
    lastName: string;

    @Index({ unique: true })
    @Column({ length: 255 })
    username: string;

    @Index({ unique: true })
    @Column({ name: 'auth_key', length: 255, nullable: true })
    authKey: string;

    @Column({ name: 'password_hash', length: 255 })
    passwordHash: string;

    @Index()
    @Column({ name: 'password_reset_token', length: 255, nullable: true })
    passwordResetToken: string | null;

    @Index()
    @Column({ length: 255 })
    email: string;

    @Column({ name: 'ip_address', length: 255, nullable: true })
    ipAddress: string | null;

    @Index()
    @Column({ type: 'smallint', default: 10 })
    status: number;

    @Index()
    @Column({ length: 20, default: 'user' })
    role: string;

    @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ name: 'updated_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;


    @Column({ name: 'verification_token', length: 255, nullable: true })
    verificationToken: string | null;
}
