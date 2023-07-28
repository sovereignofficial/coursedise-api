import { AppDataSource } from "../data-source";
import { Course } from "../models/course";

const repository = AppDataSource.getRepository(Course);

export const getManyCourse = async () => {
    const courses = await repository
        .createQueryBuilder("courses")  
        .orderBy("courses.sequenceNo")
        .getMany();

    return courses
}

export const createOneCourse = async (data: object) => {
    const newCourse = await AppDataSource.manager.transaction(
        "REPEATABLE READ",
        async (transactionalEntityManager) => {

            const repository = transactionalEntityManager.getRepository(Course)

            const result = await repository
                .createQueryBuilder("courses")
                .select("MAX(courses.sequenceNo)", "max")
                .getRawOne();

            const course = repository.create({
                ...data,
                sequenceNo: (result?.max ?? 0) + 1,

            })

            await repository.save(course);

            return course
        }
    )
    return newCourse;
}

export const findOneCourse = async (courseID: number) => {
    const course = await repository
        .findOneBy({ id: courseID });

    return course;
}

export const deleteOneCourse = async (courseID: number) => {
    const result = await AppDataSource.manager.transaction(
        "REPEATABLE READ",
        async (transactionalEntityManager) => {
            const result = await transactionalEntityManager.getRepository(Course)
                .createQueryBuilder("courses")
                .delete()
                .from(Course)
                .where("id = :courseID",{courseID})
                .execute();

            return result
        }
    )
    return result;
}

export const updateOneCourse = async (courseID: number, changes: object) => {
    const course = await repository
        .createQueryBuilder()
        .update(Course)
        .set(changes)
        .where("id = :courseID",{courseID})
        .execute();

    return course
}