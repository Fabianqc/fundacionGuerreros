import { UUID } from "crypto";

export default interface ActiveUserInterface {
    sub: UUID;
    email: string;
}