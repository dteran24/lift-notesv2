import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
  IonText,
  IonToast,
} from "@ionic/react";
import styles from "./CreateUser.module.css";
import { useEffect, useState } from "react";
import { UserRegistration } from "../models/UserRegistration";
import { signUp } from "../services/ApiHandler";
import { useHistory } from "react-router-dom";
import { person } from "ionicons/icons";

const CreateUser = () => {
  const [userData, setUserData] = useState<UserRegistration>({
    username: "",
    password: "",
    passConfirmation: "",
  });
  const [message, setMessage] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signUp(userData);
      if (response.status === 201) {
        setIsOpen(true);
        setMessage("Account Created!");
      }
      setTimeout(() => {
        history.push("/signin");
      }, 1000);

      setError(false);
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
    const newValue = event.detail.value.trim();
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
      setError(false);
    } else if (
      userData.username !== "" &&
      userData.password !== "" &&
      userData.passConfirmation !== "" &&
      userData.password !== userData.passConfirmation
    ) {
      setError(true);
      setPasswordsMatch(false);
      setMessage("Passwords do not match!");
    }
  }, [userData]);

  return (
    <IonPage>
      <IonContent className={`${styles.center} ion-padding`}>
        <hgroup className={styles.header}>
          <h1>Create Account</h1>
          <h3>Keep track of your hardwork everywhere!</h3>
        </hgroup>
        <form onSubmit={submitHandler}>
          <IonItem>
            <IonInput
              required
              label="Username"
              labelPlacement="stacked"
              type="text"
              aria-label="Username"
              onIonChange={(e) => handleInputChange(e, "username")}
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
              onIonChange={(e) => handleInputChange(e, "password")}
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
            <span>
              Already have an account?
              <a href="/signin"> Sign In</a>
            </span>
          </div>
        </form>
        <IonToast
          swipeGesture="vertical"
          isOpen={isOpen}
          message={message}
          onDidDismiss={() => setIsOpen(false)}
          duration={500}
          color="success"
          icon={person}
        ></IonToast>
      </IonContent>
    </IonPage>
  );
};

export default CreateUser;
