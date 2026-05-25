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
    };
    const handleEmailChange = (e) => {
        setFormData({
            name: formData.name,
            email: e.target.value,
            message: formData.message
        });
    };
    const handleMessageChange = (e) => {
        setFormData({
            name: formData.name,
            email: formData.email,
            message: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

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

        }
        setLoading(false);
    }




    return (
        <div>
            <h1>Formulario de contacto</h1>
        </div>
    );
}

export default EmailForm;