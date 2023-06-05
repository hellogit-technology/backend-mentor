export interface IAdminAccount {
  fullname?: string;
  email?: string;
  campus?: string;
  role?: number;
  editor: string;
}

export interface PayloadAdminAccount {
  fullname: string;
  email: string;
  campus: string;
  role: number;
  editor: string;
}   


export interface IClubAccount {
  fullname?: string;
  email?: string;
  schoolId?: string;
  campus?: string;
  role?: number;
  club?: string;
  editor: string;
}

export interface PayloadClubAccount {
    fullname: string;
    email: string;
    schoolId: string;
    campus: string;
    role: number;
    club: string;
    editor: string;
  }
