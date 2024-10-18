import { Database } from "./supabaseTypes";

export type Book = Database["public"]["Tables"]["books"]["Row"];
