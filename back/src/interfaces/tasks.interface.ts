export interface RESPONSE_GET_TASKS {
    status: boolean,
    message: string,
    data: TASK[]
}

export interface RESPONSE_TASK {
    status: boolean,
    message: string,
    data: TASK
}

export interface TASK {
    id?: string,
    title: string,
    description: string
    createdAt: string
    completed: boolean,
    email: string
}