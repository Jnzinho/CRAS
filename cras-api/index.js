import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

// Define routes and middleware here

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
