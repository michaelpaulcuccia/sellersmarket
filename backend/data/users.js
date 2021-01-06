import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'adminUser@mail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Bob Smith',
        email: 'bob@mail.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Steve Jones',
        email: 'steve@mail.com',
        password: bcrypt.hashSync('123456', 10)
    }
]

export default users