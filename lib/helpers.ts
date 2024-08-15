
export const sortByCreationTime = async ({bookmarks}:{bookmarks:any}) => {
    return bookmarks?.sort((a:any, b:any) => {
        // Assuming creationTime is a number or sortable string
        return b.creationTime - a.creationTime;
      });
}