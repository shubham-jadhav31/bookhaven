// EditProfile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const [form, setForm] = useState({});
    const navigate = useNavigate();
    
    // Fetch user profile on mount
    useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/getProfileInfo`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          console.error("Unauthorized – missing or invalid token");
          return;
        }
        const data = await res.json();
        console.log("Profile Data: ", data.data);
        setForm(data.data); // assuming response format { data: { ...user } }
      } catch (err) {
      console.error('Failed to fetch user profile:', err);
      }
    };
    fetchUserProfile();
    }, []);

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
  
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/api/updateProfile`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
          });
      
          const data = await res.json();
          console.log("Profile updated:", data);
          navigate("/profile");
          alert("Profile updated successfully!");
        } catch (err) {
          console.error("Failed to update profile:", err);
        }
      };
      

  return (
    <div className="ep-container">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
            {Object.keys(form).reduce((rows, key, index, keys) => {
            if (index % 2 === 0) {
                const secondKey = keys[index + 1];
                rows.push(
                <div className="ep-row" key={key}>
                    <div className="ep-form-group">
                    <label className="ep-label">
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </label>
                    <input
                        type="text"
                        name={key}
                        value={form[key]}
                        className="ep-input"
                        onChange={handleChange}
                        disabled={key === "id" || key === "password" || key ==='is_admin'}
                    />
                    </div>
                    {secondKey && (
                    <div className="ep-form-group">
                        <label className="ep-label">
                        {secondKey.charAt(0).toUpperCase() + secondKey.slice(1)}:
                        </label>
                        <input
                        type="text"
                        name={secondKey}
                        value={form[secondKey]}
                        className="ep-input"
                        onChange={handleChange}
                        disabled={secondKey  === "id" || secondKey === "password" || secondKey ==='is_admin'}
                        />
                    </div>
                    )}
                </div>
                );
            }
            return rows;
            }, [])}
            <button type="submit" className="ep-submit-btn">Save</button>
        </form>
    </div>
  );
};

export default EditProfile;
