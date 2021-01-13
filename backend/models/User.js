import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    //createdAt and updatedAt
    timestamps: true
}
)

//can access method with an instantiated user
//compare entered password to one in DB that is hashed
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//middleware - password 
userSchema.pre('save', async function (next) {
    //run only if password field is sent or modified
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    //plain text password set to hashed password
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema);

export default User;