// components/EmailVerification.js
import React, { useState } from 'react';
import axios from 'axios';

const EmailVerification = ({ onVerified }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('email'); // email → otp
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/email/send`, { email });
      setStep('otp');
      setMessage('OTP sent to your email!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to send OTP');
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/email/verify`, { email, otp });
      setMessage('Email verified!');
      onVerified(email); // callback to parent
    } catch (error) {
      setMessage(error.response?.data?.message || 'OTP verification failed');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 rounded shadow bg-white max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">Email Verification</h2>
      
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        disabled={step === 'otp'}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 px-3 py-2 border rounded"
      />

      {step === 'otp' && (
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
        />
      )}

      <button
        onClick={step === 'email' ? sendOtp : verifyOtp}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? 'Please wait...' : step === 'email' ? 'Send OTP' : 'Verify OTP'}
      </button>

      {message && <p className="text-sm mt-3 text-center text-gray-600">{message}</p>}
    </div>
  );
};

export default EmailVerification;