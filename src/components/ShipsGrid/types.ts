export interface VehicleIcon {
    large: string;
    medium: string;
}

export interface VehicleType {
    name: string;
    title: string;
    icons: {
        default: string;
    };
}

export interface VehicleNation {
    name: string;
    title: string;
    color: string;
    icons: {
        small: string;
        medium: string;
        large: string;
    };
}

export interface Vehicle {
    title: string;
    description: string;
    icons: VehicleIcon;
    level: number;
    type: VehicleType;
    nation: VehicleNation;
}

export interface GraphQLResponse {
    data: {
        vehicles: Vehicle[];
    }
}
