import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
} from "@ionic/react";
import styles from "./SignIn.module.css";
import { useEffect, useState } from "react";
import { Login } from "../services/ApiHandler";
import { UserSignIn } from "../models/UserSignIn";
import { useHistory } from "react-router-dom";
import { useWorkoutContext } from "../util/WorkoutContext";

const SignIn = () => {
  const { setToken } = useWorkoutContext();
  const [signInData, setSignInData] = useState<UserSignIn>({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  
  const history = useHistory();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response = await Login(signInData);
      setToken(response.data.jwt);
      localStorage.setItem('token', response.data.jwt);
      
      
      console.log(response.data);
      setIsError(false);
      setSignInData({ username: "", password: "" });
      history.push("/");
    } catch (error: any) {
      let errorMesage = error.response.data.error;
      setMessage(errorMesage);
      setIsError(true);
      setSignInData((prev) => ({ ...prev, password: "" }));
      console.error(errorMesage);
    }
  };

  const handleInputChange = (event: CustomEvent, key: keyof UserSignIn) => {
    const newValue = event.detail.value.trim();
    setSignInData((prev) => ({
      ...prev!,
      [key]: newValue,
    }));
  };

  useEffect(() => {
    if (signInData.username !== "" && signInData.password !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [signInData]);

  return (
    <IonPage>
      <IonContent>
        <form className={styles.center} onSubmit={submitHandler}>
          <IonItem>
            <IonLabel position="stacked">Username</IonLabel>
            <IonInput
              required
              type="text"
              aria-label="Username"
              onIonInput={(e) => handleInputChange(e, "username")}
              value={signInData.username}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              required
              type="password"
              aria-label="Password"
              onIonInput={(e) => handleInputChange(e, "password")}
              value={signInData.password}
            ></IonInput>
          </IonItem>
          {isError && (
            <div className={styles.message}>
              <IonText color="danger">{message}</IonText>
            </div>
          )}
          <div className={styles.buttonGroup}>
            <IonButton
              type="submit"
              shape="round"
              expand="full"
              fill="solid"
              disabled={isDisabled}
            >
              Sign in
            </IonButton>
            <IonButton fill="clear" routerLink="/signup">
              Not a user?
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};
export default SignIn;
