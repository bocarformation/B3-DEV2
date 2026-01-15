import { IDGenerator } from "../../domain/interfaces/id-generator.interface";

export class StaticIdGenerator implements IDGenerator{
    generate(): string {
        return  "1"
    }
}