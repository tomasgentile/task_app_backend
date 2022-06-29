import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';

const app = express();
app.use(express.json());   // para poder leer información recibida en json

dotenv.config();

conectarDB();

// Configurar Cors
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            // Puede consultar la API
            callback(null, true);
        } else {
            // No puede consultar la API
            callback(new Error('Error de Cors'));
        }
    }
}
app.use(cors(corsOptions));

// Routing
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tareas', tareaRoutes);

const PORT = process.env.PORT || 4000;
const servidor = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Socket.io
import { Server } from "socket.io";

const io = new Server(servidor, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL
    }
})
io.on('connection', (socket) => {

    //Eventos de socket.io
    socket.emit('ping')
    socket.on('abrir proyecto', (idProyecto) => {
        socket.join(idProyecto);
    });
    socket.on('nueva tarea', (tarea) => {
        const idProyecto = tarea.proyecto;
        socket.to(idProyecto).emit('tarea agregada', tarea);
    });
    socket.on('eliminar tarea', (tarea) => {
        const idProyecto = tarea.proyecto;
        socket.to(idProyecto).emit('tarea eliminada', tarea);
    });
    socket.on('editar tarea', (tarea) => {
        const idProyecto = tarea.proyecto._id;
        socket.to(idProyecto).emit('tarea modificada', tarea);
    });
    socket.on('cambiar estado', (tarea) => {
        const idProyecto = tarea.proyecto._id;
        socket.to(idProyecto).emit('estado modificado', tarea);
    });
});