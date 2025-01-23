import request from "supertest";
import app from "../app";
import admin from 'firebase-admin';

jest.mock('firebase-admin');
jest.mock("../middleware/auth.middleware", () => ({ //mock para el middleware de autenticación
    authenticate: jest.fn((req, res, next) => {
        req.user = { email: "user@example.com" };
        next();
    }),
}));

const mockFirestore = admin.firestore();
const mockCollection = mockFirestore.collection as jest.Mock;


describe('Pruebas para el enpoint GET', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockTasks = [
        { id: 'task1', title: 'Tarea 1', description: 'Descripción 1', createdAt: '23/01/2025 01:00:00', email: 'user@example.com' },
        { id: 'task2', title: 'Tarea 2', description: 'Descripción 2', createdAt: '23/01/2025 01:00:00', email: 'user@example.com' },
    ];

    const mockUser = [
        { email: "user@example.com" },
        { email: "user2@example.com" }
    ];


    it('Debería retornar tareas si existen', async () => {

        mockCollection.mockReturnValueOnce({
            where: jest.fn().mockReturnValueOnce({
                get: jest.fn().mockResolvedValueOnce({
                    empty: false,
                    docs: mockUser.map(user => ({ email: user.email, data: () => user })),
                }),
            }),
        });

        mockCollection.mockReturnValueOnce({
            where: jest.fn().mockReturnValueOnce({
                get: jest.fn().mockResolvedValueOnce({
                    empty: false,
                    docs: mockTasks.map(task => ({ id: task.id, data: () => task })),
                }),
            }),
        });

        const res = await request(app).get('/tasks');

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            status: true,
            message: "Tareas encontradas",
        });
        expect(res.body.data.length).toBe(2);
    });

    it('Debería retornar 404 si no hay tareas', async () => {
        mockCollection.mockReturnValueOnce({
            where: jest.fn().mockReturnValueOnce({
                get: jest.fn().mockResolvedValueOnce({
                    empty: true,
                    docs: [],
                }),
            }),
        });

        const res = await request(app).get('/tasks');

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Usuario no encontrado');
    });
});


describe('Pruebas para el enpoint POST /tasks', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockUser = [
        { email: "user@example.com" },
        { email: "user2@example.com" }
    ];


    it('Debería crear una nueva tarea', async () => {
        mockCollection.mockReturnValueOnce({
            where: jest.fn().mockReturnValueOnce({
                get: jest.fn().mockResolvedValueOnce({
                    empty: false,
                    docs: mockUser.map(user => ({ email: user.email, data: () => user })),
                }),
            }),
        });

        mockCollection.mockReturnValueOnce({
            where: jest.fn().mockReturnValueOnce({
                get: jest.fn().mockResolvedValueOnce({
                    empty: true,
                }),
            }),
            add: jest.fn().mockResolvedValueOnce({ id: 'mocked-id' }),
        });


        const newTask = { title: 'Nueva Tarea', description: 'Descripción de la nueva tarea', "completed": false };

        const res = await request(app).post('/tasks').send({ task: newTask });
        expect(res.status).toBe(200);
        expect(res.body.data.title).toBe('Nueva Tarea');
    });

    it('Debería retornar 404 si el usuario no existe', async () => {
        mockCollection.mockReturnValueOnce({
            where: jest.fn().mockReturnValueOnce({
                get: jest.fn().mockResolvedValueOnce({
                    empty: true,
                }),
            }),
        });

        const res = await request(app).post('/tasks').send({ task: { title: 'Tarea' } });

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Usuario no encontrado');
    });
});


