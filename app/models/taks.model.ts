interface Task {
    id: string,
    name: string,
    description: string,
    categoryIds: Array<string>,
}

interface TaskList {
    tasks: Task[],
    rates?: TaskListRates,
}

interface TaskCategory {
    id: string,
    name: string,
    description: string,
}

interface TaskListRates {
    total: number,
    opened: number,
    completed: number,
    canceled: number,
    pending: number,
}
