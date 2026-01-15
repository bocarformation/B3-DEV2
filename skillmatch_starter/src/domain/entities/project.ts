import { Skill } from "../skill/value-objects/skill";

export interface ProjectProps {
    id: string,
    title: string,
    description: string,
    skills: Skill[]
}

export class Project {
    props: ProjectProps

    constructor(props: ProjectProps){
        this.props = props
    }

    hasEmptyTitle(){
        return !this.props.title;
    }

    hasEmptyDescription(){
        return !this.props.description;
    }

    validateOrThrow(){
        if(this.hasEmptyTitle()){
            throw new Error("Title is required");
        }
        if(this.hasEmptyDescription()){
            throw new Error("Description is required")
        }
    }

}