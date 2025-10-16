export const logInAsync = jest.fn(() =>
    Promise.resolve({
        type: 'success',
        user: {
            id: '1234567890',
            name: 'Thiago Souza',
            email: 'thiago.souza@example.com',
            photoUrl: 'https://i.pravatar.cc/150?img=5',
        },
        idToken: 'mock-id-token-123',
        accessToken: 'mock-access-token-abc',
    })
);
