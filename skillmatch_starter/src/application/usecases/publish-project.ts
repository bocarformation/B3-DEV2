import { Skill } from "../../domain/value-objects/skill";

interface PublishProjectPayload{
    title: string,
    description: string,
    skills: string[]
}


export class PublishProjectUseCase {
    async execute(payload: PublishProjectPayload ){
        if(!payload.title){
            throw new Error("Title is required");
        }

        if(!payload.description){
            throw new Error("Description is required");
        }
        const skills = payload.skills.map(s => new Skill(s,true));
        if(skills.length < 2) {
            throw new Error("At least two skills are required");
        }
    }
}
