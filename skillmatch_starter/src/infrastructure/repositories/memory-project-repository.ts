import { Project } from "../../domain/entities/Project";

export class MemoryProjectRepository{
    projects: Project[] = [];

    save(project: Project) {
        this.projects.push(project)
    }

    findById(id: string){
        return this.projects.find(p => p.props.id === id)
    }
}

