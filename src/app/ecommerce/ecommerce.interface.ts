export interface IGenre{
  idMusicGenre?: number;
  nameMusicGenre: string;
  totalGroups?: number;
}

export interface IGroup {
  idGroup: number;
  nameGroup: string;
  imageGroup: string | null;
  photo?: File | null;
  photoName?: string | null;
  totalRecords?: number;
  musicGenreId: number;
  musicGenreName: string,
  musicGenre: string;
}

export interface IRecord {
  idRecord: number;
  titleRecord: string;
  yearOfPublication: number | null;
  imageRecord: string | null;
  photo?: File | null;
  photoName?: string | null;
  price: number;
  stock: number;
  discontinued: boolean;
  groupId: number | null;
  group?: string;
  nameGroup: string;
}