describe('Pruebas para el enpoint PUT /tasks/:taskId', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockTasks = [
        { id: 'task1', title: 'Tarea 1', description: 'Descripción 1', createdAt: '23/01/2025 01:00:00', email: 'user@example.com' },
        { id: 'task2', title: 'Tarea 2', description: 'Descripción 2', createdAt: '23/01/2025 01:00:00', email: 'user@example.com' },
    ];

    it('Debería actualizar una tarea existente', async () => {
        const updatedTask = { title: 'Tarea Actualizada', description: 'Descripción actualizada' };

        mockCollection.mockReturnValueOnce({
            where: jest.fn().mockReturnValueOnce({
                get: jest.fn().mockResolvedValueOnce({
                    empty: false,
                    exists: true,
                    docs: mockTasks.map(task => ({ id: task.id, data: () => task })),
                }),
            }),
        });

        mockCollection.mockReturnValueOnce({
            doc: jest.fn().mockReturnValueOnce({
                get: jest.fn().mockResolvedValueOnce({
                    exists: true,
                    data: jest.fn(() => ({
                        email: "user@example.com",
                        title: "Tarea existente",
                        description: "Descripción existente",
                    })),
                }),
            }),
        });

        mockCollection.mockReturnValueOnce({
            doc: jest.fn().mockReturnValueOnce({
                update: jest.fn().mockResolvedValueOnce({status: true, message: "Tarea actualizada exitosamente" }),
            }),
        });

        const res = await request(app).put("/tasks/task1").send({ task: updatedTask });
        expect(res.status).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("Tarea actualizada exitosamente");
    });

    it('Debería retornar 404 si la tarea no existe', async () => {
        mockCollection.mockReturnValueOnce({
            where: jest.fn().mockReturnValueOnce({
                get: jest.fn().mockResolvedValueOnce({
                    empty: false,
                    exists: true,
                    docs: mockTasks.map(task => ({ id: task.id, data: () => task })),
                }),
            }),
        });

        mockCollection.mockReturnValueOnce({
            doc: jest.fn().mockReturnValueOnce({
                get: jest.fn().mockResolvedValueOnce({
                    exists: false,
                }),
            }),
        });

        const res = await request(app).put('/tasks/task1').send({ task: { title: 'Tarea' } });

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Tarea no encontrada');
    });
});


describe('Pruebas para el enpoint DELETE /tasks/:taskId', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockTasks = [
        { id: 'task1', title: 'Tarea 1', description: 'Descripción 1', createdAt: '23/01/2025 01:00:00', email: 'user@example.com' },
        { id: 'task2', title: 'Tarea 2', description: 'Descripción 2', createdAt: '23/01/2025 01:00:00', email: 'user@example.com' },
    ];

    it('Debería eliminar una tarea existente', async () => {

        mockCollection.mockReturnValueOnce({
            where: jest.fn().mockReturnValueOnce({
                get: jest.fn().mockResolvedValueOnce({
                    empty: false,
                    exists: true,
                    docs: mockTasks.map(task => ({ id: task.id, data: () => task })),
                }),
            }),
        });

        mockCollection.mockReturnValueOnce({
            doc: jest.fn().mockReturnValueOnce({
                get: jest.fn().mockResolvedValueOnce({
                    exists: true,
                    data: jest.fn(() => ({
                        email: "user@example.com",
                        title: "Tarea existente",
                        description: "Descripción existente",
                    })),
                }),
            }),
        });

        mockCollection.mockReturnValueOnce({
            doc: jest.fn().mockReturnValueOnce({
                get: jest.fn().mockResolvedValueOnce({ exists: true, data: () => ({ email: 'user@example.com' }) }),
                delete: jest.fn().mockResolvedValueOnce(true),
            }),
        });

        const res = await request(app).delete('/tasks/task1');

        expect(res.status).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe('Tarea eliminada exitosamente');
    });

    it('Debería retornar 404 si la tarea no existe', async () => {

        mockCollection.mockReturnValueOnce({
            where: jest.fn().mockReturnValueOnce({
                get: jest.fn().mockResolvedValueOnce({
                    empty: false,
                    exists: true,
                    docs: mockTasks.map(task => ({ id: task.id, data: () => task })),
                }),
            }),
        });

        mockCollection.mockReturnValueOnce({
            doc: jest.fn().mockReturnValueOnce({
                get: jest.fn().mockResolvedValueOnce({
                    exists: false,
                    data: jest.fn(() => ({
                        email: "user@example.com",
                        title: "Tarea existente",
                        description: "Descripción existente",
                    })),
                }),
            }),
        });

        const res = await request(app).delete('/tasks/task1');

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Tarea no encontrada');
    });
});
