export type Status = 'Todo' | 'In Progress' | 'Done'
export interface Data {
    _id: string
    title: string
    desc: string
    status: Status
    createdAt: string
}
