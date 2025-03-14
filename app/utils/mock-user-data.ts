import { Priority, PriorityTag, Teamplate } from "@/app/models/system.model";
import { TaskListType } from "@/app/models/taks.model";

const MOCK_USER_TASKS: TaskListType = {
    tasks: [
        {
            id: '001',
            name: "Organize Weekly Review - Pending Task",
            description: "Organize the upcoming weekly review for all tasks and projects to ensure everything is on track.",
            categoryIds: ['2'],
        },
        {
            id: '002',
            name: "Prepare Presentation Slides for Upcoming Meeting",
            description: "Prepare and finalize presentation slides for the meeting scheduled for the upcoming week.",
            categoryIds: ['1'],
        },
        {
            id: '003',
            name: "Update Personal Budget - Review and Adjustments",
            description: "Review and adjust the personal budget, ensuring expenses and savings are aligned with current financial goals.",
            categoryIds: ['3']
        },
        {
            id: '004',
            name: "Schedule Doctor Appointment for Health Checkup",
            description: "Book an appointment for the upcoming health checkup as part of personal wellness.",
            categoryIds: ['4']
        }, {
            id: '005',
            name: "Respond to Client Emails Urgently",
            description: "Respond to time-sensitive client emails to maintain positive communication and progress.",
            categoryIds: ['5']
        }

    ],
    rates: {
        total: 0,
        opened: 0,
        completed: 0,
        canceled: 0,
        pending: 0,
    }
}

const MOCK_USER_TEAMPLATES: Teamplate[] = [{
    "id": "1",
    "name": "Work-Life Balance Template",
    "description": "Create tasks to balance work, exercise, and personal time.",
    "priorityId": "1"
},
{
    "id": "2",
    "name": "Daily Routine Template",
    "description": "Organize your day to include work, exercise, and relaxation.",
    "priorityId": "2"
}];


const MOCK_USER_PRIORITIES: Priority[] = [{
    "id": "1",
    "name": "High",
    "description": "High priority tasks are those that require immediate attention and should be completed as soon as possible.",
    "color": "#FF0000"
}, {
    "id": "2",
    "name": "Medium",
    "description": "Medium priority tasks are those that require some attention but can be completed later.",
    "color": "#FFA500"
}, {
    "id": "3",
    "name": "Low",
    "description": "Low priority tasks are those that can be completed later but are not as important.",
    "color": "#00FF00"
}];


const MOCK_USER_PRIORITY_TAGS: PriorityTag[] = [{
    "id": "1",
    "name": "Work",
    "description": "Work related tasks.",
    "priorityId": "1",
}, {
    "id": "2",
    "name": "Personal",
    "description": "Personal related tasks.",
    "priorityId": "2",
}, {
    "id": "3",
    "name": "Health",
    "description": "Health related tasks.",
    "priorityId": "3",
}, {
    "id": "4",
    "name": "today",
    "description": "Today related tasks.",
    "priorityId": "3",
}, {
    "id": "5",
    "name": "tomorrow",
    "description": "Tomorrow related tasks.",
    "priorityId": "3",
}, {
    "id": "6",
    "name": "next week",
    "description": "Next week related tasks.",
    "priorityId": "3",
}, {
    "id": "7",
    "name": "Exercise",
    "description": "Exercise related tasks.",
    "priorityId": "4",
}];

export { MOCK_USER_PRIORITIES, MOCK_USER_PRIORITY_TAGS, MOCK_USER_TASKS, MOCK_USER_TEAMPLATES };

