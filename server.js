import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { notFoundError, errorHandler } from './services/error-handler.js';

// ************************ Import routes *************************
import personneRoutes from './routes/personne.js';
// ****************************************************************

const app = express();
const port = process.env.PORT || 9090;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// **************************** Routes ****************************
app.use('/evenement', personneRoutes);
// ****************************************************************

app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});