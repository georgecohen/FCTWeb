
export class Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

export class Customer {
    id: number;
    name: string;
    password: string;
    email: string;
    token?: string;
}

export class Purchase {
    id: number;
    productId: number;
    userId: number;
    quantity: number;
    price: number;
    product: Product;
    user: Customer;
    dateCreated?: Date;
}

