const MOCK_USER_TASKS: TaskList = {
    tasks: [
        {
            name: 'Get things done: Non-actionable, Actionable',
            description: 'Get things done: Non-actionable, Actionable',
            categoryIds: [
                {
                    id: '1',
                    name: 'Get things done: Non-actionable, Actionable',
                    description: 'Get things done: Non-actionable, Actionable',
                }
            ],
        },
        {
            name: 'Balance your life: Work, Family, Friends',
            description: 'Balance your life: Work, Family, Friends',
            categoryIds: [
                {
                    id: '1',
                    name: 'Balance your life: Work, Family, Friends',
                    description: 'Balance your life: Work, Family, Friends',
                }
            ],
        },
        {
            name: 'Focused guy: Work, Workout, Self-Care',
            description: 'Focused guy: Work, Workout, Self-Care',
            categoryIds: [
                {
                    id: '1',
                    name: 'Focused guy: Work, Workout, Self-Care',
                    description: 'Focused guy: Work, Workout, Self-Care',
                }
            ],
        },
    ],
    rates: {
        total: 0,
        opened: 0,
        completed: 0,
        canceled: 0,
        pending: 0,
    }
}

export { MOCK_USER_TASKS };

