const mockFirestore = {
    collection: jest.fn(() => ({
        where: jest.fn(() => ({
            get: jest.fn(),
        })),
        add: jest.fn(),
        doc: jest.fn(() => ({
            get: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        })),
    })),
};

const mockCredential = {
    cert: jest.fn(),
};

module.exports = {
    initializeApp: jest.fn(),
    credential: mockCredential,
    firestore: jest.fn(() => mockFirestore),
};
