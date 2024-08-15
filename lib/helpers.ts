
export const sortByCreationTime = async ({bookmarks}:{bookmarks:any}) => {
    return bookmarks?.sort((a, b) => {
        // Assuming creationTime is a number or sortable string
        return b.creationTime - a.creationTime;
      });
}