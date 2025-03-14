export interface TaskType {
    id: string,
    name: string,
    description: string,
    categoryIds: Array<string>,
}

export interface TaskListType {
    tasks: TaskType[],
    rates?: TaskListRatesType,
}

export interface TaskCategoryType {
    id: string,
    name: string,
    description: string,
}

export interface TaskListRatesType {
    total: number,
    opened: number,
    completed: number,
    canceled: number,
    pending: number,
}
