export type BookEntity = {
  id: string;
  ISBN: string;
  title: string;
  author: string;
  description?: string;
  userIdFK: string;
  images: { pictureName: string }[]; //alterei para esse formato
};
