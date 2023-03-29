import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import app from './src/app.js'
import * as dotenv from 'dotenv';
import swaggerOptions from './src/docs/head.js';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 3031

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use(cors([
  {origin: ['https://www.section.io', 'https://www.google.com/'] },
  {methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}
]))

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`)
  // console.log(process.env); // Visualizar as variáveis de ambiente em uso
})