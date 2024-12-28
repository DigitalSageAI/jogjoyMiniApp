import React, { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

function GetFreeAccount() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ name: '', email: '', password: '' });

    const navigate = useNavigate();

    const validateInputs = () => {
        let valid = true;
        const newErrors = { name: '', email: '', password: '' };

        if (!name.trim()) {
            newErrors.name = 'Name is required.';
            valid = false;
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required.';
            valid = false;
        } else if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
            newErrors.email = 'Invalid email address.';
            valid = false;
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required.';
            valid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const sendInfo = async () => {
        if (!validateInputs()) return;

        try {
            const response = await axios.post('/register', { name, email, password });
            if (response.data) {
                navigate('/home');
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className='flex flex-col justify-start items-center bg-primary w-[100%] h-[100%]'>
            <p className='font-sans text-[17px] font-normal mt-[29px] w-[90%] text-right' style={{ color: '#fff', opacity: '.5' }}>Skip</p>
            <p className='font-syne text-[21px] text-white font-semibold mt-[19px] w-[90%] text-left'>Get your free account</p>

            <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-4"
                placeholder={'Your name and surname'}
            />
            {errors.name && <p className='text-red-500 text-sm mt-1 w-[90%] text-left'>{errors.name}</p>}

            <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-4"
                placeholder={'Email Address'}
            />
            {errors.email && <p className='text-red-500 text-sm mt-1 w-[90%] text-left'>{errors.email}</p>}

            <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-4"
                placeholder={'Your password'}
            />
            {errors.password && <p className='text-red-500 text-sm mt-1 w-[90%] text-left'>{errors.password}</p>}

            <p className='font-sans text-[17px] font-normal mt-2 w-[90%] text-left' style={{ color: '#fff', opacity: '.7' }} onClick={() => navigate('/signIn')}>
                Do you already have an account? Log in
            </p>
            <Button className="mt-4" onClick={sendInfo}>Get started</Button>

            <p style={{ color: "rgba(235, 235, 245, 0.6)" }} className='font-sans font-[14px] mt-[11px] w-[90%]'>
                By clicking “Get started”, you agree to the <span className='text-white'>Terms</span> and <span className='text-white'>Privacy policy.</span>
            </p>
            <img src="/icons/Login.png" onClick={() => navigate('/signIn')} alt="login" className='mt-[32px] w-[90%]' />

            <div className="flex justify-center items-center gap-[15px] w-[90%] mt-[21px]">
                <img src="/icons/facebook.png" alt="" className='w-[104px]' />
                <img src="/icons/apple.png" alt="" className='w-[104px]' />
                <img src="/icons/google.png" alt="" className='w-[104px]' />
            </div>
        </div>
    );
}

export default GetFreeAccount;
