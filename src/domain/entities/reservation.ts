export interface Comment {
    text: string;
    timestamp?: string;
}

export interface Comments {
    [key: string]: Array<{ text: string }>;
};
export interface Suggestion {
    id: number;
    text: string;
}

export interface TourismDetail {
    id: number;
    detail: string;
}

export interface ReservationDetails {
    comments: Comments;
    formattedSuggestions: Suggestion[];
    tourismDetails: TourismDetail[];

}

export interface ReservationData {
    id: string
    suggestion: string;
    tourism: string[];
    comments: Comments;
}

