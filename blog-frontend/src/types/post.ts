// types/post.ts (Complete updated version)
export interface Post {
  id: number;
  attributes: {
    title: string;
    slug: string;
    author: string;
    content: string;
    publishedDate: string;
    publishedAt: string;
    updatedAt: string;
    createdAt: string;
    documentId?: string;
    coverImage?: {
      data?: {
        id: number;
        attributes: {
          name: string;
          url: string;
          alternativeText?: string | null;
          caption?: string | null;
          width: number;
          height: number;
          formats?: {
            [key: string]: {
              name: string;
              hash: string;
              ext: string;
              mime: string;
              path?: string | null;
              width: number;
              height: number;
              size: number;
              sizeInBytes: number;
              url: string;
            };
          };
        };
      };
    };
  };
}