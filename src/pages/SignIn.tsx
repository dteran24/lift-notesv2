import {
  IonButton,
  IonButtons,
  IonCardContent,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";
import styles from "./SignIn.module.css";
import { useState } from "react";
import { UserRegistration } from "../models/UserRegistration";
import { signUp, Login } from "../services/ApiHandler";
import { UserSignIn } from "../models/UserSignIn";

const SignIn = () => {
    const [signInData, setSignInData] = useState<UserSignIn>({
        username:"",
        password:""
    })

    const submitHandler = async  (e: React.FormEvent) => {
        e.preventDefault();
        Login(signInData).then(response => response.data).catch(e => console.log(e));
        
    }

    const handleInputChange = (event: CustomEvent, key: keyof UserRegistration) => {
        const newValue = event.detail.value;
        setSignInData((prev) => ({
          ...prev!,
          [key]: newValue,
        }));
      };

  return (
    <IonPage>
      <IonContent>
        <form className={styles.center} onSubmit={submitHandler}>
          <IonItem>
            <IonLabel position="stacked" >Username</IonLabel>
            <IonInput type="text" aria-label="Username" onIonChange={(e) => handleInputChange(e, "username")} value={signInData.username} ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput type="password" aria-label="Password" onIonChange={(e) => handleInputChange(e, "password")} value={signInData.password}></IonInput>
          </IonItem>
          <div className={styles.buttonGroup}>
            <IonButton type="submit" shape="round" expand="full" fill="solid">Sign in</IonButton>
            <IonButton fill="clear" routerLink="/signup">Not a user?</IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};
export default SignIn;
