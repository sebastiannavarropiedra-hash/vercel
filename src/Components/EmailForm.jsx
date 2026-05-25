import React, { useState } from 'react';
import { sendEmail } from '../services/apiService';


function EmailForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    // Keeps track of name, email, and message in formData.

    // Tracks UI states:

    // loading → shows "Enviando..." while waiting.

    // success → shows success message after sending.

    // errors → stores validation or server errors.

    const handleNameChange = (e) => {
        setFormData(prev => ({ ...prev, name: e.target.value }));
        if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
    };

    const handleEmailChange = (e) => {
        setFormData(prev => ({ ...prev, email: e.target.value }));
        if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
    };

    const handleMessageChange = (e) => {
        setFormData(prev => ({ ...prev, message: e.target.value }));
        if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
    };


    // Each input (name, email, message) has its own handler that updates state and clears related errors when the user types.


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
    };


    // // Validation

    // Checks that:

    // Name is at least 2 characters and only letters.

    // Email matches a regex pattern.

    // Message is between 10 and 500 characters.

    // Returns an errors object if validation fails.

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setSuccess(false);

        const newErrors = validate();
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            setLoading(false);
            return;
        }

        try {
            const result = await sendEmail(formData);

            console.log('sendEmail result:', result);

            if (!result.ok) {
                // Si backend devolvió 200 pero con resultado_tipo error, lo manejamos abajo
                const detalle = result.body?.respuesta_detalle || `Error ${result.status}`;
                setErrors({ general: detalle });
            } else {
                // response.ok true: revisar body.resultado_tipo
                if (result.body?.resultado_tipo === 'exito') {
                    setSuccess(true);
                    setFormData({ name: '', email: '', message: '' });
                } else {
                    const detalle = result.body?.respuesta_detalle || 'Error al enviar el mensaje';
                    setErrors({ general: detalle });
                }
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setErrors({ general: 'Error de red o servidor. Intenta de nuevo más tarde.' });
        } finally {
            setLoading(false);
        }
    };

    // // Form Submission

    // Prevents default form behavior (e.preventDefault()).

    // Runs validation before sending.

    // Calls sendEmail(formData) asynchronously.

    // Handles different outcomes:

    // Success → clears form, shows success message.

    // Backend error → shows error message from server response.

    // Network/server error → shows fallback error message.

    return (
        <div className="EmailForm">
            <h2>Contáctame</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        value={formData.name}
                        onChange={handleNameChange}
                        placeholder="Tu nombre"
                    />
                    {errors.name && <small className="text-danger">{errors.name}</small>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        value={formData.email}
                        onChange={handleEmailChange}
                        placeholder="Tu email"
                    />
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Mensaje</label>
                    <textarea
                        name="message"
                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                        value={formData.message}
                        onChange={handleMessageChange}
                        placeholder="Tu mensaje"
                    />
                    {errors.message && <small className="text-danger">{errors.message}</small>}
                </div>

                {errors.general && <div className="text-danger">{errors.general}</div>}

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar'}
                </button>

                {success && <div className="text-success mt-2">¡Mensaje enviado con éxito!</div>}
            </form>
        </div>
    );


    //     // UI Rendering

    // Displays form fields with Bootstrap styling.

    // Shows inline error messages under each field.

    // Shows general error messages if backend/network fails.

    // Shows loading state on button.

    // Shows success message when email is sent.
}

export default EmailForm;