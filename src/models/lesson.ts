import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course";

@Entity({
    name:"LESSONS"
})
export class Lesson{
   @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    duration:string;

    @Column()
    sequenceNo:number;

    @ManyToOne(()=>Course , course => course.lessons)
    @JoinColumn({
        name:"courseId"
    })
    course:Course

}