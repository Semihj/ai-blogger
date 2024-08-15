
export const sortByCreationTime = async ({data}:{data:any}) => {
    return data?.sort((a:any, b:any) => {
        // Assuming creationTime is a number or sortable string
        return b.creationTime - a.creationTime;
      });
}