import RopaDTO from "../dto/Ropa.dto.js";
import { ropaService } from "../services/index.js"
import __dirname from "../utils/index.js";

const getAllProductos = async(req,res)=>{
    const ropa = await productosService.getAll();
    res.send({status:"success",payload:ropa})
}

const createRopa = async(req,res)=> {
    const {name,waist,color} = req.body;
    if(!name||!waist||!color) return res.status(400).send({status:"error",error:"Incomplete values"})
    const ropa = RopaDTO.getRopaInputFrom({name,waist,color});
    const result = await productosService.create(ropa);
    res.send({status:"success",payload:result})
}

const updateRopa = async(req,res) =>{
    const ropaUpdateBody = req.body;
    const ropaId = req.params.pid;
    const result = await productosService.update(ropaId,ropaUpdateBody);
    res.send({status:"success",message:"Actualizado"})
}

const deleteRopa = async(req,res)=> {
    const ropaId = req.params.pid;
    const result = await productosService.delete(ropaId);
    res.send({status:"success",message:"Eliminado"});
}

const createRopaWithImage = async(req,res) =>{
    const file = req.file;
    const {name,waist,color} = req.body;
    if(!name||!waist||!color) return res.status(400).send({status:"error",error:"Incomplete values"})
    console.log(file);
    const pet = RopaDTO.getRopaInputFrom({
        name,
        waist,
        color,
        image:`${__dirname}/../public/img/${file.filename}`
    });
    console.log(ropa);
    const result = await productosService.create(ropa);
    res.send({status:"success",payload:result})
}
export default {
    getAllProductos,
    createRopa,
    updateRopa,
    deleteRopa,
    createRopaWithImage
}
