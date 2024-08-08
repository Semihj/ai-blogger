import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { nanoid } from "nanoid";

/* Queries */

export const getTemplatesByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const template = await ctx.db
      .query("blogTemplates")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    return template;
  },
});

export const getTemplateById = query({
  args: { userId: v.string(), templateId: v.string() },
  handler: async (ctx, args) => {
    const { userId, templateId } = args;

    const blogTemplates = await getTemplatesByUserId(ctx, { userId: userId });

    if (!blogTemplates) {
      return null; // Or handle the case where no templates exist for the user
    }

    const template = blogTemplates.templates.find((t) => t.id === templateId);

    return template;
  },
});

export const createTemplateField = mutation({
  args: {
    userId: v.string(),
    templates: v.array(
      v.object({
        code: v.string(),
        jsonValue: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const existingTemplate = await getTemplatesByUserId(ctx, {
      userId: args.userId,
    }); // Pass ctx and args
    if (existingTemplate) {
      return existingTemplate; // Or return a specific error message
    }

    try {
      const newTemplates = await ctx.db.insert("blogTemplates", {
        userId: args.userId,
        templates: [
          {
            id: nanoid(),
            code: args.templates[0].code,
            jsonValue: args.templates[0].jsonValue,
            creationTime: Date.now(),
          },
        ],
        bookMarks: [],
      });
      return newTemplates; // Return the inserted templates
    } catch (error) {
      // Handle the error, e.g., log it or throw a custom error
      console.error("Error creating template:", error);
      throw new Error("Failed to create template");
    }
  },
});

export const getTemplatesAndSort = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const templates = await getTemplatesByUserId(ctx, { userId: args.userId });

    if (!templates) return [];

    const sortedTemplates = templates.templates.sort(
      (a, b) => b.creationTime - a.creationTime
    );

    return sortedTemplates;
  },
});

export const getDatesOfTemplates = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const templates = await getTemplatesByUserId(ctx, { userId: args.userId });
    if (!templates) return;

    const templateDates = [];
    const dates = templates.templates.map((template) => template.creationTime);
    return dates;
  },
});

export const getBookMarks = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const bookMarks = await getTemplatesByUserId(ctx, { userId: args.userId });
    if (bookMarks) {
      return bookMarks?.bookMarks;
    } else {
      return {"error":"There is No bookMarks field"}
    }
  },
});

export const getBookMarkByTitle = query({
  args:{
    userId:v.string(),
    title:v.string(),
  
  },
  handler:async (ctx,args) => {
    const bookMarks = await getTemplatesByUserId(ctx,{userId:args.userId}).then((data) => data?.bookMarks );
    const bookMark = bookMarks?.find((data) => data?.title === args.title)
    return bookMark
  }
})

export const isInBookMark = query({
  args:{
    userId:v.string(),
    title:v.string(),
    id:v.string(),
  },
  handler:async (ctx,args) => {
    const bookMark = await getBookMarkByTitle(ctx,{userId:args.userId,title:args.title})
    const isSame = bookMark?.templates.map((template) => template.id === args.id)
    if(isSame) {
      return true
    } else {
      return false
    }
  }
})


/* Mutations */


export const addTemplateToBookMark = mutation({
  args:{userId:v.string(),
    title:v.string(),
    template:v.any(),
  },
  handler:async (ctx,args) => {
    const bookMarkField = await getBookMarks(ctx,{userId:args.userId})
    const getId = await getTemplatesByUserId(ctx,{userId:args.userId})
    const isSame = await isInBookMark(ctx,{userId:args.userId,title:args.title,id:args.template?.id})
    if(isSame) {
      return "Already In BookMark"
    } else {
       const updatedBookmarks = bookMarkField?.map((bookmark) => {
      if (bookmark.title === args.title) {
        return {
          ...bookmark,
          templates:[...bookmark.templates,args.template],
        };
      }
      return bookmark;
    });

    await ctx.db.patch(getId?._id, {...getId, bookMarks: updatedBookmarks });
    return updatedBookmarks
    }
   
    
  }
})

export const addBookMark = mutation({
  args:{userId:v.string(),
    bookMark:v.object({
      title:v.string(),
      templates:v.array(v.any()),
      creationTime:v.number(),
      description:v.optional(v.string())
    })
  },
  handler:async (ctx,args) => {
    const existingTemplate:any = await getTemplatesByUserId(ctx,{userId:args.userId})

    const newBookMarks = [...existingTemplate?.bookMarks,{id:nanoid(),...args.bookMark}]
    const newData = {
      userId:args.userId,
      templates:existingTemplate?.templates,
      bookMarks:newBookMarks
    }

    await ctx.db.replace(existingTemplate._id, newData);
  }
})

export const addTemplate = mutation({
  args: {
    userId: v.string(),
    newTemplate: v.object({
      code: v.string(),
      jsonValue: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const existingTemplate = await getTemplatesByUserId(ctx, {
      userId: args.userId,
    });

    if (!existingTemplate) {
      const createdTemplate = await createTemplateField(ctx, {
        userId: args.userId,
        templates: [
          {
            code: args.newTemplate.code,
            jsonValue: args.newTemplate.jsonValue,
          },
        ],
      });
      return createdTemplate;
    }

    const updatedTemplates = [
      ...existingTemplate.templates,
      {
        id: nanoid(),
        code: args.newTemplate.code,
        jsonValue: args.newTemplate.jsonValue,
        creationTime: Date.now(),
      },
    ];
    const newData = {
      userId: args.userId,
      templates: updatedTemplates,
      bookMarks: existingTemplate.bookMarks,
    };

    await ctx.db.replace(existingTemplate._id, newData);

    return updatedTemplates;
  },
});

export const deleteTemplate = mutation({
  args: { userId: v.string(), templateId: v.string() },
  handler: async (ctx, args) => {
    const userTemplates = await getTemplatesByUserId(ctx, {
      userId: args.userId,
    });
    if (!userTemplates) {
      throw new Error("User not found");
    }

    const newTemplates = userTemplates.templates.filter(
      (template: any) => template.id !== args.templateId
    );

    await ctx.db.replace(userTemplates._id, {
      userId: args.userId,
      templates: newTemplates,
      bookMarks: userTemplates.bookMarks,
    });

    return true;
  },
});


