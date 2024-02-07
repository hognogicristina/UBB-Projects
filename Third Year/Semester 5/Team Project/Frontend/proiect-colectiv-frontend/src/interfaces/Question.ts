export interface Question {
    summary: string, 
    name: string, 
    otherPeople: string[]
}

export interface Answer {
    answer: string, 
    isCorrect: boolean
}