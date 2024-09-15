import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // Use import instead of require
import db from './database/database.js';
import userRoutes from "./routes/userRoutes.js";
import morgan from "morgan";
import helmet from 'helmet';
import {errorHandler, routeNotFound} from "./utils/errorHandler.js";
import cookieParser from "cookie-parser";


dotenv.config();
const PORT = process.env.PORT || 5006;
const app = express();

db(); // Call the db function to connect to MongoDB
app.get('/', (req, res) => {
    res.json({message: 'Welcome to the server!'});
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
if(process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}
app.use(cookieParser())
app.use('/api/users', userRoutes);
app.use(cors());
app.use('/*', routeNotFound);
app.use(errorHandler);



app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
});
