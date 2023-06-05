export interface IEvent {
    eventId?: string;
    name?: string;
    date?: string;
    campus?: string;
    club?: string[];
    poster?: {
      photo: string;
      cloudinaryId: string;
    };
    slug?: string;
    participant?: string[];
    qrcode?: {
      photo: string;
      cloudinaryId: string;
    };
    expire?: boolean;
    editor: string;
  }