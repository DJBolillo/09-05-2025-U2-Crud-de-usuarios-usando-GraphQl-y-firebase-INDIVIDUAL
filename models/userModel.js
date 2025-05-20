const db = require('../firebase');
const usersRef = db.collection('users');

const getAll = async () => {
    const snapshot = await usersRef.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const getUserById = async (id) => {
    const doc = await usersRef.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
};


const create = async (name, email) => {
    // Obtener todos los documentos y determinar el mayor ID numérico
    const snapshot = await usersRef.get();
    
    // Filtrar solo los documentos con IDs numéricos
    const numericIds = snapshot.docs
        .map(doc => doc.id)
        .filter(id => !isNaN(id))         // solo IDs numéricos
        .map(id => parseInt(id));         // convertir a número

    const nextId = numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;
    const newUser = { name, email };

    // Crear el documento con ID numérico personalizado
    await usersRef.doc(String(nextId)).set(newUser);

    return { id: String(nextId), ...newUser };
};
const update = async (id, name, email) => {
    const userRef = usersRef.doc(id);
    const doc = await userRef.get();
    if (!doc.exists) throw new Error(`Usuario con ID ${id} no encontrado`);

    const data = {};
    if (name !== undefined) data.name = name;
    if (email !== undefined) {
        if (!isValidEmail(email)) {
            throw new Error(`El correo "${email}" no es válido.`);
        }
        data.email = email;
    }

    await userRef.update(data);
    const updatedDoc = await userRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
};

const remove = async (id) => {
    const userRef = usersRef.doc(id);
    const doc = await userRef.get();
    if (!doc.exists) return null;

    await userRef.delete();
    return { id: doc.id, ...doc.data() };
};

// Función de validación de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = { getAll, getUserById, create, update, remove };
