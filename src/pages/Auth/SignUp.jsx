import React, { useState } from 'react';
import { FiUpload, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import defaultAvatar from '../../assets/user.png';
import Input from '../../components/Input';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSendOTP = async () => {
    if (!email) return toast.error('Please enter your email');
    try {
      setOtpLoading(true);
      const { data } = await axios.post('/api/v1/send-otp', { email });
      setOtpSent(true);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) return toast.error('Enter a valid 6 digit OTP');
    try {
      setOtpLoading(true);
      const { data } = await axios.post('/api/v1/verify-otp', { email, otp });
      toast.success(data.message);
      setIsEmailVerified(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP Verification Failed');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) return toast.error('All fields are required');
    if (!isEmailVerified) return toast.error('Please verify your email');

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('password', password);
    if (image) formData.append('avatar', image);

    try {
      setSignupLoading(true);
      const { data } = await axios.post('/api/v1/register', formData);
      toast.success(data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100 mt-10">
      <h1 className="text-xl font-bold text-gray-800">Expense Tracker</h1>
      <h2 className="text-lg font-semibold text-gray-700">Create an Account</h2>
      <p className="text-sm text-gray-500 mb-6">Join us today by entering your details below.</p>

      {/* Avatar */}
      <div className="flex justify-center mb-6 relative">
        <div className="relative w-24 h-24">
          <img
            src={imagePreview || defaultAvatar}
            alt="Profile"
            className="rounded-full w-full h-full object-cover border-2 border-violet-500"
          />
          <label
            htmlFor="fileInput"
            className="absolute bottom-0 right-0 bg-violet-600 text-white p-1 rounded-full cursor-pointer shadow-md hover:bg-violet-700 transition"
          >
            <FiUpload size={16} />
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      <form onSubmit={handleSignup}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John" />
          <Input label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" />
        </div>

        <div className="mb-4 relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 8 characters"
          />
          <span
            className="absolute right-4 top-11 cursor-pointer text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        {/* OTP Section */}
        {otpSent && !isEmailVerified && (
          <div className="my-4 bg-purple-50 p-4 rounded-md border border-purple-200">
            <Input
              label="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6 digit code"
            />
            <button
              type="button"
              onClick={handleVerifyOTP}
              className="btn-primary mt-2"
              disabled={otpLoading}
            >
              {otpLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={handleSendOTP}
          className="btn-primary mt-2"
          disabled={otpLoading}
        >
          {otpLoading ? 'Sending...' : 'Send OTP'}
        </button>

        <button
          type="submit"
          className="btn-primary mt-3"
          disabled={signupLoading}
        >
          {signupLoading ? 'Creating Account...' : 'SIGN UP'}
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-violet-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
