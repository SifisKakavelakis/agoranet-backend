export interface CreateReviewDTO {
  orderId:  number;
  rating:   number;
  comment?: string;
}

export interface ReviewResponseDTO {
  id:        number;
  rating:    number;
  comment:   string | null;
  reviewer: {
    id:       number;
    username: string;
  } | null;
  createdAt: Date;
}