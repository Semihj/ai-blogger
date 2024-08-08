import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  blogTemplates:defineTable({
    userId:v.string(),
    templates:v.array(v.object({id:v.string(),code:v.string(),jsonValue:v.string(),creationTime:v.number()})),
    bookMarks:v.optional(v.array(v.object({
      id:v.string(),
      title:v.string(),
      templates:v.array(v.any()),
      creationTime:v.number(),
      description:v.optional(v.string())
    })))
  })
});

