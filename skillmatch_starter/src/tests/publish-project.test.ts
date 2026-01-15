import { PublishProjectUseCase } from "../application/usecases/publish-project";
import { MemoryProjectRepository } from "../infrastructure/repositories/memory-project-repository";

describe("publish project", () => {

    let usecase: PublishProjectUseCase;
    let repository: MemoryProjectRepository

    beforeEach(() => {
        repository = new MemoryProjectRepository();
        usecase = new PublishProjectUseCase(repository);
    })

    describe("Scenario: no title", () => {
        const payload = {
            title: "",
            description: "Créer une API",
            skills: ["TypeScript", "NodeJS", "Express", "MongoDB", "Docker"]
        }
        it("should throw an error", async () => {
            await expect(() => usecase.execute(payload)).rejects.toThrow("Title is required");
        })
    });

    describe("Scenario: no description", () => {
        const payload = {
            title: "Créer une API JS",
            description: "",
            skills: ["TypeScript", "NodeJS", "Express", "MongoDB", "Docker"]
        }

        it("should throw an error", async () => {
            await expect(() => usecase.execute(payload)).rejects.toThrow("Description is required");
        })
    })

    describe("Scenario: At least two skills are required", () => {
        const payload = {
            title: "Créer une API TS",
            description: "Créer une api",
            skills: ["TypeScript"]
        }
        it('should throw an error', async () => {
            await expect(() => usecase.execute(payload)).rejects.toThrow("At least two different skills are required");
        })
    })

    describe("Scneario: no duplicate skills", () => {
        const payload = {
            title: "Créer une API Node",
            description: "Faire une API REST",
            skills:["TypeScript","TypeScript"]
        }

        it("should throw an error",async () => {
            await expect(() => usecase.execute(payload)).rejects.toThrow("At least two different skills are required")
        })
    })


    describe("Scenario: Payload is valid", () => {
        const payload = {
            title: "Créer une API",
            description: "Faire une API",
            skills: ["TypeScript", "NodeJS","Express", "MongoDB", "Docker"]
        }

        it("should be saved in the database", async () => {
            const id = await usecase.execute(payload);

            const createdProject = await repository.findById(id)

            expect(createdProject).toBeDefined();
            expect(createdProject!.props.title).toEqual(payload.title)
            expect(createdProject!.props.description).toEqual(payload.description);

        })

        it("should return the ID of the project", async () => {
            const id = await usecase.execute(payload);
            expect(id).toEqual("1");
        })
    })

});