const { response } = require("express");
const Tratamiento = require("../models/Tratamiento");

//Crear tratamiento
const crearTratamiento = async (req, res = response) => {
    const { nombre, precio, categoria, pieza, numero } = req.body;
    const usuario = req.uid;

    try {
        // Verificar que no existe un tratamiento con el mismo nombre y categoría
        const tratamientoExistente = await Tratamiento.findOne({ nombre, categoria });
        if (tratamientoExistente) {
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un tratamiento con el mismo nombre y categoría",
            });
        }

        // Creamos el nuevo tratamiento
        const tratamiento = new Tratamiento({
            nombre,
            precio,
            categoria,
            usuario,
            pieza,
            numero,
        });

        // Guardamos el nuevo tratamiento en la base de datos
        await tratamiento.save();

        res.status(201).json({
            ok: true,
            tratamiento,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al crear el tratamiento",
        });
    }
};

// Borrar tratamiento
const borrarTratamiento = async (req, res = response) => {
    const { id } = req.params;

    try {
        // Buscamos el tratamiento por ID
        const tratamiento = await Tratamiento.findById(id);

        // Verificamos si el tratamiento existe
        if (!tratamiento) {
            return res.status(404).json({
                ok: false,
                msg: "El tratamiento no existe",
            });
        }

        // Borramos el tratamiento de la base de datos
        await Tratamiento.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: "Tratamiento eliminado correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al eliminar el tratamiento",
        });
    }
};

// Editar tratamiento
const editarTratamiento = async (req, res = response) => {
    const { id } = req.params;
    const usuario = req.uid;

    try {
        // Buscamos el tratamiento por ID
        const tratamiento = await Tratamiento.findById(id);

        // Verificamos si el tratamiento existe
        if (!tratamiento) {
            return res.status(404).json({
                ok: false,
                msg: "El tratamiento no existe",
            });
        }

        // Actualizamos los campos del tratamiento
        const { nombre, precio, categoria, pieza, numero } = req.body;
        tratamiento.nombre = nombre;
        tratamiento.precio = precio;
        tratamiento.categoria = categoria;
        tratamiento.pieza = pieza;
        tratamiento.numero = numero;

        // Guardamos el tratamiento actualizado en la base de datos
        await tratamiento.save();

        res.json({
            ok: true,
            tratamiento,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al actualizar el tratamiento",
        });
    }
};

// Listar tratamientos sin pieza ni número
const listarTratamientosSinPiezaNumero = async (req, res = response) => {
    try {
        const { uid } = req;
        const tratamientos = await Tratamiento.find({ pieza: null, numero: null, usuario: uid });

        res.json({
            ok: true,
            tratamientos
            });
            } catch (error) {
            console.log(error);
            res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
            });
            }
            }

            module.exports = {crearTratamiento, borrarTratamiento, editarTratamiento, listarTratamientosSinPiezaNumero }