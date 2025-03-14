export interface Priority {
    id: string,
    name: string,
    description: string,
    color: string,
}

export interface PriorityTag {
    id: string,
    name: string,
    description: string,
    priorityId: string,
}

export interface Teamplate {
    id: string,
    name: string,
    description: string,
    priorityId: string,
}