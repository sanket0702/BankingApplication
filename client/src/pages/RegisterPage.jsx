import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    occupation: "",
    nationality: "",
    maritalStatus: "",
    nominee: "",
    address: "",
    upiId: "",
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Registration failed. Try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-4xl font-bold text-center text-red-600 mb-8">
          Create Your Trusted Bank Account
        </h2>

        {error && (
          <div className="text-red-600 text-sm mb-4 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <Section title="Personal Information" />

          <Field label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" type="text" />
          <Field label="Date of Birth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} type="date" />
          <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={["Male", "Female", "Other"]} />
          <Field label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="1234567890" />
          <Field label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
          <Field label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter password" />
          <Field label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" />

          <Section title="Additional Details" />

          <Field label="Occupation" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Engineer" type="text" />
          <Field label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Indian" type="text" />
          <SelectField label="Marital Status" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} options={["Single", "Married", "Divorced"]} />
          <Field label="Nominee" name="nominee" value={formData.nominee} onChange={handleChange} placeholder="Jane Doe" type="text" />
          <Field label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main Street" type="text" />
          <Field label="UPI ID" name="upiId" value={formData.upiId} onChange={handleChange} placeholder="john@upi" type="text" />

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-lg font-semibold shadow-md transition"
            >
              Register Now
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

// Reusable Input Field
const Field = ({ label, type, placeholder, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
    />
  </div>
);

// Reusable Dropdown
const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

// Section Divider
const Section = ({ title }) => (
  <div className="md:col-span-2 pt-4">
    <h3 className="text-lg font-semibold text-red-500 mb-2">{title}</h3>
  </div>
);

export default Register;
