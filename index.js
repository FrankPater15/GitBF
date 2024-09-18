require('dotenv').config();

const Server = require('./modules/server')

const server = new Server()

mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Conexión a MongoDB Atlas exitosa'))
.catch((err) => console.error('Error al conectar a MongoDB Atlas:', err));

server.listen()

