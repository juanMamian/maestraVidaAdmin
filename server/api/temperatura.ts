import sqlite3 from "sqlite3"
const db = new sqlite3.Database("../../finca.db");

interface MedicionTemperatura {
    temp: number,
    timestamp: number
}

function leerTempTimestamp() {
    return new Promise<Array<MedicionTemperatura>>((resolve, reject) => {
        db.all('SELECT temp, timestamp FROM compostera', (err, rows: MedicionTemperatura[]) => {
            if (err) {
                console.log("Error leyendo la base de datos: " + err);
                reject([]);
            }
            console.log("Leido: " + JSON.stringify(rows));
            resolve(rows);
        })
    });
}
async function leerDB() {
    return leerTempTimestamp();
}

export default defineEventHandler(async (event) => {
    const datos = await leerDB();
    return datos;
})
