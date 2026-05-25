import react from 'react';
import { useState } from 'react';
function EmailForm() {


    const [formData, setformData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [sucess, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const handleNameChange = (e) => {
        setFormData({
            name: e.target.value,
            email: formData.email,
            message: formData.message
        });
        if (error) setError('');
    };
    const handleEmailChange = (e) => {
        setFormData({
            name: formData.name,
            email: e.target.value,
            message: formData.message
        });
        if (error) setError('');
    };
    const handleMessageChange = (e) => {
        setFormData({
            name: formData.name,
            email: formData.email,
            message: e.target.value
        });
        if (error) setError('');
    };

    const validate = () => {

        const newErrors = {};

        if (!formData.name.trim() || formData.name.length < 2) {
            newErrors.name = 'Nombre demasiado corto';
        }
        if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
            newErrors.name = 'Solo letras permitidas';
        }

        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Mensaje requerido';
        } else if (formData.message.length < 10) {
            newErrors.message = 'Mínimo 10 caracteres';
        } else if (formData.message.length > 500) {
            newErrors.message = 'Máximo 500 caracteres';
        }

        return newErrors;

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        const newErrors = validate();
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        setLoading(true);

        try {
            const response = await fetch('/api/sendemail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess(true);
                setFormData({ name: '', email: '', message: '' });
            } else {
                setError(data.error || 'Error al enviar el mensaje');
            }
        } catch (error) {
            setError('Error al enviar el mensaje');

        } finally { setLoading(false); }

    }




    return (
        <div>
            <h1>Formulario de contacto</h1>
        </div>
    );
}

export default EmailForm;