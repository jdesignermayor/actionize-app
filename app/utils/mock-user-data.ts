const MOCK_USER_TASKS: TaskList = {
    tasks: [
        {
            "name": "Organize Weekly Review - Pending Task",
            "description": "Organize the upcoming weekly review for all tasks and projects to ensure everything is on track.",
            "categoryIds": [
                {
                    "id": "1",
                    "name": "Organize Weekly Review",
                    "description": "Organize the upcoming weekly review for all tasks and projects to ensure everything is on track."
                }
            ]
        },
        {
            "name": "Prepare Presentation Slides for Upcoming Meeting",
            "description": "Prepare and finalize presentation slides for the meeting scheduled for the upcoming week.",
            "categoryIds": [
                {
                    "id": "2",
                    "name": "Prepare Presentation Slides",
                    "description": "Prepare and finalize presentation slides for the meeting scheduled for the upcoming week."
                }
            ]
        },
        {
            "name": "Update Personal Budget - Review and Adjustments",
            "description": "Review and adjust the personal budget, ensuring expenses and savings are aligned with current financial goals.",
            "categoryIds": [
                {
                    "id": "3",
                    "name": "Update Personal Budget",
                    "description": "Review and adjust the personal budget, ensuring expenses and savings are aligned with current financial goals."
                }
            ]
        },
        {
            "name": "Schedule Doctor Appointment for Health Checkup",
            "description": "Book an appointment for the upcoming health checkup as part of personal wellness.",
            "categoryIds": [
                {
                    "id": "4",
                    "name": "Schedule Doctor Appointment",
                    "description": "Book an appointment for the upcoming health checkup as part of personal wellness."
                }
            ]
        },
        {
            "name": "Respond to Client Emails Urgently",
            "description": "Respond to time-sensitive client emails to maintain positive communication and progress.",
            "categoryIds": [
                {
                    "id": "5",
                    "name": "Respond to Client Emails",
                    "description": "Respond to time-sensitive client emails to maintain positive communication and progress."
                }
            ]
        },
        {
            "name": "Plan Family Gathering - Set Date and Venue",
            "description": "Plan a family gathering by setting the date, venue, and preparing invitations.",
            "categoryIds": [
                {
                    "id": "6",
                    "name": "Plan Family Gathering",
                    "description": "Plan a family gathering by setting the date, venue, and preparing invitations."
                }
            ]
        },
        {
            "name": "Review Project Budget and Allocate Resources",
            "description": "Review the current project budget and allocate resources efficiently for the next phase.",
            "categoryIds": [
                {
                    "id": "7",
                    "name": "Review Project Budget",
                    "description": "Review the current project budget and allocate resources efficiently for the next phase."
                }
            ]
        },
        {
            "name": "Call the Electrician for Home Repairs",
            "description": "Contact the electrician to schedule the necessary home repairs and checkups.",
            "categoryIds": [
                {
                    "id": "8",
                    "name": "Call the Electrician",
                    "description": "Contact the electrician to schedule the necessary home repairs and checkups."
                }
            ]
        },
        {
            "name": "Finalize Travel Plans and Book Tickets for Business Trip",
            "description": "Finalize the travel plans and book tickets for the upcoming business trip to ensure everything is prepared.",
            "categoryIds": [
                {
                    "id": "9",
                    "name": "Finalize Travel Plans",
                    "description": "Finalize the travel plans and book tickets for the upcoming business trip to ensure everything is prepared."
                }
            ]
        },
        {
            "name": "Review and Organize Upcoming Meetings Schedule",
            "description": "Review and organize the meetings schedule for the next week to ensure effective time management.",
            "categoryIds": [
                {
                    "id": "10",
                    "name": "Review and Organize Meetings Schedule",
                    "description": "Review and organize the meetings schedule for the next week to ensure effective time management."
                }
            ]
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

export { MOCK_USER_TASKS };

