import passport from "passport";
import LocalStrategy from "passport-local";
import { createHash, invalidPassword } from "../utils.js";
import { usuariosService } from "../persistence/index.js";

//Estrategia para registar usuarios: con username y password
export const initPassport = () => {

    passport.use("signupLocalStrategy", new localStrategy(
        {
            passReqToCallback: true,
            usernameField: "email", //Cuando no hay username se pone "email"
        },
        async (req, username, password, done) => {
            const { first_name } = req.body;
            try {
                const usuario = await usuariosService.getUserByEmail(username);
                if (usuario) {
                    return done(null, false); //Usuario registrado
                }
                const newUsuario = { //Usuario No registrado
                    first_name,
                    email:username,
                    password: createHash(password)
                };
                console.log(newUsuario);
                const usuarioCreado = await usuariosService.createUsuario(newUsuario);
                return done(null, usuarioCreado);
            } catch (error) {
                return done(error);
            }
        }
    ));
};

//Estrategia para Iniciar Sesión de los usuarios
//Instalar npm i passport-github2
passport.use("loginLocalStrategy", new localStrategy(
    {
        usernameField: "email",
    },
    async (username, password, done) => {
        try {
            const usuario = await usuariosService.getUserByEmail({ username });
            if (!usuario) {
                return done(null, false); //Usuario No registrado
            }
            if (!invalidPassword(password, usuario)){ //Validacion de que la contraseña es la correcta
                return done(null,false);
            }
            return done(null,usuario);
        } catch (error) {
            return done(error);
        }
    }
));

//Estrategia para registro con GitHub de sessions.routes
passport.use("signupGithubStrategy", new GithubStrategy(//Logica para registrar usuarios con Github
    {//Objeto donde estarán todos los datos de la API de Github
        clientID: config.github.clientIDGithub,
        clientSecret: config.github.clientSecretGithub,
        callbackURL: `http://localhost:8080/api/sessions${config.github.callbackGithub}`
    },
    async (accesToken, refreshToken, profile, done) => { //Esos Tokens son generados por la aplicación/red social
        try { //Verificar si el usuario esta registrado
            //console.log("profile", profile); //Se mostrarán todos los datos (obtenidos de la cuenta de Github) del usuario registrado
            const usuario = await usuariosModel.findOne({ username: profile.username });
            if (usuario) {
                return done(null, usuario); //Usuario ya está registrado y se inicia la sesión
            }
            const newUsuario = {
                username: profile.username,
                email: profile._json.name,
                password: createHash(profile.id)
            }; //Usuario No está registrado
            console.log(newUsuario);
            const usuarioCreado = await usuariosModel.create(newUsuario); //Se crea el usuario en la Base de Datos
            return done(null, usuarioCreado); //Se crea a Sesión
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
    const usuario = await usuariosService.getUserById(id);
    done(null.usuario);
})