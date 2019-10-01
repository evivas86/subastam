export interface PacketAuction {
    id?: number;
    title: string;
    quantity: number;
    min: number;
    max: number
    prize_id: number;
    user_id: number;
    start_date: Date;
    end_date: Date;
    created_at?: Date;
    updated_at?: Date;
}
