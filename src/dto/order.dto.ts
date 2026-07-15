export interface CreateOrderDTO {
  productId: number;
}

export interface UpdateOrderStatusDTO {
  status: 'confirmed' | 'cancelled';
}

export interface OrderResponseDTO {
  id:         number;
  totalPrice: number;
  status:     string;
  product: {
    id:    number;
    title: string;
    price: number;
    images: { url: string; isPrimary: boolean; }[];
  } | null;
  buyer: {
    id:       number;
    username: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}