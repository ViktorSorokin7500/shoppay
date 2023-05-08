import styles from "../../styles/forgot.module.scss";

import Header from "../../components/header";
import Footer from "../../components/footer";
import CircleBtn from "../../components/buttons/circleBtn";

import { BiLeftArrowAlt } from "react-icons/bi";
import { Formik, Form } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";
import LoginInput from "@/components/inputs/loginInput";
import DotLoaderSpinner from "@/components/loaders/DotLoader";
import axios from "axios";

export default function forgot() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const emailValidation = Yup.object({
    email: Yup.string()
      .required("We need your email to reset your password.")
      .email("Enter a valid email address."),
  });
  const forgotHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/forgot", {
        email,
      });
      setError("");
      setSuccess(data.message);
      setLoading(false);
      setEmail("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header country="" />
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Forgot your password? <Link href="/">Login instead</Link>
            </span>
          </div>

          <Formik
            enableReinitialize
            initialValues={{
              email,
            }}
            validationSchema={emailValidation}
            onSubmit={() => {
              forgotHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="email"
                  name="email"
                  icon="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <CircleBtn type="submit" text="Send Link" />
                <div>
                  {error && (
                    <span className={styles.signin_error}>{error}</span>
                  )}
                  {success && (
                    <span className={styles.signin_success}>{success}</span>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <Footer country="" />
    </>
  );
}
