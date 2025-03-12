interface Task {
    name: string,
    description: string,
    categoryIds: TaskCategory[],
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