import { ForgeExtension } from "@tryforge/forgescript";
import { resolve } from "path";

export class ForgeCanvas extends ForgeExtension {
    name = "ForgeCanvas";
    description = "Well the name says what it does.";
    version = "1.0.0";
    
    init(): void {
        this.load(resolve(__dirname, "./functions"));
    };
};