import 'dotenv/config';
import app                  from './src/app';
import { connectDatabase }  from './src/config/database';

const PORT = process.env['PORT'] ?? 3000;

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server running at  http://localhost:${PORT}`);
    console.log(`Swagger docs at    http://localhost:${PORT}/api-docs`);
    console.log(`Health check at    http://localhost:${PORT}/health`);
  });
};

startServer();
