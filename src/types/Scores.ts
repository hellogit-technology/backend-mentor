export interface RequestBody {
    event?: [
        {
            scores: string,
            event: string
        }
    ], 
    attitude?: [
        {
            scores: string,
            club: string
        }
    ],
    totalEvent?: number,
    totalAttitude?: number,
    month: number,
    student: string,
    editor: {
        userId: string,
        role: number
    },
    historyEdit: [
        {
            userId: string,
            role: number
        }
    ]

}

export interface EventScores {
    scores: string,
    event: string
}

export interface AttitudeScores {
    scores: string,
    club: string
}