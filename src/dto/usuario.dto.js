export default class UsuarioDTO {
    static getUsuarioTokenFrom = (usuario) =>{
        return {
            name: `${usuario.first_name} ${usuario.last_name}`,
            role: usuario.role,
            email: usuario.email
        }
    }
}
