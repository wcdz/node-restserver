const Role = require('./../models/rol.js');
const User = require('./../models/user.js');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) throw new Error(`El rol ${rol} no esta registrado en la DB`);
}

const emailExiste = async (correo = '') => {
    const existeEmail = await User.findOne({ correo });
    if (existeEmail) throw new Error(`El correo: ${correo} ya esta registrado`);
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario) throw new Error(`El id ${id} no existe`);
}



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}