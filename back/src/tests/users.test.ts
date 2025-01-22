import request from 'supertest';
import app from '../app';
import admin from 'firebase-admin';

jest.mock('firebase-admin');

const mockFirestore = admin.firestore();
const mockCollection = mockFirestore.collection as jest.Mock;

//Pruebas para el enpoint GET
describe('User Controller Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Debería retornar un usuario si existe', async () => {
        const mockUser = { email: 'user@example.com' };

        // Simula la respuesta de la colección
        mockCollection.mockReturnValueOnce({
            where: jest.fn().mockReturnValueOnce({
                get: jest.fn().mockResolvedValueOnce({
                    empty: false,
                    docs: [{ data: () => mockUser }],
                }),
            }),
        });

        const res = await request(app).get('/users/user@example.com');

        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockUser);
        expect(mockCollection).toHaveBeenCalledWith('users');
    });

    it('Debería retornar 404 si el usuario no existe y un mensaje', async () => {
        // Simula que no hay resultados
        mockCollection.mockReturnValueOnce({
            where: jest.fn().mockReturnValueOnce({
                get: jest.fn().mockResolvedValueOnce({
                    empty: true,
                }),
            }),
        });

        const res = await request(app).get('/users/user0000@example.com');

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Usuario no encontrado');
    });
});



// Pruebas para el endpoint POST
describe('User Controller Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Agrega un usuario si no existe', async () => {
        // Esto para simular que el usuario no existe
        mockCollection.mockReturnValueOnce({
            where: jest.fn().mockReturnValueOnce({
                get: jest.fn().mockResolvedValueOnce({
                    empty: true,
                }),
            }),
            add: jest.fn().mockResolvedValueOnce({ id: 'mocked-id' }),
        });

        const res = await request(app)
            .post('/users')
            .send({ email: 'usernuevo@example.com' });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Usuario creado exitosamente');
        expect(mockCollection).toHaveBeenCalledWith('users');
    });

    it('Debería retornar 400 si el usuario ya existe', async () => {
        // Simula que el usuario ya existe
        mockCollection.mockReturnValueOnce({
            where: jest.fn().mockReturnValueOnce({
                get: jest.fn().mockResolvedValueOnce({
                    empty: false,
                }),
            }),
        });

        const res = await request(app)
            .post('/users')
            .send({ email: 'user@example.com' });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('El usuario ya existe');
    });
});
