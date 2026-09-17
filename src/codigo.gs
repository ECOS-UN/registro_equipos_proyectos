// CONFIGURACIÓN: Ajusta aquí el límite máximo de equipos permitidos por Hora/Salón
const MAX_EQUIPOS = 3;

function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Gestión de Equipos')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getAlumnosFiltrados(hora, salon) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetAlumnos = ss.getSheetByName("Alumnos");
  const sheetEquipos = ss.getSheetByName("Equipos");
  
  const dataAlumnos = sheetAlumnos.getDataRange().getValues();
  dataAlumnos.shift(); // Quitar encabezados
  
  const hBusqueda = hora.toString().trim();
  const sBusqueda = salon.toString().trim();

  const equiposMateriaActual = {}; 
  const crucesOtrosHorarios = {};   

  if (sheetEquipos) {
    const dataEq = sheetEquipos.getDataRange().getValues();
    dataEq.shift();
    
    dataEq.forEach(r => {
      const mat = r[0];
      const eqName = r[1];
      const proyName = r[2];
      const descName = r[3];
      const hCelda = r[4] ? r[4].toString().trim() : "";
      const sCelda = r[5] ? r[5].toString().trim() : "";
      
      if (hCelda === hBusqueda && sCelda === sBusqueda) {
        equiposMateriaActual[mat] = { equipo: eqName, proyecto: proyName, descripcion: descName };
      } else {
        crucesOtrosHorarios[mat] = `⚠️ Asignado en Hora: ${hCelda}, Salón: ${sCelda} (${eqName})`;
      }
    });
  }

  let materia = "";
  let maestro = "";
  let division = "";

  const filtrados = dataAlumnos.filter(row => {
    const h = row[5] ? row[5].toString().trim() : "";
    const s = row[6] ? row[6].toString().trim() : "";

    const estaRegistrado = row[7] === true || (row[7] && row[7].toString().toUpperCase().trim() === "TRUE");
    const coincide = (h === hBusqueda && s === sBusqueda && estaRegistrado);
    
    if (coincide && !materia) {
      materia = row[4]; // Columna E (Materia)
      maestro = row[3]; // Columna D (Maestro)
      division = row[0] ? row[0].toString().trim() : "Sin División"; 
    }
    return coincide;
  }).map(row => {
    const m = row[1];
    const eqLocal = equiposMateriaActual[m] || null;
    const tieneCruce = crucesOtrosHorarios[m] ? true : false;

    return {
      matricula: m,
      nombre: row[2],
      equipoActual: eqLocal ? eqLocal.equipo : "",
      proyectoActual: eqLocal ? eqLocal.proyecto : "",
      descActual: eqLocal ? eqLocal.descripcion : "",
      repetido: tieneCruce,
      alertaTexto: crucesOtrosHorarios[m] || ""
    };
  });

  return {
    listaAlumnos: filtrados,
    nombreMateria: materia || "No encontrada",
    nombreMaestro: maestro || "No encontrado",
    nombreDivision: division
  };
}

function guardarEquipos(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheetEquipos = ss.getSheetByName("Equipos");
  
  if (!sheetEquipos) {
    sheetEquipos = ss.insertSheet("Equipos");
    sheetEquipos.appendRow(["MATRICULA", "EQUIPO", "PROYECTO", "DESCRIPCION", "HORA", "SALON", "MATERIA", "DIVISION"]);
  }

  const data = sheetEquipos.getDataRange().getValues();
  const hBusqueda = payload.hora.toString().trim();
  const sBusqueda = payload.salon.toString().trim();
  const nombreEquipoActual = payload.nombreEquipo.trim();

  // VALIDACIÓN DE LÍMITE DE EQUIPOS
  const equiposExistentes = new Set();
  for (let i = 1; i < data.length; i++) {
    const hCelda = data[i][4] ? data[i][4].toString().trim() : "";
    const sCelda = data[i][5] ? data[i][5].toString().trim() : "";
    const eqCelda = data[i][1] ? data[i][1].toString().trim() : "";

    if (hCelda === hBusqueda && sCelda === sBusqueda && eqCelda !== "") {
      equiposExistentes.add(eqCelda);
    }
  }

  // Si el equipo que se intenta guardar es nuevo y ya existen MAX_EQUIPOS registrados
  if (!equiposExistentes.has(nombreEquipoActual) && equiposExistentes.size >= MAX_EQUIPOS) {
    return {
      success: false,
      message: `🚫 Límite alcanzado: Solo se permite un máximo de ${MAX_EQUIPOS} equipos registrados para la materia y salón que pueden participar en el evento.`
    };
  }

  const matriculasSeleccionadas = payload.integrantes.map(i => i.matricula.toString().trim());

  // Limpieza de alumnos desmarcados para el equipo actual
  for (let i = data.length - 1; i >= 1; i--) {
    const matCelda = data[i][0].toString().trim();
    const eqCelda = data[i][1].toString().trim();
    const horaCelda = data[i][4] ? data[i][4].toString().trim() : "";
    const salonCelda = data[i][5] ? data[i][5].toString().trim() : "";

    if (horaCelda === hBusqueda && salonCelda === sBusqueda && eqCelda === nombreEquipoActual) {
      if (!matriculasSeleccionadas.includes(matCelda)) {
        sheetEquipos.deleteRow(i + 1); 
      }
    }
  }

  const dataActualizada = sheetEquipos.getDataRange().getValues();

  // Guardado o actualización de alumnos marcados
  payload.integrantes.forEach(estudiante => {
    let existeIdx = -1;
    const matEstudiante = estudiante.matricula.toString().trim();
    
    for(let i = 1; i < dataActualizada.length; i++) {
      const matCelda = dataActualizada[i][0].toString().trim();
      const horaCelda = dataActualizada[i][4] ? dataActualizada[i][4].toString().trim() : "";
      const salonCelda = dataActualizada[i][5] ? dataActualizada[i][5].toString().trim() : "";
      
      if(matCelda === matEstudiante && horaCelda === hBusqueda && salonCelda === sBusqueda) {
        existeIdx = i + 1; 
        break;
      }
    }

    const rowData = [
      estudiante.matricula, 
      payload.nombreEquipo, 
      payload.proyecto, 
      payload.descripcion,
      payload.hora,
      payload.salon,
      payload.materia,
      payload.division
    ];

    if (existeIdx > 0) {
      sheetEquipos.getRange(existeIdx, 1, 1, 8).setValues([rowData]);
    } else {
      sheetEquipos.appendRow(rowData);
    }
  });
  
  return {
    success: true,
    message: "¡Equipo guardado con éxito con su materia y división!"
  };
}