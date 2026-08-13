import react from "react";
import { getUsuarios, testApi, getUsuarioById, crearUsuario, updateUsuario, deleteFisico, deleteLogico, reactivarUsuario } from "../services/apiService";
import { useState, useEffect } from "react";
import INFO from '../../Data/user';


function UsuariosDashboard() {
    /* test section */
    const [testResult, setTestResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTest = async () => {
        setLoading(true);
        try {
            const data = await testApi();
            setTestResult(data);
        } catch (error) {
            console.error(error);
            setTestResult({ error: "Failed to connect" });
        }
        setLoading(false);
    };


    /* Get Usuarios */


    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getUsuarios();
            setUsuarios(data.datos || []);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch users");
        }
        setLoading(false);
    };


    /* getusuariosID */

    const [userId, setUserId] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!userId) return;

        setLoading(true);
        setError(null);
        try {
            const data = await getUsuarioById(userId);
            const usuarioEncontrado = Array.isArray(data.datos) ? data.datos[0] : data.datos || data;
            setUsuario(usuarioEncontrado || null);
            if (!usuarioEncontrado) {
                setError('Usuario no encontrado');
            }
        } catch (err) {
            console.error(err);
            setError("Failed to fetch user");
            setUsuario(null);
        }
        setLoading(false);
    };

    /* Postusuarios */
    const [formData, setFormData] = useState({
        Nombre_Usuario: '',
        Credencial_Espacial: '',
        ID_Perfil: '',
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await crearUsuario(formData);
            setResult(data);
            setFormData({
                Nombre_Usuario: '',
                Credencial_Espacial: '',
                ID_Perfil: '',
            });
        } catch (error) {
            console.error(error);
            setResult({ error: "Failed to create user" });
        }
        setLoading(false);
    };

    /* Putusuarios */
    function PutUpdateSection() {
        const [formData, setFormData] = useState({
            ID_Usuario: '',
            Nombre_Usuario: '',
            Credencial_Espacial: '',
            ID_Perfil: '',
        });
        const [loading, setLoading] = useState(false);
        const [result, setResult] = useState(null);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
                const data = await updateUsuario(formData);
                setResult(data);
            } catch (error) {
                console.error(error);
                setResult({ error: "Failed to update user" });
            }
            setLoading(false);
        };

        /* Deletelogico */

        const [userId, setUserId] = useState('');
        const [loading, setLoading] = useState(false);
        const [result, setResult] = useState(null);

        const handleDelete = async (e) => {
            e.preventDefault();
            if (!userId) return;

            if (!window.confirm('Are you sure you want to mark this user as inactive(Wont appear on active users list)?')) return;

            setLoading(true);
            try {
                const data = await deleteLogico(userId);
                setResult(data);
                setUserId('');
            } catch (error) {
                console.error(error);
                setResult({ error: "Failed to delete user logically" });
            }
            setLoading(false);
        };

        /* deletefisico */
        const [userId, setUserId] = useState('');
        const [loading, setLoading] = useState(false);
        const [result, setResult] = useState(null);

        const handleDelete = async (e) => {
            e.preventDefault();
            if (!userId) return;

            if (!window.confirm('WARNING: This will permanently delete the user from the database. you could lose your job')) {
                return;
            }

            setLoading(true);
            try {
                const data = await deleteFisico(userId);
                setResult(data);
                setUserId('');
            } catch (error) {
                console.error(error);
                setResult({ error: "Failed to delete user permanently" });
            }
            setLoading(false);
        };

        /* reactivate user */
        const [userId, setUserId] = useState('');
        const [loading, setLoading] = useState(false);
        const [result, setResult] = useState(null);

        const handleReactivate = async (e) => {
            e.preventDefault();
            if (!userId) return;

            if (!window.confirm('Are you sure you want to reactivate this user?')) return;

            setLoading(true);
            try {
                const data = await reactivarUsuario(userId);
                setResult(data);
                setUserId('');
            } catch (error) {
                console.error(error);
                setResult({ error: "Failed to reactivate user" });
            }
            setLoading(false);
        };




        return ("1")

    }

}
    export default UsuariosDashboard;