import usuarios from "../dao/usuarios.dao.js";
import ropa from "../dao/ropa.dao.js";
import productos from "../dao/productos.dao.js";

import usuarioRepository from "../repository/usuarioRepository.js";
import ropaRepository from "../repository/ropaRepository.js";
import productosRepository from "../repository/productosRepository.js";

export const usuariosService = new usuarioRepository(new usuarios());
export const ropaService = new ropaRepository(new ropa());
export const productosService = new productosRepository(new productos());
