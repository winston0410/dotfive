export interface IIdOnly {
    id: number;
}

export interface ILabel extends IIdOnly {
	label: string;
};

// NOTE Union type for all other interfaces
export type IData = ILabel

export enum IDataType {
    Label
}

export enum IMutation {
    Create,
    Update,
    Remove
}

export type IAction<T> = {
	type: IDataType;
    mutation: IMutation
	payload: T | IIdOnly;
};

