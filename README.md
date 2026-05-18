# 🎓 Sistema Organizador de Equipos Estudiantiles

¡Bienvenido al **Organizador de Equipos**! Esta aplicación web está diseñada para que la gestión, asignación y control de proyectos escolares sea una tarea rápida, visual y libre de errores humanos. 

El sistema está conectado directamente con **Google Sheets** (como base de datos) y cuenta con alertas inteligentes para evitar que los alumnos se dupliquen en diferentes clases.

---

## 🚀 ¿Cómo empezar? (Filtro de Clase)

Antes de realizar cualquier acción, el sistema necesita saber con qué grupo vas a trabajar.

1. Introduce la **Hora** de la clase (Ej. `1`).
2. Introduce el **Salón** (Ej. `303`).
3. Da clic en el botón azul **Cargar Alumnos**.
   * *El botón cambiará a `CARGANDO...` mientras lee los datos de tu Google Sheets.*
4. Al terminar, aparecerá un recuadro gris con fines informativos que te mostrará el **Nombre de la Materia** y el **Maestro** asignado a esa hora y aula.

---

## 🛠️ Manual de Operación (Paso a Paso)

### 1️⃣ Cómo CREAR un Equipo Nuevo
Si tus alumnos están libres ("Sin equipo aquí") y vas a armar un equipo desde cero:

1. **Llena los datos del proyecto (Obligatorio):** En la sección superior, escribe el *Nombre del Equipo*, *Nombre del Proyecto* y una *Descripción breve*.
2. **Selecciona a los integrantes:** En la tabla de alumnos, marca la casilla (**Sel.**) a la izquierda de cada estudiante que formará parte de este equipo.
3. **Guarda los cambios:** Da clic en el botón verde **Guardar Equipo**. 
   * *El sistema mostrará una animación de carga y te avisará con una alerta en pantalla cuando quede listo.*
   * *La interfaz se reiniciará automáticamente para que puedas continuar con el siguiente equipo.*

> ⚠️ **Nota de seguridad:** El sistema no te dejará guardar si olvidaste escribir el nombre del equipo, el proyecto o la descripción. ¡Adiós a los registros incompletos!

---

### 2️⃣ Cómo MODIFICAR un Equipo o QUITAR Alumnos
¿Un equipo cambió de integrantes o cometiste un error al capturar? ¡Es muy fácil solucionarlo!

* **Para cambiar el nombre o proyecto:** Carga la clase, escribe el nombre **EXACTO** del equipo que quieres corregir, cambia los textos del proyecto o descripción y dale **Guardar**.
* **Para QUITAR alumnos de un equipo:** 1. Carga la clase. Verás a los miembros actuales iluminados en **color verde pastel**.
  2. **Desmarca** la casilla de los alumnos que ya no deben estar en ese equipo. (Deja marcados sólo a los que se quedan).
  3. Asegúrate de escribir el nombre **EXACTO** del equipo arriba y da clic en **Guardar**.
  4. Los alumnos que desmarcaste volverán a quedar libres automáticamente como `"Sin equipo aquí"`.

---

### 3️⃣ Cómo IMPRIMIR el Reporte en PDF
¿La dirección o la coordinación te solicitó la lista oficial de cómo quedaron los equipos? 

1. Realiza la búsqueda de tu clase introduciendo la **Hora** y el **Salón**, y da clic en **Cargar Alumnos**.
2. Una vez que veas la lista en pantalla, da clic en el botón celeste **📄 Generar Reporte PDF** (ubicado junto al botón de cargar).
3. Se abrirá automáticamente la ventana de impresión de tu navegador (Chrome, Edge, Safari).
4. **Configuración recomendada para el PDF:**
   * En *Destino*, selecciona **Guardar como PDF** (o elige tu impresora física).
   * **¡Súper Importante!** Abre la sección de *Más opciones de configuración* y asegúrate de tener activada la casilla de **Gráficos de fondo** para que se impriman correctamente los formatos y colores.
5. Da clic en **Guardar / Imprimir**. El reporte se generará limpio, elegante y en formato de lista con viñetas: `* (Matrícula) Nombre Completo`.

---

## 💡 Guía Visual de Colores y Alertas

Para que no te confundas, el sistema te habla a través de colores en la tabla de alumnos:

* **Fila sin color (Blanca/Transparente):** El alumno está libre y disponible para ser asignado a un equipo en esta clase.
* **Fila en Verde Pastel:** El alumno ya pertenece a un equipo **en esta clase**. (Cada equipo tiene un tono de verde diferente de forma automática para distinguirlos visualmente).
* **Fila en Amarillo de Advertencia:** El alumno ya tiene un equipo registrado, pero en **OTRA hora o salón** de la escuela. 
  * *El sistema te mostrará una etiqueta amarilla detallada: `⚠️ Asignado en Hora: X, Salón: Y (Equipo Name)`.*
  * *Esta alerta es 100% informativa. Si el alumno tiene permitido trabajar en ambos proyectos, puedes seleccionarlo y guardarlo normalmente.*


