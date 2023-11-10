// aqui importamos todo lo que el paquete express exporta
// y todo en el archivo va a ser conocido como express
import express, { Application } from "express";
import cors from "cors";

import userRoutes from "../routes/usuario.routes";
import medicoRoutes from "../routes/medico.routes";
import pacienteRoutes from "../routes/paciente.routes";
import citaRoutes from "../routes/cita.routes";
import antecedenteAndrologicoRoutes from "../routes/antecedenteAndrologico.routes";
import antecedenteGinecoObstetricoRoutes from "../routes/antecedenteGinecoObstetrico.routes";
import antecedenteHeredoFamiliarRoutes from "../routes/antecedentesHeredoFamiliares.routes";
import antecedentePersonalNoPatologicoRoutes from "../routes/antecedentesPersonalesNoPatologicos.routes";
import antecedentePersonalPatologicoRoutes from "../routes/antecedentePersonalPatologico.routes";
import antecedenteQuirurgicoRoutes from "../routes/antecedentesQuirurgicos.routes";
import edificioRoutes from "../routes/edificio.routes";
import estudioRealizadoRoutes from "../routes/estudioRealizado.routes";
import expedienteRoutes from "../routes/expediente.routes";
import hospitalizacionRoutes from "../routes/hospitalizacion.routes";
import inmunizacionRoutes from "../routes/inmunizacion.routes";
import notaEvolucionRoutes from "../routes/notaEvolucion.routes";
import otraEnfermedadRoutes from "../routes/otraEnfermedad.routes";
import pisoRoutes from "../routes/piso.routes";
import recetaRoutes from "../routes/receta.routes";
import horarioRoutes from "../routes/horario.routes";
import authRoutes from "../routes/auth.routes";

import db from "../db/connection";

class Server {

    // asi por si queremos saber que viene de express
    // asi sin desesctructurar
    // private app: express.Application;
    // asi despues de desestructurar que viene del paquete de express
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        medicos: '/api/medicos',
        pacientes: '/api/pacientes',
        citas: '/api/citas',
        antecedentesAndrologicos: '/api/antecendentesAndro',
        antecedentesGinecoObstetricos: "/api/antecedentesGO",
        antecedentesHeredoFamiliares: "/api/antecedentesHF",
        antecedentesPersonalesNoPatologicos: "/api/antecedentesPNP",
        antecedentesPersonalesPatologicos: "/api/antecedentesPP",
        antecedentesQuirurgicos: "/api/antecedentesQ",
        edificios: "/api/edificios",
        estudiosRealizados: "/api/estudiosRealizados",
        expedientes: "/api/expedientes",
        hospitalizaciones: "/api/hospitalizaciones",
        inmunizaciones: "/api/inmunizaciones",
        notasEvolucion: "/api/notasEvolucion",
        otrasEnfermedades: "/api/otrasEnfermedades",
        pisos: "/api/pisos",
        receta: "/api/recetas",
        horarios: "/api/horarios",
        auth: "/api/auth"
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        // Metodos iniciales
        this.middlewares();
        // Definir mis rutas
        this.routes();
    }

    async dbConnection(){
        try {

            await db.authenticate();
            console.log('Database online')
            
        } catch (error: any) {
            throw new Error( error );
            
        }
    }

    middlewares(){
        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        // Carpeta publica
        this.app.use( express.static('public') );
    }

    // aqui podriamos definir cualquier cantidad de rutas que sean necesarias en nuestra apliacion
    routes(){
        this.app.use( this.apiPaths.usuarios, userRoutes );
        this.app.use( this.apiPaths.medicos, medicoRoutes );
        this.app.use( this.apiPaths.pacientes, pacienteRoutes );
        this.app.use( this.apiPaths.citas, citaRoutes );
        this.app.use( this.apiPaths.antecedentesAndrologicos, antecedenteAndrologicoRoutes );
        this.app.use( this.apiPaths.antecedentesGinecoObstetricos, antecedenteGinecoObstetricoRoutes );
        this.app.use( this.apiPaths.antecedentesHeredoFamiliares, antecedenteHeredoFamiliarRoutes );
        this.app.use( this.apiPaths.antecedentesPersonalesNoPatologicos, antecedentePersonalNoPatologicoRoutes );
        this.app.use( this.apiPaths.antecedentesPersonalesPatologicos, antecedentePersonalPatologicoRoutes );
        this.app.use( this.apiPaths.antecedentesQuirurgicos, antecedenteQuirurgicoRoutes );
        this.app.use( this.apiPaths.edificios, edificioRoutes );
        this.app.use( this.apiPaths.estudiosRealizados, estudioRealizadoRoutes );
        this.app.use( this.apiPaths.expedientes, expedienteRoutes );
        this.app.use( this.apiPaths.hospitalizaciones, hospitalizacionRoutes );
        this.app.use( this.apiPaths.inmunizaciones, inmunizacionRoutes );
        this.app.use( this.apiPaths.notasEvolucion, notaEvolucionRoutes );
        this.app.use( this.apiPaths.otrasEnfermedades, otraEnfermedadRoutes );
        this.app.use( this.apiPaths.pisos, pisoRoutes );
        this.app.use( this.apiPaths.receta, recetaRoutes );
        this.app.use( this.apiPaths.horarios, horarioRoutes );
        this.app.use( this.apiPaths.auth, authRoutes );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        } )
    }

}

// Exportacion por defecto
export default Server;