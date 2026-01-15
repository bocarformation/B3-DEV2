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

}