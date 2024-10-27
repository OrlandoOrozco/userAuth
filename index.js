import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import indexRouter from './routes/index.routes.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import configurarSocket from './config/WS.js';

dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const io = configurarSocket(server);


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My first API',
            version: '1.0.0',
            description: 'API documentation created with Express and Swagger',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/**/*.js'],
};

// Swagger setup
const specs = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Usar the auth routher authentication
app.use('/', indexRouter);


server.listen(PORT, () => {
    console.log(`Server and Socket running on http://localhost:${PORT}`);
});
