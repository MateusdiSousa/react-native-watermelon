import { appSchema} from "@nozbe/watermelondb";
import { culturaSchema } from "./culturaSchema";

export const mySchema = appSchema({
    version:1,
    tables: [culturaSchema],
}) 