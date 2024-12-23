import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
const Login = (props) =>{
    const [email, setEmail] = useState("scott@test.com");
    const [password, setPassword] = useState("Scott123");
    let userContext = useContext(UserContext);

    console.log(UserContext);
    
    let [dirty, setDirty] = useState({
        email : false,
        password : false
    })
    let [errors, setErrors] = useState({
        email : [],
        password : []
    });
    let [loginMessage, setLoginMessage] = useState("");

    const navigate = useNavigate();

    // executes on each render (initial render & state updates)
    useEffect(()=>{
        // console.log(email,password); 
    },[email]);
    //executes only on state updates of "email" only (and also with initial render)
    useEffect(() => {
        if(email.indexOf("@")>0){
            // console.log("valid");
        } else {
            // console.log("invalid");
            
        }
    },[email,password]);

    // executees only once - on initial render = componentDidMount

    useEffect(() =>{
        console.log("Login- eCommerce");
        
    },[]);

    // executes only once - on component unmounting phase = componentWillUnmount
    useEffect(() => {
        return () => {
            console.log("Component Unmount");
            
        };
    },[]);

    let validate = () =>{
        // variable to store errorsDate
        let errorsData = {};

        // email
        errorsData.email = [];

        // email can't blank
        if(!email)
        {
            errorsData.email.push("Email can't be blank");
        }
        // email regex
        let validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email)
        {
            if(!validEmailRegex.test(email))
            {
                errorsData.email.push("Proper email address is expected");
            }
        }
        // password
        errorsData.password = [];

        // email can't blank
        if(!password)
        {
            errorsData.password.push("password  can't be blank");
        }
        // email regex
        let validPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
        if(password)
        {
            if (!validPasswordRegex.test(password))
            {
                errorsData.password.push("Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number");
            }
        }

        setErrors(errorsData);
    }

    useEffect(validate, [email, password]);

    // when the user clicks on Login button
    let onLoginClick= async()=>{

        let dirtyData = dirty;
        Object.keys(dirty).forEach((control)=>{
            dirtyData[control] = true;
        });
        setDirty(dirtyData);
        // call validate
        validate();
        if(isValid())
        {
            let response = await fetch(`http://localhost:5000/users?email=${email}&password=${password}`, {method : "GET"});
           if(response.ok){
            let responseBody = await response.json();
            if(responseBody.length>0){
                userContext.setUser({
                    ...userContext.user,
                    isLoggedIn : true,
                    currentUserName : responseBody[0].fullName,
                    currentUserId : responseBody[0].id,
                });
                navigate('/dashboard');
            }
            else {
                setLoginMessage(<span className="text-danger">Invalid Login, please try again</span>);
            }
           } 
        }
        else {
            setLoginMessage(<span className="text-danger">Unable to connect to the server</span>);
        }
    };
    let isValid = () =>{
        let valid = true;
        // reading all controls from errors
        for(let control in errors){
            if(errors[control].length>0) valid = false;
        }
        return valid;
    }

    return (
        <div className="row">
            <div className="col-lg-5 col-md-7 mx-auto">
                <div className="card border-success shadow-lg my-2 ">
                    <div className="card-header border-bottom border-success">
                     <h4 style={{fontSize :"40px"}} className="text-success text-center">Login</h4>
                    </div>    
                    {/* email start */}
                    <div className="form-group p-2">
                        <label htmlFor="email" className="p-1">Email</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(event) => { setEmail(event.target.value); 
                        }} placeholder="Email"
                        onBlur={() =>{
                            setDirty({...dirty, email: true});
                            validate();
                        }}
                        
                        />
                        <div className="text-danger">
                            {dirty["email"] && errors["email"][0]? errors["email"] : ""}
                        </div>
                    </div>
                    {/* email ends */}
                    {/* password start */}
                    <div className="form-group p-2">
                        <label htmlFor="password " className="p-1">password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(event) => { setPassword(event.target.value);  }}
                         placeholder="password"
                            onBlur={() => {
                                setDirty({ ...dirty, password: true });
                                validate();
                            }}
                         />
                        <div className="text-danger">
                            {dirty["password"] && errors["password"][0] ? errors["password"] : ""}
                        </div>
                    </div>
                    {/* password ends */}
                    <div className="card-footer text-center">
                        <div className="m-1">{loginMessage}</div>
                        <button className="btn btn-success m-2" onClick={onLoginClick}>Login</button>
                    </div>
                </div> 

                   
            </div>
        </div>
    )
}
export default Login;