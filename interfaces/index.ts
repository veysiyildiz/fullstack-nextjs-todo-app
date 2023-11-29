export type Status = 'Todo' | 'In Progress' | 'Done'
export interface Data {
    _id: string
    title: string
    desc: string
    status: string
    createdAt: string
}

export interface ImgResponseType {
  name: string;
  size: number;
  key: string;
  serverData: null;
  url: string;
  fileUrl: string;
}