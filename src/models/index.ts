import { User } from './user.model';
import { Role } from './role.model';
import { UserRole } from './user-role.model';
import Product from './product.model';
import Category from './category.model';
import ProductImage from './product-image.model';

User.belongsToMany(Role, {
    through:    UserRole,
    foreignKey: 'user_id',
    otherKey:   'role_id',
    as:         'roles',
});

Role.belongsToMany(User, {
    through:    UserRole,
    foreignKey: 'role_id',
    otherKey:   'user_id',
    as:         'users',
});

User.hasMany(Product, { foreignKey: 'seller_id', as: 'products' });
Product.belongsTo(User, { foreignKey: 'seller_id', as: 'seller' });

Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

export { User, Role, UserRole, Product, ProductImage, Category };