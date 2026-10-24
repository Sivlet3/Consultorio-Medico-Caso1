// Registro central de las pantallas disponibles.
import { mapaNavegacion } from "./mapa-navegacion.js";
import { acceso } from "./acceso.js";
import { pacientes } from "./pacientes.js";
import { disponibilidadTarifas } from "./disponibilidad-tarifas.js";
import { citas } from "./citas.js";
import { recepcion } from "./recepcion.js";
import { atencionClinica } from "./atencion-clinica.js";
import { cobrosPagos } from "./cobros-pagos.js";
import { reportes } from "./reportes.js";
import { usuariosAuditoria } from "./usuarios-auditoria.js";
import { estadosMensajes } from "./estados-mensajes.js";

export const screens = [
  mapaNavegacion,
  acceso,
  pacientes,
  disponibilidadTarifas,
  citas,
  recepcion,
  atencionClinica,
  cobrosPagos,
  reportes,
  usuariosAuditoria,
  estadosMensajes
];

export const screenById = new Map(screens.map((screen) => [screen.id, screen]));
