import { Schema } from 'mongoose';

export interface BaseScores {
  event?: [
    {
      scores: number;
      event: string;
    }
  ];
  attitude?: [
    {
      scores: number;
      club: string;
    }
  ];
  totalEvent?: number;
  totalAttitude?: number;
  month: number;
  student: string;
  editor: {
    userId: string;
    role: number;
  };
  historyEdit: [
    {
      userId: string;
      role: number;
    }
  ];
}

export interface BaseScoresUpdate {
  event?: [
    {
      scores: number;
      event: string;
    }
  ];
  attitude?: [
    {
      scores: number;
      club: string;
    }
  ];
  totalEvent?: number;
  totalAttitude?: number;
  editor: {
    userId: string;
    role: number;
  };
}

export interface EventScores {
  scores: number;
  event: {
    type: typeof Schema.Types.ObjectId;
    ref: 'Event';
  };
}

export interface AttitudeScores {
  scores: number;
  club: {
    type: typeof Schema.Types.ObjectId;
    ref: 'Club';
  };
}



export interface MemberScore {
  memberId: string;
  position: number;
  scores: number;
}

export interface ClubScore {
  clubServices: MemberScore[];
  month: number;
  clubId: string;
}
