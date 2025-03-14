interface Priority {
    id: string,
    name: string,
    description: string,
    color: string,
}

interface PriorityTag {
    id: string,
    name: string,
    description: string,
    priorityId: string,
}

interface Teamplate {
    id: string,
    name: string,
    description: string,
    priorityId: string,
}