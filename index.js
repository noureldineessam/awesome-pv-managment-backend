import app from './app.js';
import { port } from './config/environment.js';


const appPort = port || 3001;

app.listen(appPort, () => {
    console.log(`Server is running on http://localhost:${appPort}`);
});

