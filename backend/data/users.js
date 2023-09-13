import bcrypt from 'bcryptjs'

const users= [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: false,
    },
    {
        name: 'Jack Doe',
        email: 'jack@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: false,

    },
    {
        name: 'Tim Harris',
        email: 'Tim@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: false,

    },

];

export default users;