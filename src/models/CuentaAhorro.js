import mongoose from "mongoose";



const { Schema, model } = mongoose

const cuentaSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "el campo name es requerido"],
        },
        lastname: {
            type: String,
            required: [true, "el lastname es requerido"],
        },
        email: {
            type: String,
            required: [true, "el campo email es requerido"],
            unique: true,
        },

        password: {
            type: String,
            required: [true, "el campo password es requerido"],
        },


    },
    {
        timestamps: true
    }
);

cuentaSchema.methods.matchPassord = function (password) {
    return bcrypt.compareSync(password, this.password);
};


export const cuentaModel = model("CuentaAhorro", cuentaSchema);