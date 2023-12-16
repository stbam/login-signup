import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const history = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [user, setUser] = useState("");
    const [confirmUser, setConfirmUser] = useState("");

    const submit = async (e) => {
        e.preventDefault();

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match");
            return;
        }

        // Check if username and confirm username match
        if (user !== confirmUser) {
            alert("Username and Confirm Username do not match");
            return;
        }

        try {
            await axios.post("http://localhost:8000/signup", {
                email,
                password,
                username: user,
                
            })
            .then((res) => {
                if (res.data === "exist") {
                    alert("User already exists");
                } else if (res.data === "notexist") {
                    history("/home", { state: { id: email } });
                }
            })
            .catch((error) => {
                alert("Wrong details");
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="signup">
            <h1>Signup</h1>
            <form action="POST">
                <input type="text" onChange={(e) => setUser(e.target.value)} placeholder="Username" />
                <input type="text" onChange={(e) => setConfirmUser(e.target.value)} placeholder="Confirm Username" />
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                <input type="submit" onClick={submit} />
            </form>
            <Link to="/">Login Page</Link>
        </div>
    );
}

export default Signup;
