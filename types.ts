import { Id } from "./convex/_generated/dataModel";


export interface bookmarkTypes
    {
        description?: string | undefined;
        id: string;
        templates: any[];
        creationTime: number;
        title: string;
    }[]


export interface bookmarkType
    {
        description?: string | undefined;
        id: string;
        templates: any[];
        creationTime: number;
        title: string;
    }


export interface dataField {
        _id: Id<"blogTemplates">;
        _creationTime: number;
        bookMarks?: {
            description?: string | undefined;
            id: string;
            templates: any[];
            creationTime: number;
            title: string;
        }[] | undefined;
        userId: string;
        templates: {

        }[];
}