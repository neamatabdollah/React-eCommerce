// import { useState, useEffect } from "react";
// import "./RegisterPage.css";
// import { useNavigate } from "react-router-dom";

// export default function RegisterPage() {
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [addresses, setAddresses] = useState([""]);
//   const [errors, setErrors] = useState({});
//   const [isDirty, setIsDirty] = useState(false);

//   const navigate = useNavigate();

//   const validateUserName = (value) => {
//     if (!value) return "User Name is required.";
//     if (/\s/.test(value)) return "User Name should not contain spaces.";
//     return "";
//   };

//   const validateEmail = (value) => {
//     if (!value) return "Email is required.";
//     if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid.";
//     return "";
//   };

//   const validatePassword = (value) => {
//     if (!value) return "Password is required.";
//     if (!/(?=.*[A-Z])/.test(value)) return "Password must contain at least one uppercase letter.";
//     if (!/(?=.*\d)/.test(value)) return "Password must contain at least one number.";
//     if (!/(?=.*[!@#$%^&*])/.test(value)) return "Password must contain at least one special character.";
//     return "";
//   };

//   const validateConfirmPassword = (value) => {
//     if (!value) return "Confirm Password is required.";
//     if (value !== password) return "Passwords do not match.";
//     return "";
//   };

//   const validate = () => {
//     return {
//       userName: validateUserName(userName),
//       email: validateEmail(email),
//       password: validatePassword(password),
//       confirmPassword: validateConfirmPassword(confirmPassword),
//     };
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     const hasErrors = Object.values(validationErrors).some((err) => err);
//     if (hasErrors) {
//       setErrors(validationErrors);
//     } else {
//       setErrors({});
//       alert("Registration successful!");
//       navigate("/");
//     }
//   };

//   const handleAddAddress = () => {
//     setAddresses([...addresses, ""]);
//   };

//   const handleAddressChange = (index, value) => {
//     const newAddresses = [...addresses];
//     newAddresses[index] = value;
//     setAddresses(newAddresses);
//     setIsDirty(true);
//   };

//   useEffect(() => {
//     if (userName || email || password || confirmPassword || addresses.some((a) => a)) {
//       setIsDirty(true);
//     }
//   }, [userName, email, password, confirmPassword, addresses]);

//   return (
//     <div className="register-page">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit} className="register-form">
//         <div className=" address">
//           <label>User Name:</label>
//           <input
//             type="text"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//           />
//           {errors.userName && <span className="error">{errors.userName}</span>}
//         </div>

//         <div className=" address">
//           <label>Email:</label>
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           {errors.email && <span className="error">{errors.email}</span>}
//         </div>

//         <div className=" address">
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {errors.password && <span className="error">{errors.password}</span>}
//         </div>

//         <div className=" address">
//           <label>Confirm Password:</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           {errors.confirmPassword && (
//             <span className="error">{errors.confirmPassword}</span>
//           )}
//         </div>

//         <div className="form-group address">
//           <label>Address:</label>
//           {addresses.map((address, index) => (
//             <input
//               key={index}
//               type="text"
//               placeholder={`Address ${index + 1}`}
//               value={address}
//               onChange={(e) => handleAddressChange(index, e.target.value)}
//             />
//           ))}
//           <button type="button" onClick={handleAddAddress}>
//             + Add Address
//           </button>
//         </div>

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [addresses, setAddresses] = useState([""]);
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  const navigate = useNavigate();

  // ✅ تأكيد قبل مغادرة الصفحة لو في تغييرات
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const validate = () => {
    const errs = {};
    if (!userName) errs.userName = "User Name is required.";
    else if (/\s/.test(userName)) errs.userName = "No spaces allowed.";

    if (!email) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Email is invalid.";

    if (!password) errs.password = "Password is required.";
    else {
      if (!/(?=.*[A-Z])/.test(password)) errs.password = "Add uppercase letter.";
      if (!/(?=.*\d)/.test(password)) errs.password = "Add number.";
      if (!/(?=.*[!@#$%^&*])/.test(password)) errs.password = "Add special character.";
    }

    if (!confirmPassword) errs.confirmPassword = "Confirm Password is required.";
    else if (confirmPassword !== password) errs.confirmPassword = "Passwords don't match.";

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      alert("Registered Successfully!");
      setIsDirty(false); // Reset Dirty
      navigate("/"); // Or navigate("/login") if you want
    }
  };

  const handleAddAddress = () => {
    setAddresses([...addresses, ""]);
    setIsDirty(true);
  };

  const handleAddressChange = (index, value) => {
    const copy = [...addresses];
    copy[index] = value;
    setAddresses(copy);
    setIsDirty(true);
  };

  useEffect(() => {
    if (userName || email || password || confirmPassword || addresses.some((a) => a)) {
      setIsDirty(true);
    }
  }, [userName, email, password, confirmPassword, addresses]);

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label>User Name:</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        {errors.userName && <span className="error">{errors.userName}</span>}

        <label>Email:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

        <label>Addresses:</label>
        {addresses.map((addr, i) => (
          <input
            key={i}
            placeholder={`Address ${i + 1}`}
            value={addr}
            onChange={(e) => handleAddressChange(i, e.target.value)}
          />
        ))}
        <button type="button" onClick={handleAddAddress}>+ Add Address</button>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
