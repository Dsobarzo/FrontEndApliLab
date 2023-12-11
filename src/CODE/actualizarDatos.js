import axios from 'axios';

let laboratoriosCache = null;
let carrerasCache = null;
let docentesCache = null;
let reservasCache = null;

// Función para obtener la lista de laboratorios
export async function obtenerLaboratorios() {
    if (laboratoriosCache) {
        return laboratoriosCache;
    }

    try {
        const response = await axios.get('https://apilab-backend-sandbox.up.railway.app/obtenerlaboratorios');
        laboratoriosCache = response.data;
        return laboratoriosCache;
    } catch (error) {
        console.error('* Error al obtener los laboratorios:', error);
        throw error;
    }
}

// Función para actualizar los laboratorios en caché
export async function actualizarLaboratorios() {
    try {
        const response = await axios.get('https://apilab-backend-sandbox.up.railway.app/obtenerlaboratorios');
        laboratoriosCache = response.data;
        return laboratoriosCache;
    } catch (error) {
        console.error('* Error al actualizar los laboratorios en caché:', error);
        throw error;
    }
}

// Función para obtener la lista de carreras
export async function obtenerCarreras() {
    if (carrerasCache) {
        return carrerasCache;
    }

    try {
        const response = await axios.get('https://apilab-backend-sandbox.up.railway.app/obtenercarreras');
        carrerasCache = response.data;
        return carrerasCache;
    } catch (error) {
        console.error('* Error al obtener las carreras:', error);
        throw error;
    }
}

// Función para actualizar las carreras en caché
export async function actualizarCarreras() {
    try {
        const response = await axios.get('https://apilab-backend-sandbox.up.railway.app/obtenercarreras');
        carrerasCache = response.data;
        return carrerasCache;
    } catch (error) {
        console.error('* Error al actualizar las carreras en caché:', error);
        throw error;
    }
}

// Función para obtener la lista de docentes
export async function obtenerDocentes() {
    if (docentesCache) {
        return docentesCache;
    }

    try {
        const response = await axios.get('https://apilab-backend-sandbox.up.railway.app/obtenerprofesores');
        docentesCache = response.data;
        return docentesCache;
    } catch (error) {
        console.error('* Error al obtener los docentes:', error);
        throw error;
    }
}

// Función para actualizar los docentes en caché
export async function actualizarDocentes() {
    try {
        const response = await axios.get('https://apilab-backend-sandbox.up.railway.app/obtenerprofesores');
        docentesCache = response.data;
        return docentesCache;
    } catch (error) {
        console.error('* Error al actualizar los docentes en caché:', error);
        throw error;
    }
}

// Función para obtener la lista de reservas
export async function obtenerReservas() {
    if (reservasCache) {
        return reservasCache;
    }

    try {
        const response = await axios.get('https://apilab-backend-sandbox.up.railway.app/obtenerreservas');
        reservasCache = response.data;
        return reservasCache;
    } catch (error) {
        console.error('* Error al obtener las reservas:', error);
        throw error;
    }
}

// Función para actualizar las reservas en caché
export async function actualizarReservas() {
    try {
        const response = await axios.get('https://apilab-backend-sandbox.up.railway.app/obtenerreservas');
        reservasCache = response.data;
        return reservasCache;
    } catch (error) {
        console.error('* Error al actualizar las reservas en caché:', error);
        throw error;
    }
}
