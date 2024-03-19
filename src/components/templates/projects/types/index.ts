
export type ProjectRound = {
    fundingGoal: number;
    endAt: number;
}

export type ProjectData = {
    name: string
    url: string
    category: string
    totalFundingGoal: number
    totalRound: number
    rounds: ProjectRound[]
}