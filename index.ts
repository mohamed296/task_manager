import express from 'express';
import mongoose  from 'mongoose';
import authRoute from './routes/authRoutes';
import deleteUserRoute from './routes/userRoutes';
import taskRoute from './routes/taskRoutes';
import commentRoute from './routes/commentRoutes';
import projectRoute from './routes/projectRoutes';
import notificationRoute from './routes/notificationRoutes';
import { Server } from 'socket.io';
import http from 'http';
import ErrorHandler  from './middleware/errorMiddleware';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import AppError from './models/appErrorModel';



const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret:'secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

mongoose.connect('mongodb://localhost/TypeScript', ).then(() => {
    console.log('Database connected');
}).catch((error) => {
    console.log('Error connecting to database');
    console.log(error);
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.log('Error connecting to database');
    console.log(error);
});

db.once('open', () => {
    console.log('Database connected');
});

const server = http.createServer(app);
export const io = new Server(server);

io.on ('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.use('/api/auth', authRoute);
app.use('/api/user', deleteUserRoute);
app.use('/api/task', taskRoute);
app.use('/api/comment', commentRoute);
app.use('/api/project', projectRoute);
app.use('/api/notification', notificationRoute);

app.all('*',(req, res, next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(ErrorHandler.globalErrorHandler);


app.listen(3000, () => {
    console.log('Server running on port http://localhost:3000');
});

