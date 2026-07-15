import swaggerJSDoc from 'swagger-jsdoc';
import SwaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Agoranet API',
            version: '1.0.0',
            description: 'AgoraNet Marketplace API Documentation',
        },
         tags: [
            { name: 'Auth',  description: 'Authentication endpoints' },
            { name: 'Users', description: 'User management endpoints' },
            { name: 'Products', description: 'Product management endpoints' },
            { name: 'Orders', description: 'Order management endpoints' },
        ],
        servers: [
            {
                url: "http://localhost:3000/api",
                description: "Local server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            },
            "schemas": {
                User: {
                    type: 'object',
                    required: ['username', 'password', 'email', 'firstname', 'lastname'],
                    properties: {
                        username: { type: 'string' },
                        password: { type: 'string' },
                        email: { type: 'string' },
                        firstname: { type: 'string' },
                        lastname: { type: 'string' },
                        phoneNumber: { type: 'string' },
                        avatarUrl: { type: 'string' },
                        isActive: { type: 'boolean' },
                        id: { type: 'integer' },
                        roles: { type: 'array', items: { type: 'string' } },
                    }
                },
                Role: {
                    type: 'object',
                    required: ['id', 'name', 'createdAt'],
                    properties: {
                        id: { type: 'integer'},
                        name: { type: 'string'},
                        createdAt: { type: 'string'},
                    }
                },
            }
        },
        security:[{bearerAuth: []}]
    },
    apis: ['./src/routes/*.ts']
};

export const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
    app.use('/api/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));
}