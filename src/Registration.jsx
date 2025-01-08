import { event } from 'jquery';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const Register = ()=> {

    const [state , setState] = useState({
        email : "",
        password : "",
        fullName : "",
        dateOfBirth : "",
        gender : "",
        country : "",
        receiveNewsLetters : "",
    });
    let [countries] = useState([
        { id: 1, countryName: "India"},
        { id: 2, countryName: "USA"},
        { id: 3, countryName: "UK" },
        { id: 4, countryName: "Japan" },
        { id: 5, countryName: "France" },
        { id: 6, countryName: "Brazil" },
        { id: 7, countryName: "Mexico" },
        { id: 8, countryName: "Canada" },
      ]);
    const [errors, setErrors] = useState({
        email: [],
        password: [],
        fullName: [],
        dateOfBirth: [],
        gender: [],
        country: [],
        receiveNewsLetters: [],
    });
    const [dirty, setDirty] = useState({
        email: false,
        password: false,
        fullName: false,
        dateOfBirth: false,
        gender: false,
        country: false,
        receiveNewsLetters: false,
    });

    const [message, setMessage] = useState("");

    let userContext = useContext(UserContext)

    const navigate = useNavigate();


    // validate
    let validate = () =>{
        let errorsData = {};

        // email
         errorsData.email = [];

        
        // email can't blank
        if (!state.email) {
            errorsData.email.push("Email can't be blank");
        }
            const validEmailRegex = /\w+([-+.']\w+)*@\w+([-•]\w+)*\.\w+([-]\w+)*/;
         if(state.email){
            if(!validEmailRegex.test(state.email)){
                errorsData.email.push("Proper email address is expected");
            }
         }
        // password
         errorsData.password = [];

        
        // password can't blank
        if (!state.password) {
            errorsData.password.push("password can't be blank");
        }
        const validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;
         if(state.password){
             if (!validPasswordRegex.test(state.password)){
                errorsData.password.push("Password should be 6 to 15 characters long with at least one uppercaseletter, one lowercase letter and one digit");
            }
         }

         // fullName
        errorsData.fullName = [];


        // fullName can't blank
        if (!state.fullName) {
            errorsData.password.push("fullName can't be blank");
        }
         // dateOfBirth
        errorsData.dateOfBirth = [];


        // Date  can't blank
        if (!state.dateOfBirth) {
            errorsData.dateOfBirth.push("Date of can't be blank");
        }
         // gender
        errorsData.gender = [];


        // gender can't blank
        if (!state.dateOfBirth) {
            errorsData.dateOfBirth.push("gender can't be blank");
        }
         // country
        errorsData.country = [];


        // country can't blank
        if (!state.country) {
            errorsData.dateOfBirth.push("country can't be blank");
        }

        setErrors(errorsData);
    };

     useEffect(validate, [state]);
     
     // executes only once - on initial render = componentDidMount
    
        useEffect(() =>{
            console.log("Register- eCommerce");
            
        },[]);

        useEffect(()=>{
            console.log(state.email);
            
        }, [state.email]);

    const onRegisterClick = async () => {
        // Create a shallow copy of dirty and set all controls as dirty
        const dirtyData = { ...dirty };
        Object.keys(dirty).forEach((control) => {
            dirtyData[control] = true;
        });
        setDirty(dirtyData);

        // Validate inputs
        validate();

        if (isValid()) {
            setMessage(<span className="text-success"></span>);

            try {
                const response = await fetch("http://localhost:5000/users", {
                    method: "POST",
                    body: JSON.stringify({
                        email: state.email,
                        password: state.password,
                        fullName: state.fullName,
                        dateOfBirth: state.dateOfBirth,
                        gender: state.gender,
                        country: state.country,
                        receiveNewsLetters: state.receiveNewsLetters,
                        role : "user",
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    let responseBody = await response.json();
                    userContext.dispatch({
                        ...userContext.user,
                        type: "login",
                        payload : {
                            currentUserName: responseBody.fullName,
                            currentUserId: responseBody.id,
                            curretUserRole : responseBody.role,
                        },
                       
                    });
                    navigate('/dashboard');
                    setMessage(<span className="text-success">Successfully Registered</span>);
                    
                } else {
                    setMessage(<span className="text-danger">Registration Failed</span>);
                    
                }
            } catch (error) {
                setMessage(<span className="text-danger">An error occurred: {error.message}</span>);
            }
        } else {
            setMessage(<span className="text-danger">Errors</span>);
        }
    };


        let isValid = () => {
            let valid = true;
       
        // reading all controls from 'errors' state

        for(let control in errors){
            if(errors[control].length > 0){
                valid = false;
            }
            return valid
        }
        }
  return (
    <div className='row'>
        <div className='col-lg-6 mx-auto'>
              <div className='card border-primary shadow my-2'>
                <div className='card-header border-bottom border-primary'>
                      <h4 style={{ fontSize: "40px" }}
                    className='text-primary text-center'
                    >Register</h4>

                    <ul className='text-danger'>
                        {Object.keys(errors).map((control)=>{
                            if(dirty[control]){
                                return errors[control].map((err)=>{
                                    return <li key={err}>{err}</li>;
                                });
                            } else {
                                return "";
                            }
                        })}

                    </ul>
                </div>
            
               <div className='card-body border-bottom '>
                      {/* email start here  */}
                       <div className='form-group form-row'>
                          <label className='col-lg-4' htmlFor='email'>Email</label>
                          <div className='col-lg-8'>
                              <input type='text' className='form-control' name='email' value={state.email} onChange={(event) => {
                                  setState({ ...state, [event.target.name]: event.target.value });
                              }} id='email' 
                              onBlur={(event)=>{
                                setDirty({...dirty,[event.target.name]: true});
                                validate();
                              }}
                              />
                              <div className='text-danger'>
                                {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
                              </div>
                          </div>
                       </div>
                      {/* email ends  */}
                      {/* password starts here  */}
                       <div className='form-group form-row'>
                          <label className='col-lg-4' htmlFor='password'>Password</label>
                          <div className='col-lg-8'>
                              <input type='password' className='form-control' name='password' value={state.password} onChange={(event) => {
                                  setState({ ...state, [event.target.name]: event.target.value });
                              }} id='password'
                                  onBlur={(event) => {
                                      setDirty({ ...dirty, [event.target.name]: true });
                                      validate();
                                  }}
                              />
                              <div className='text-danger'>
                                  {dirty["password"] && errors["password"][0] ? errors["password"] : ""}
                              </div>
                          </div>
                       </div>
                      {/* password ends here  */}
                      {/* fullName starts here  */}
                       <div className='form-group form-row'>
                          <label className='col-lg-4' htmlFor='fullName'>FullName</label>
                          <div className='col-lg-8'>
                              <input type='text' className='form-control' name='fullName' value={state.fullName} onChange={(event) => {
                                  setState({ ...state, [event.target.name]: event.target.value });
                              }} id='fullName'
                                  onBlur={(event) => {
                                      setDirty({ ...dirty, [event.target.name]: true });
                                      validate();
                                  }}
                                  />
                              <div className='text-danger'>
                                  {dirty["fullName"] && errors["fullName"][0] ? errors["fullName"] : ""}
                              </div>
                          </div>
                       </div>
                      {/* fullName ends here  */}
                      {/* Date Of Birth starts here  */}
                       <div className='form-group form-row'>
                          <label className='col-lg-4' htmlFor='dateOfBirth'>Date Of Birth</label>
                          <div className='col-lg-8'>
                              <input type='date' className='form-control' name='dateOfBirth' value={state.dateOfBirth} onChange={(event) => {
                                  setState({ ...state, [event.target.name]: event.target.value });
                              }} id='dateOfBirth'
                                  onBlur={(event) => {
                                      setDirty({ ...dirty, [event.target.name]: true });
                                      validate();
                                  }}
                                  />
                              <div className='text-danger'>
                                  {dirty["dateOfBirth"] && errors["dateOfBirth"][0] ? errors["dateOfBirth"] : ""}
                              </div>
                          </div>
                       </div>
                      {/* Date Of Birth ends here  */}
                      {/* gender starts here  */}
                       <div className='form-group form-row'>
                          <label className='col-lg-4 '>Gender</label>
                          <div className='col-lg-8'>
                            <div className="form-check">
                                  <input  type='radio' className=' form-checked-input' name='gender' value="male"
                              id='male' 
                             checked={state.gender === "male"? true : false}
                               onChange={(event) => 
                                 {
                                  setState({ ...state, [event.target.name]: event.target.value });
                                      }} onBlur={(event) => {
                                          setDirty({ ...dirty, [event.target.name]: true });
                                          validate();
                                      }} />
                              <label className='form-check-inline' htmlFor='male'>Male</label>
                              </div>
                              {/* <div className='text-danger'>
                                  {dirty["gender"] && errors["gender"][0] ? errors["gender"] : ""}
                              </div> */}
                            <div className="form-check">
                                  <input type='radio' className=' form-checked-input' name='gender' value="female"
                              id='female' 
                             checked={state.gender === "female"? true : false}
                               onChange={(event) => 
                                 {
                                  setState({ ...state, [event.target.name]: event.target.value });
                              }} />
                              <label className='form-check-inline' htmlFor='female'>Female</label>
                                  
                            </div>
                          </div>
                          <div className='text-danger'>
                              {dirty["gender"] && errors["gender"][0] ? errors["gender"] : ""}
                          </div>
                       </div>
                      {/* gender ends here  */}
                      {/* country starts here  */}
                       <div className='form-group form-row'>
                          <label className='col-lg-4 '>Country</label>
                          <div className='col-lg-8'>
                              <select 
                                  className='form-control'
                                  name='country'
                                  value={state.country} onChange={(event) => {
                                      setState({ ...state, [event.target.name]: event.target.value });
                                  }}
                                  onBlur={(event) => {
                                      setDirty({ ...dirty, [event.target.name]: true });
                                      validate();
                                  }}
                              >   
                                  <option value=""> Please Select</option>
                                  {countries.map((country)=>(<option key={country.id} value={country.id}>{country.countryName}</option>))}
                              </select>
                          </div>
                       </div>
                      <div className='text-danger'>
                          {dirty["country"] && errors["country"][0] ? errors["country"] : ""}
                      </div>
                      {/* country ends here  */}
                      <div className='form-group form-row'>
                          <label className='col-lg-4 '></label>
                          <div className='col-lg-8'>
                              <div className="form-check">
                                  <input type='checkbox' className=' form-checked-input' name='receiveNewsLetters' value="male"
                                      id='receiveNewsLetters'
                                      checked={state.receiveNewsLetters === true ? true : false}
                                      onChange={(event) => {
                                          setState({ ...state, [event.target.name]: event.target.checked });
                                      }} 
                                      onBlur={(event) => {
                                          setDirty({ ...dirty, [event.target.name]: true });
                                          validate();
                                      }}
                                      />
                                  <label className='form-check-inline' htmlFor='receiveNewsLetters'>Receive News Letters</label>
                              </div>
                              
                          </div>
                      </div>
                      {/* <div className='text-danger'>
                          {dirty["receiveNewsLetters"] && errors["receiveNewsLetters"][0] ? errors["receiveNewsLetters"] : ""}
                      </div> */}
                      {/* receiveNewsLetters ends */}
                      {/* footer start  */}
                      <div className='card-footer text-center'>
                        <div className='m-1'>{message}</div>
                        <div>
                            <button className='btn btn-primary m-2' onClick={onRegisterClick}>
                                Register
                            </button>
                        </div>
                      </div>
                      {/* footer end  */}
                </div>
                   
            </div>
        </div>
   </div>
  )
}

export default Register