
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

export class IdentityResult {
    FullName: string;
    Succeeded: boolean;
    Errors: string[];
}


export class Purchase {
    id: number;
    productId: number;
    userId: number;
    quantity: number;
    price: number;
}

export class Message {
    id: number;
    code: string;
    text: string;
    lang: string;
}

export class MyResponse {
    success: boolean;
    message: string;
}

export class LoginResponse {
    email: string;
    name: string;
    isLoggedIn: boolean;
    status: number;
    user: Customer;
}
