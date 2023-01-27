export interface ILinks {
    id: number;
    name: string;
    isActive: boolean;
    to: string;
}

export interface ITodo {
    id?: string;
    description: string;
    isDone: boolean;
}
