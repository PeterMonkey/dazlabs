import swaggerJsdoc, {Options} from 'swagger-jsdoc';

const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Cats',
            description: 'prueba tecnica para dazlabs',
            version: '1.0.0',
            contact: {
                name: 'Pedro Fernandez',
                email: 'fernandepedro747@gmail.com'
            },
            servers: [
                {
                    url: 'http://localhost:8080',
                    description: 'local server'
                }
            ]
        }
    },
    apis: ['./routes/*.ts']
};

const specs = swaggerJsdoc(options)
export default specs;