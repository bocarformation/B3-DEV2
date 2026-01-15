import { PublishProjectUseCase } from "../application/usecases/publish-project";

describe("publish project", () => {


    describe("Scenario: no title", () => {
        const payload = {
            title: "",
            description: "Créer une API",
            skills: ["TypeScript", "NodeJS", "Express", "MongoDB", "Docker"]
        }
        it("should throw an error", async () => {
            const usecase = new PublishProjectUseCase();
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
            const usecase = new PublishProjectUseCase();
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
            const usecase = new PublishProjectUseCase();
            await expect(() => usecase.execute(payload)).rejects.toThrow("At least two skills are required");
        })
    })

});