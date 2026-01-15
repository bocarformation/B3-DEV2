import { Project } from "../../domain/entities/Project";
import { IProjectRepository } from "../../domain/interfaces/project-repository.interface";
import { SkillSet } from "../../domain/skill/skill-set";
import { Skill } from "../../domain/skill/value-objects/skill";

interface PublishProjectPayload{
    title: string,
    description: string,
    skills: string[]
}


export class PublishProjectUseCase {

    constructor(private readonly projectRepository: IProjectRepository){}

    async execute(payload: PublishProjectPayload ){
        const id: string = "1";
        

        if(!payload.title){
            throw new Error("Title is required");
        }

        if(!payload.description){
            throw new Error("Description is required");
        }
        const skills = payload.skills.map(s => new Skill(s,true));
        const skillSet = new SkillSet(skills)

        if(!skillSet.hasAtLeast(2)){
            throw new Error("At least two different skills are required")
        }

            const project = new Project({
            id,
            title: payload.title,
            description: payload.description,
            skills
        });

        this.projectRepository.save(project)

        return id
    }
}
