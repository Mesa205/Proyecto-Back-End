import { cuentaModel } from "../models/CuentaAhorro.js";
import { response } from "../helpers/Response.js";
import { encryptPassword } from "../helpers/encryptPassword.js";
import { generateToken } from "../helpers/genereteToken.js";

//------------------------------------------------------------

const CuentaAhorroCtrl = {};

CuentaAhorroCtrl.register = async (req, reply) => {
  try {
    const { email, password, name, lastname } = req.body;
    const user = await cuentaModel.findOne({ email });
    if (user) {
      return response(
        reply,
        409,
        false,
        "",
        "el email ya existe en otro registro"
      );
    }

    const passwordEncrypt = encryptPassword(password);

    const newUser = new cuentaModel({
      email,
      password: passwordEncrypt,
      name,
      lastname,
    });

    await newUser.save();

    const token = generateToken({ user: newUser._id });

    response(
      reply,
      201,
      true,
      { ...newUser.toJSON(), password: null, token },
      "Usuario creado"
    );
  } catch (error) {
    const errorValidation = mongooseErrorHandler(error);
    errorValidation.name === "MongooseValidatorError"
      ? response(reply, 400, false, "", error.message)
      : response(reply, 500, false, "", error.message);
  }
};

CuentaAhorroCtrl.login = async (req, reply) => {
  try {
    const { password, email } = req.body;
    const user = await cuentaModel.findOne({ email });

    if (user && user.matchPassword(password)) {
      const token = generateToken({ user: user._id });
      return response(
        reply,
        200,
        true,
        { ...user.toJSON(), password: null, token },
        "Bienvenido"
      );
    }
    response(reply, 400, false, "", "email o password incorrectos");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

export default CuentaAhorroCtrl;