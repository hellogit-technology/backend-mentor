export interface IClub {
  clubId?: string;
  name?: string;
  email?: string;
  nickname?: string;
  fanpage?: string;
  founding?: string;
  campus?: string;
  avatar?: {
    photo: string;
    cloudinaryId: string;
  };
  slug?: string;
  editor: string;
}
