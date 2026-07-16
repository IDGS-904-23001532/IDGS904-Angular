
export interface Transformation {
    id: number;
    name: string;
    image: string;
    ki: string;
    deletedAt?: string | null;
}

export interface DragonBall {
    id: number;
    name: string;
    ki: string;
    maxKi: string;
    race: string;
    gender: string;
    description: string;
    image: string;
    affiliation?: string;
    affiliations?: string[];
    transformations?: Transformation[];
}