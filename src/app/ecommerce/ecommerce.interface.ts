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
