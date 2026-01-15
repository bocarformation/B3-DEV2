import { Skill } from "./value-objects/skill";

export class SkillSet {
    private readonly skills: Skill[];

    constructor(skills: Skill[]){
        this.skills = this.removeDuplicates(skills)
    }

    private removeDuplicates(skills: Skill[]){
        // On va retirer les doublons
        const uniqueSkills: Skill[] = [];

        for(const skill of skills){
            if(!uniqueSkills.some(s => s.equals(skill))){
                uniqueSkills.push(skill)
            }
        }

        return uniqueSkills;
    }

    hasAtLeast(n: number):boolean {
        return this.skills.length >= n
    }

    getValidated(): Skill[]{
        return this.skills.filter(s => s.isValidated())
    }

    hasRequiredSkills(required: string[], ratio: number): boolean{
        const validatedNames = this.getValidated().map(s => s.getName().toLowerCase());
        const matches = required.filter(req => validatedNames.includes(req.toLowerCase()));

        return matches.length / required.length >= ratio;
    }

}


// const damienSkills = new SkillSet([
//     new Skill("React", true),
//     new Skill("TypeScript", true),
//     new Skill("Tailwind", false)
// ])

// const thomasRequiredSkills = ["TypeScript", "React", "Node"];

// const isEligible = damienSkills.hasRequiredSkills(thomasRequiredSkills, 0.6)// true