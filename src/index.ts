import { ForgeExtension } from "@tryforge/forgescript";
import { resolve } from "path";

export class BananCanvas extends ForgeExtension {
    name = "BananCanvas";
    description = "Well the name says what it does.";
    version = "2.0.0";
    
    init(): void {
        this.load(resolve(__dirname, "./functions"));
    };
};
