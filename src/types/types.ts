export type Coordinates = [number, number]; // Координаты

export interface Address {
    title: string;        // Название адреса
    details: string;      // Описание адреса
}

export interface Marker {
    id: number;               // Уникальный идентификатор гео маркера
    name: string;             // Название гео маркера
    description: string;      // Описание гео маркера
    address: Address;         // Адрес гео маркера
    coordinates: Coordinates; // Координаты гео маркера
}

export interface PossibleLocation {
    coordinates: Coordinates; // Координаты из результатов поиска
    address: Address;         // Адрес из результатов поиска
}

export interface SearchResult {
    count: number;                 // Кол-во полученный возможных локаций
    locations: PossibleLocation[]; //  Список локаций
}


