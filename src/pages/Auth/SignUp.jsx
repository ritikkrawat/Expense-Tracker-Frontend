import React, { useContext, useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';
import toast from 'react-hot-toast';

const Signup = () => {
  const [profilePic, setProfilePic] = useState('');
  const [fullName, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!validateEmail(email)) {
      toast.error('Enter a valid email before sending OTP');
      return;
    }

    setOtpLoading(true);
    try {
      await axiosInstance.post(API_PATHS.EMAIL.SEND_OTP, { email });
      setOtpSent(true);
      toast.success('OTP sent to your email ✅');
    } catch (err) {
      toast.error('Failed to send OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setOtpLoading(true);
    try {
      await axiosInstance.post(API_PATHS.EMAIL.VERIFY_OTP, { email, otp });
      setIsEmailVerified(true);
      toast.success('Email verified successfully ✅');
    } catch (err) {
      toast.error('Invalid or expired OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName) return toast.error('Please enter your name');
    if (!validateEmail(email)) return toast.error('Invalid email address');
    if (!password) return toast.error('Please enter the password');
    if (!isEmailVerified) return toast.error('Please verify your email');

    try {
      let profileImageUrl = '';

      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || '';
      }

      const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = res.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        toast.success('Signup successful! 🎉');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Something went wrong. Try again.'
      );
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-full h-auto mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
            <Input
              value={fullName}
              onChange={(e) => setFullname(e.target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />

            <div className="w-full">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                placeholder="example@gmail.com"
                type="text"
              />
            </div>

            <div className="flex md:items-end md:ml-2">
              {!otpSent && (
                <button
                  type="button"
                  onClick={handleSendOTP}
                  className="btn-primary h-[44px] px-4 w-full md:w-fit mt-2 md:mt-0"
                  disabled={otpLoading}
                >
                  {otpLoading ? 'Sending...' : 'Send OTP'}
                </button>
              )}
            </div>

            <div className="col-span-2">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
              />
            </div>
          </div>

          {/* OTP Section */}
          {otpSent && !isEmailVerified && (
            <div className="my-4">
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

          {isEmailVerified && (
            <p className="text-green-600 text-xs my-2">Email verified ✅</p>
          )}

          <button type="submit" className="btn-primary mt-4">
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{' '}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
