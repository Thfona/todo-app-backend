import { Router } from 'express';
import { TodosController } from './controllers/todos.controller';

const routesV1 = Router();

// Todos
routesV1.get('/todos', TodosController.getAllV1);
routesV1.get('/todos/:id', TodosController.getByIdV1);
routesV1.post('/todos', TodosController.createV1);
routesV1.put('/todos/:id', TodosController.updateV1);
routesV1.delete('/todos/:id', TodosController.deleteV1);

export const appRoutesV1 = routesV1;
