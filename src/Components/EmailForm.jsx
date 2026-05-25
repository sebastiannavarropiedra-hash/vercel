import React, { useState } from 'react';

function EmailForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

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
        setErrors({ general: data.error || 'Error al enviar el mensaje' });
      }
    } catch (error) {
      setErrors({ general: 'Error al enviar el mensaje' });
    } finally {
      setLoading(false);
    }
  };

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
}

export default EmailForm;