export interface Service {
    name: string;
    vehicleModel: string;
    price: number;
    date: string;
}

export interface Client {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
        street: string;
        city: string;
        zip: string;
    };
    notes: string;
    services: Service[];
    createdAt: string;
    updatedAt: string;
}
