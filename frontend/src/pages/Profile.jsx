import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const Profile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);

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
          console.log("Profile Data:", data);
  
          // If your backend does: res.json({ data: userRow })
          // then do setProfile(data.data)
          // If your backend does: res.json(userRow)
          // then do setProfile(data)
          setProfile(data.data || data);
        } catch (err) {
          console.error("Failed to fetch user profile:", err);
        }
      };
  
      fetchUserProfile();
    }, []);
  
    if (!profile) {
      return <div>Loading profile…</div>;
    }

    return (
        <div className="profile-wrapper">
            <div className="profile-card">
                <div className="profile-header">
                    <img
                        src={`https://placehold.co/150x150/1a1a1a/ffffff?text=${encodeURIComponent(profile.name[0])}`}
                        alt="Profile"
                        className="profile-img"
                    />
                    <div className="profile-basic">
                        <h2>{profile.name}</h2>
                        <p className="member-since">Member since {profile.member_since}</p>
                    </div>
                    <NavLink to="/edit-profile">
                        <button className="editProfile-btn">
                            <FaUserEdit size={16} />
                            Edit
                        </button>
                    </NavLink>
                    {user.isAdmin && (
                      <NavLink to="/admin">
                        <button className="adminPanel-btn">
                          <FaUserEdit size={16} />
                          Admin Panel
                        </button>
                      </NavLink>
                    )}
                </div>

                <div className="profile-details">
                    <div className="detail-row">
                        <span>Email:</span>
                        <p>{profile.email}</p>
                    </div>
                    <div className="detail-row">
                        <span>Phone:</span>
                        <p>{profile.phone}</p>
                    </div>
                    <div className="detail-row">
                        <span>Location:</span>
                        <p>{profile.location}</p>
                    </div>
                    <div className="detail-row">
                        <span>Education:</span>
                        <p>{profile.education}</p>
                    </div>
                    <div className="detail-row">
                        <span>Occupation:</span>
                        <p>{profile.occupation}</p>
                    </div>
                    <div className="detail-row">
                        <span>Interests:</span>
                        <p>{profile.interests}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
