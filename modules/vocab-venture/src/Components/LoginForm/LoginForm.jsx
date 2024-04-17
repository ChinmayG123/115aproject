import React from 'react';

const LoginForm = () => {
    return(
        
           
          
            <div className="container-lg my-5">
                <div className= "row justify-content-center">
                <div className= "col-md-4">
                

                <div className="card text-bg-light border-dark border border-4 text-center">

                <div className ="card-body">
                    <h1 className= "text-uppercase"> Login</h1>
                <div className= "row justify-content-center my-4">
                    <p>
                        Don't have an account? <a href="#" className="link-secondary">Register</a>
                    </p>


                <div className="row justify-content-center">
                        <div className="col-sm-9">
                            <form>
                                <div className="form-group text-start mb-3">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" id="username" placeholder="Username"/>
                                </div>
                                <div className="form-group text-start mb-3">
                                    <label htmlFor="password">Password</label>
                                    <input type="text" className="form-control" id="password" placeholder="Password"/>
                                </div>     
                            </form>
                            <div className="row justify-content-center"></div>
                            <button type="submit" className="btn btn-primary formBtn" id="submit-login">Sign in</button>

                        
                        </div>
                </div> </div>
                </div>
                </div>
                </div>
                </div>
                
            
            </div>
            
    );

};

export default LoginForm;