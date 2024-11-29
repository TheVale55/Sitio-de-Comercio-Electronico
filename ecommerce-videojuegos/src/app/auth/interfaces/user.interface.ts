export interface User {
    id: string,
    email: string,
    password: string,
    username: string,
    role: string,
    shoppingCart: ShoppingCart[],
    purchaseHistory: string[],
    IsActive: boolean
    createdAt: Date
    updatedAt: Date
    __v: number
}

export interface ShoppingCart {
    _id: string,
    quantity: number,
}

export interface Payment {
    _id: string,
    User_ID: string,
    Games: ShoppingCart[],
    Purchase_Address: string,
    Order_Status: string,
    Total_Amount: number,
    createdAt: Date
}
