const Producto = require('../models/Producto');

const crearProducto = async (req, res) => {
    try {
      const { nombre, categoria, marca, precio, unidades, descripcion } = req.body; // Obtener los datos del cuerpo de la solicitud
      const { uid } = req;
      const usuario = uid;
  
      // Comprobar si existe un producto con el mismo código
      const codigo = req.body.codigo;
      const existeProducto = await Producto.findOne({ codigo });
      if (existeProducto) {
        return res.status(400).json({ msg: 'Ya existe un producto con ese código' });
      }
  
      const producto = new Producto({
        nombre,
        categoria,
        marca,
        precio,
        unidades,
        descripcion,
        codigo,
        foto: req.file.filename,
        usuario
      });
  
      await producto.save();
  
      res.status(201).json({producto, msg: "Producto creado exitosamente"});
    } catch (error) {
        console.log(error)
      res.status(500).json({ msg: 'Error al crear el producto' });
    }
  };

  const editarProducto = async (req, res) => {
    try {
      const productoId = req.params.id;
      const { nombre, categoria, marca, precio, unidades, descripcion} = req.body;
  
      const producto = await Producto.findByIdAndUpdate(
        productoId,
        {
          nombre,
          categoria,
          marca,
          precio,
          unidades,
          descripcion,
          foto: req.file.filename
        },
        { new: true }
      );
  
      if (!producto) {
        return res.status(404).json({ msg: 'Producto no encontrado' });
      }
  
      res.json({producto, msg: "Producto actualizado correctamente"});
    } catch (error) {
      res.status(500).json({ msg: 'Error al editar el producto' });
    }
  };

  const borrarProducto = async (req, res) => {
    try {
      const productoId = req.params.id;
  
      const producto = await Producto.findByIdAndDelete(productoId);
  
      if (!producto) {
        return res.status(404).json({ msg: 'Producto no encontrado' });
      }
  
      res.json({ msg: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ msg: 'Error al eliminar el producto' });
    }
  };


  
  // Listar productos por id del usuario
  const listarProductos = async (req, res) => {
    try {
      const { uid } = req;
      const productos = await Producto.find({ usuario: uid });
      res.json(productos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al obtener los productos" });
    }
  };
  
  module.exports = {
    crearProducto,
    editarProducto,
    borrarProducto,
    listarProductos
  };
  