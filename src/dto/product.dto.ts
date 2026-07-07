import { IProductImage } from '../models/product-image.model';

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
  category:     { id: number; name: string; };
  seller:       { id: number; username: string; };
  images:       { id: number; url: string; isPrimary: boolean; }[];
  createdAt:    Date;
  updatedAt:    Date;
}