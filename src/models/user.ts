import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name:"USERS"
})
export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    pictureUrl:string;

    @Column()
    isAdmin:boolean;

    @Column()
    passwordHash:string;

    @Column()
    passwordSalt:string;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;
}