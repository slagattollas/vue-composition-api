export interface ItemElement {
    _id: string;
    description: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Meta {
    itemCount: number;
    offset: number;
    limit: number;
    pageCount: number;
    page: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: null;
    nextPage: null;
}

export interface Item {
    items?: ItemElement[];
    meta?: Meta;
}
