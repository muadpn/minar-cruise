import { db } from "@/db";

export type TGetBlogPosts = Awaited<ReturnType<typeof getBlogPosts>>;
export async function getBlogPosts() {
  try {
    const data = await db.blog.findMany({
      where:{
        blogStatus: "PUBLISHED"
      },
      select: {
        id: true,
        title: true,
        shortDes: true,
        image: true,
        imageId: true,
        author: true,
        blogSlug: true,
      },
    });

    if (!data) {
      console.log("Failed to load blog posts");
    }
    return data;
  } catch (e) {
    return null;
  }
}

export type TGetBlogPostBySlug = Awaited<ReturnType<typeof getBlogPostById>>;
export async function getBlogPostById({ id }: { id: string }) {
  try {
    const data = await db.blog.findUnique({
      where: {
        blogSlug: id,
        blogStatus: "PUBLISHED",
      },
      select: {
        id: true,
        blogSlug: true,
        author: true,
        content: true,
        image: true,
        imageId: true,
        title: true,
      },
    });

    if (!data) {
      console.log("Failed to load blog post");
      return null;
    }
    return data;
  } catch (error) {
    return null;
  }
}

// export type TGetRecentPosts = Awaited<ReturnType<typeof getRecentPosts>>;
// export async function getRecentPosts() {
//   try {
//     const data = await db.blog.findMany({
//       select: {
//         id: true,
//         title: true,
//         shortDes: true,
//         image: true,
//         author: true,
//         blogSlug: true,
//       },
//     });

//     if (!data) {
//       console.log("Failed to load blog posts");
//     }
//     return data;
//   } catch (e) {
//     return null;
//   }
// }