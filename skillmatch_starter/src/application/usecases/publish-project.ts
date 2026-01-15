import { Project } from "../../domain/entities/Project";
import { IDGenerator } from "../../domain/interfaces/id-generator.interface";
import { IProjectRepository } from "../../domain/interfaces/project-repository.interface";
import { SkillSet } from "../../domain/skill/skill-set";
import { Skill } from "../../domain/skill/value-objects/skill";

interface PublishProjectPayload {
    title: string,
    description: string,
    skills: string[]
}


export class PublishProjectUseCase {

    constructor(
        private readonly projectRepository: IProjectRepository,
        private readonly idGenerator: IDGenerator
    ) { }

    async execute(payload: PublishProjectPayload) {
        const id: string = this.idGenerator.generate();
        const skills = payload.skills.map(s => new Skill(s, true));
        const skillSet = new SkillSet(skills)

        const project = new Project({
            id,
            title: payload.title,
            description: payload.description,
            skills
        });
        
        if (!skillSet.hasAtLeast(2)) {
            throw new Error("At least two different skills are required")
        }

        project.validateOrThrow()

        this.projectRepository.save(project)

        return id
    }
}
