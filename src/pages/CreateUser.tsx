import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonText,
} from "@ionic/react";
import styles from "./CreateUser.module.css";
import { useEffect, useState } from "react";
import { UserRegistration } from "../models/UserRegistration";
import { signUp } from "../services/ApiHandler";
import { useHistory } from "react-router-dom";

const CreateUser = () => {
  const [userData, setUserData] = useState<UserRegistration>({
    username: "",
    password: "",
    passConfirmation: "",
  });
  const [message, setMessage] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const history = useHistory();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signUp(userData);
      console.log(response.data);
      history.push("/signin");
    } catch (error: any) {
      console.error("Error during sign-up:", error.response.data.message);
      setMessage(error.response.data.message);
      setError(true);
    } finally {
      setUserData({ username: "", password: "", passConfirmation: "" });
    }
  }; 
 

  const handleInputChange = (
    event: CustomEvent,
    key: keyof UserRegistration
  ) => {
    const newValue = event.detail.value;
    setUserData((prev) => ({
      ...prev!,
      [key]: newValue,
    }));
  };
  useEffect(() => {
    if (
      userData.password !== "" &&
      userData.password === userData.passConfirmation
    ) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [userData]);

  return (
    <IonPage className={styles.pageHeight}>
      <IonContent>
        <form className={styles.center} onSubmit={submitHandler}>
          <IonItem>
            <IonInput
              required
              label="Username"
              labelPlacement="stacked"
              type="text"
              aria-label="Username"
              onIonInput={(e) => handleInputChange(e, "username")}
              value={userData.username}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              required
              label="Password"
              labelPlacement="stacked"
              type="password"
              aria-label="Password"
              onIonInput={(e) => handleInputChange(e, "password")}
              value={userData.password}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              required
              label="Retype password"
              labelPlacement="stacked"
              type="password"
              aria-label="Password"
              onIonInput={(e) => handleInputChange(e, "passConfirmation")}
              value={userData.passConfirmation}
            ></IonInput>
          </IonItem>
          {error && (
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
              disabled={!passwordsMatch}
            >
              Create account
            </IonButton>
            <IonButton fill="clear" routerLink="/signin">
              Already have an account?
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateUser;
