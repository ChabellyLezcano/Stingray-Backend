const notificarProductoAgotado = async (req, res, next) => {
    try {
      const { uid } = req;
      const productos = await Producto.find({ usuario: uid });
  
      productos.forEach(producto => {
        if (producto.unidades <= 2) {
          // Enviar una notificación al front indicando que quedan pocas unidades del producto
          console.log(`Producto "${producto.nombre}" está por agotarse`);
        }
      });
  
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al obtener los productos" });
    }
  };
  