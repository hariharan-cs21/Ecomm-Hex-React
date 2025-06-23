import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setUserDetails } from "../store/actions/UserActions"
import { useDispatch } from 'react-redux'

const Login = () => {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogin = async () => {
        const encodeString = window.btoa(username + ":" + password)
        try {
            const res = await axios.get("http://localhost:8080/api/user/token", {
                headers: {
                    "Authorization": "Basic " + encodeString
                }
            })
            let token = res.data.token
            setMsg("Logged In Successfully")
            localStorage.setItem("token", token)
            const detail = await axios.get("http://localhost:8080/api/user/details", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            let user = {
                'username': username,
                'role': detail.data.user.role
            }
            setUserDetails(dispatch)(user);
            localStorage.setItem("name", detail.data.name)
            let role = detail.data.user.role
            localStorage.setItem("role", role)
            switch (role) {
                case "CUSTOMER":
                    navigate("/customer")
                    break;

                case "SELLER":
                    navigate("/seller")
                    break;

                case "EXECUTIVE":
                    navigate("/executive")
                    break;

                default:
                    setMsg("Login Not allowed")
                    break;
            }
        } catch (error) {
            setMsg(error?.response?.data?.message ?? "Invalid Credentials")
        }

    }
    return (
        < div className="container" >
            <div className="row">
                <div className="col " style={{ height: "5rem" }}>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3"> </div>
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-header text-center"> Login</div>
                        <div className="card-body">
                            {msg !== "" && <div>
                                <div className="alert alert-info" >
                                    {msg}
                                </div>
                            </div>}

                            <div className="mb-2">
                                <label>Enter username:</label>
                                <input type="text" className="form-control"
                                    onChange={(e) => setUserName(e.target.value)} />
                            </div>
                            <div className="mb-2">
                                <label>Enter password:</label>
                                <input type="password" className="form-control"
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="mb-2">
                                <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                            </div>
                        </div>
                        <div className="card-footer">
                            Don't have an Account? Register here.
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login