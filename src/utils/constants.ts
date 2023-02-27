export interface TodoItemProp {
    title: string
    date: Date
    completed: boolean,
    id: number
}

export enum MODE {
    CREATE= 'CREATE',
    EDIT= 'EDIT',
}