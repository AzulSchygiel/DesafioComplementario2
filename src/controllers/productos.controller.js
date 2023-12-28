import { productosService, ropaService, usersService } from "../services/index.js"

const getAllProductos = async(req,res)=>{
    const result = await productosService.getAll();
    res.send({status:"success",payload:result})
}

const getProducto = async(req,res)=>{
    const productoId = req.params.aid;
    const producto = await productosService.getBy({_id:productoId})
    if(!producto) return res.status(404).send({status:"error",error:"Producto not found"})
    res.send({status:"success",payload:producto})
}

const createProducto = async(req,res)=>{
    const {uid,pid} = req.params;
    const user = await usersService.getUserById(uid);
    if(!user) return res.status(404).send({status:"error", error:"user Not found"});
    const ropa = await ropaService.getBy({_id:pid});
    if(!ropa) return res.status(404).send({status:"error",error:"Ropa not found"});
    if(ropa.producto) return res.status(400).send({status:"error",error:"Venta"});
    user.ropa.push(ropa._id);
    await usersService.update(user._id,{ropa:user.ropa})
    await ropaService.update(ropa._id,{producto:true,owner:user._id})
    await productosService.create({owner:user._id,ropa:ropa._id})
    res.send({status:"success",message:"Prenda vendida"})
}

export default {
    createProducto,
    getAllProductos,
    getProducto
}
