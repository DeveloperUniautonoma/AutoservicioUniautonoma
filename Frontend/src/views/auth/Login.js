// reactstrap components
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  Col
} from "reactstrap";
import { startGoogleSignIn } from "store/auth/thunks";

const Login = () => {

  const { status } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  const isAuthenticating = useMemo( () => status === 'checking', [status] );

  const onGoogleSignIn = () =>{
    dispatch( startGoogleSignIn() );
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
            <img
                    alt=""
                    src={
                      require("../../assets/img/logos/logoQuimera.png")
                        
                    }
                ></img>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                disabled={ isAuthenticating }
                color="default"
                //onClick={(e) => e.preventDefault()}
                onClick={ onGoogleSignIn }
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Iniciar sesión con Google</span>
              </Button>
            </div>
          </CardHeader>
        </Card>
      </Col>
    </>
  );
};

export default Login;
