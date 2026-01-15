import { Project } from "../../domain/entities/Project";
import { IProjectRepository } from "../../domain/interfaces/project-repository.interface";

export class MemoryProjectRepository implements IProjectRepository{
    projects: Project[] = [];

    async save(project: Project) {
        this.projects.push(project)
    }

   async findById(id: string){
        return this.projects.find(p => p.props.id === id) ?? null
    }
}

