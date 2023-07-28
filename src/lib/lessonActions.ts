import { AppDataSource } from "../data-source"
import { Lesson } from "../models/lesson"
import { findOneCourse } from "./courseActions";

const repository = AppDataSource.getRepository(Lesson);

export const uploadOneLesson = async (data:object,courseID:number) => {
    const course = await findOneCourse(courseID);
    const newLesson = await AppDataSource.manager.transaction(
        "REPEATABLE READ",
        async (transactionalEntityManager) => {
            const repo = transactionalEntityManager.getRepository(Lesson);

            const result = await repo
            .createQueryBuilder("lessons")
            .select("MAX(lessons.sequenceNo)", "max")
            .getRawOne();

            const lesson = repo.create({
                ...data,
                sequenceNo:(result?.max ?? 0) + 1,
                course,
            })
            await repo.save(lesson);
            return lesson
        }
    )
    return newLesson;
}

export const getManyLessons = async (courseId:number) => {
    const lessons = await repository
    .createQueryBuilder("lessons")
    .where("lessons.course.id = :courseId", {courseId})
    .orderBy("lessons.sequenceNo")
    .getMany();
    
    return lessons;
}

export const updateOneLesson = async (lessonId:number , changes:object) => {
    const course = await repository
        .createQueryBuilder()
        .update(Lesson)
        .set(changes)
        .where("id = :lessonId",{lessonId})
        .execute();

    return course
}

export const removeOneLesson = async (lessonId:number) =>{
    const result = await AppDataSource.manager.transaction(
        "REPEATABLE READ",
        async (transactionalEntityManager) => {
            const result = await transactionalEntityManager.getRepository(Lesson)
                .createQueryBuilder("courses")
                .delete()
                .from(Lesson)
                .where("id = :lessonId",{lessonId})
                .execute();

            return result
        }
    )
    return result;
}