import { User } from './user.model';
import { Role } from './role.model';
import { UserRole } from './user-role.model';
import Product from './product.model';
import Category from './category.model';
import ProductImage from './product-image.model';
import Order from './order.model';
import Review from './review.model';

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

User.hasMany(Order, { foreignKey: 'buyer_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'buyer_id', as: 'buyer' });

Product.hasMany(Order, { foreignKey: 'product_id', as: 'orders' });
Order.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

User.hasMany(Review, { foreignKey: 'reviewer_id', as: 'givenReviews' });
Review.belongsTo(User, { foreignKey: 'reviewer_id', as: 'reviewer' });

User.hasMany(Review, { foreignKey: 'seller_id', as: 'receivedReviews' });
Review.belongsTo(User, { foreignKey: 'seller_id', as: 'seller' });

Order.hasOne(Review, { foreignKey: 'order_id', as: 'review' });
Review.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

export { User, Role, UserRole, Product, ProductImage, Category, Order, Review };