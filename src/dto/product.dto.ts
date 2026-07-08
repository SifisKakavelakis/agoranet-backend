export interface CreateProductDTO {
  title:        string;
  description?: string;
  price:        number;
  categoryId:   number;
}

export interface UpdateProductDTO {
  title?:       string;
  description?: string;
  price?:       number;
  categoryId?:  number;
  isActive?:    boolean;
}

export interface ProductResponseDTO {
  id:           number;
  title:        string;
  description:  string | null;
  price:        number;
  isActive:     boolean;
  category: { id: number; name: string; } | null;
  seller:   { id: number; username: string; } | null;
  images:       { id: number; url: string; isPrimary: boolean; }[];
  createdAt:    Date;
  updatedAt:    Date;
}