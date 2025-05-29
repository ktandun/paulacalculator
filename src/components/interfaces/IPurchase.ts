export interface IPurchase {
    id: string,
    description: string,
    amount: string,
    date: Date,
    pau: boolean,
    crista: boolean,
    ken: boolean,
    julius: boolean,
    paidBy: Payer,
}

export interface IPurchaseTableRowProps extends IPurchase {
    number: number,
    perPersonCost: number
}

export enum Payer {
    Pau,
    Crista,
    Ken,
    Julius
}
