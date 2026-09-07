import { useState } from 'react';
import { updateUsuario } from '../../services/apiService';

export function usePutUpdateSection() {
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
      setResult(await updateUsuario(formData));
    } catch (error) {
      console.error(error);
      setResult({ error: "Failed to update user" });
    } finally {
      setLoading(false);
    }
  };

  return { formData, setFormData, loading, result, handleChange, handleSubmit };
}
