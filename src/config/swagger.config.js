import __dirname from "../utils/index.js";
import swaggerJsDoc from "swagger-jsdoc";
import path from "path";

const swaggerOpciones = {
    definition:{
        openapi:"3.0.1",
        info:{
            title:"DOCUMENTACIÓN API PARA APP DE ROPA",
            version:"1.0.0",
            description:"Endpoints de la API de autenticación."
        },
    },
    apis: [`${path.join(__dirname, "../docs/**/*.yaml")}`],  
},

export const swaggerSpecs = swaggerJsDoc(swaggerOpciones);
