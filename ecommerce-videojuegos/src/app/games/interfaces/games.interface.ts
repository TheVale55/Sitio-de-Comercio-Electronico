export interface Game {
    _id: string;
    Game_Name: string,
    Game_Description: string,
    Game_Price: number,
    Game_Category: string[],
    Game_Platform: string[],
    Game_ESRB_Rating: string,
    Game_Short_Screenshots: string[],
    Game_Background_Image: string,
    Brand: string,
    Discount: number,
    comments : string[],
    reviews : number,
}
