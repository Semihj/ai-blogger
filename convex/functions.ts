import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { nanoid } from "nanoid";
import { bookmarkType, dataField } from "@/types";

/* Queries */

/* Template Queries */

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
      const id = nanoid()

      const newTemplates = await ctx.db.insert("blogTemplates", {
        userId: args.userId,
        templates: [
          {
            id: id,
            code: args.templates[0].code,
            jsonValue: args.templates[0].jsonValue,
            creationTime: Date.now(),
          },
        ],
        bookMarks: [],
      });

     
      return [{id:id}]; // Return the inserted templates
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

/* Bookmark Queries */

export const getBookMarks = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const db = await getTemplatesByUserId(ctx, { userId: args.userId });
    if (db) {
      return db?.bookMarks?.reverse();
    } else {
      return {error:"There is No bookMarks field"}
    }
  },
});


export const searchBookmarks = query({
  args: { title: v.string(),userId:v.string() },
  handler: async (ctx,args) => {
    const bookmarks:any = await getBookMarks(ctx,{
      userId:args.userId
    })
    const sort = bookmarks?.map((bookmark:any) => {
      if(bookmark.title.includes(args.title)) return bookmark
    })
    return sort
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
    return bookMark ? bookMark : false
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
    if(bookMark){
      const isSame = bookMark?.templates.find((template) => template === args.id)
    return isSame ? true : false
    }
    return "There is no Bookmark with this title"
}})


export const isBookMarkExists = query({
  args:{
    userId:v.string(),
    title:v.string(),
  },
  handler:async (ctx,args) => {
    const bookMark = await getBookMarkByTitle(ctx,{userId:args.userId,title:args.title})
    return bookMark ? true : false
}})


/* Mutations */
 
   /* BookMark Mutation */

export const addTemplateToBookMark = mutation({
  args:{userId:v.string(),
    title:v.string(),
    template:v.any(),
  },
  handler:async (ctx,args) => {
    const bookMarkField:any = await getBookMarks(ctx,{userId:args.userId})
    const getId:any = await getTemplatesByUserId(ctx,{userId:args.userId})
    const isSame = await isInBookMark(ctx,{userId:args.userId,title:args.title,id:args.template?.id})
    if(isSame) {
      return {error:"This Template Already Exists In This Bookmark"} 
    } else {
       const updatedBookmarks = bookMarkField?.map((bookmark:bookmarkType) => {
      if (bookmark.title === args.title) {
        return {
          ...bookmark,
          templates:[...bookmark.templates,args.template?.id],
        };
      }
      return bookmark;
    });

    await ctx.db.patch(getId?._id, {...getId, bookMarks: updatedBookmarks });
    return updatedBookmarks
    }
   ;
    
  }
})


export const removeTemplateFromBookMark = mutation({
  args:{
    userId:v.string(),
    title:v.string(),
    templateId:v.string(),
  },
  handler: async (ctx,args) => {
    const getId:any = await getTemplatesByUserId(ctx,{userId:args.userId})
    const bookmarks:any = await getBookMarks(ctx,{
      userId:args.userId
    })
    const bookmark:any = await getBookMarkByTitle(ctx,{
      userId:args.userId,
      title:args.title
    })
    const otherBookmarks:any = await bookmarks?.filter((data:bookmarkType) => data.title !== args.title )
    const updatedTemplates = await bookmark?.templates.filter((data:string) => data !== args.templateId )
    const updatedBookmark = {...bookmark,templates:updatedTemplates}
      
    otherBookmarks.push(updatedBookmark)
    
    await ctx.db.patch(getId?._id, {...getId, bookMarks:otherBookmarks })
    return updatedBookmark
    

  }
})


export const removeFromAllBookmarks = mutation({
  args: { userId: v.string(), templateId: v.string() },
  handler: async (ctx, args) => {
    const bookMarks:any = await getBookMarks(ctx, {
      userId: args.userId,
    });

    const bookmarksToUpdate:any = [];

    await bookMarks?.forEach(async (bookmark:bookmarkType) => {
      if (bookmark.templates.includes(args.templateId)) {
        bookmarksToUpdate.push({
          userId: args.userId,
          title: bookmark.title,
          templateId: args.templateId,
        });
      }
    });
    
    for (const bookmark of bookmarksToUpdate) {
      await removeTemplateFromBookMark(ctx, bookmark);
    }
  },
});



export const addBookMark = mutation({
  args:{userId:v.string(),
    bookMark:v.object({
      title:v.string(),
      creationTime:v.number(),
      description:v.optional(v.string())
    })
  },
  handler:async (ctx,args) => {

    const isExist = await isBookMarkExists(ctx,{userId:args.userId,title:args.bookMark.title})

    if(isExist) {
      return  {
        title:`You Already Have a Bookmark Named '${args.bookMark.title}' `,
        isError:true

      }
    }
    
    const existingTemplate:any = await getTemplatesByUserId(ctx,{userId:args.userId})

    const newBookMarks = [...existingTemplate?.bookMarks,{id:nanoid(),templates:[],...args.bookMark}]
    const newData = {
      userId:args.userId,
      templates:existingTemplate?.templates,
      bookMarks:newBookMarks
    }

    await ctx.db.replace(existingTemplate._id, newData);
    return  {
      title:`'${args.bookMark.title}' Bookmark Created`,
      isError:false

    }
  }
})

export const deleteBookMark = mutation({
  args:{userId:v.string() ,bookMarkId:v.string()},
  handler: async (ctx,args) => {
    const bookmarks:any = await getBookMarks(ctx,{userId:args.userId})
    const getField:any = await getTemplatesByUserId(ctx,{userId:args.userId})
   const updatedBookmarks =  await  bookmarks?.filter((bookmark:bookmarkType) => bookmark.id !== args.bookMarkId)

    await ctx.db.patch(getField?._id,{...getField,bookMarks:updatedBookmarks})
    return bookmarks
  }
})

/* Template Mutations */


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
      
      return createdTemplate ;
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
   
    await removeFromAllBookmarks(ctx,{
      userId:args.userId,
      templateId:args.templateId
    })
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


