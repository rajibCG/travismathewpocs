"use client";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  clearMsg,
  errorMsg,
  infoMsg,
  successMsg,
} from "../../../lib/Notification";
import { signIn } from "next-auth/react";

export default function SinupPage() {
  const router = useRouter();

  const makeSignIn = async (email, password) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: `/`,
    });
    if (res.url) router.push("/");
    if (res?.error) {
      errorMsg(res.error);
    }
  };
  return (
    <div className="overflow-auto signin__modal modal_main in">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .min(3, "Minimum 3 characters")
            .max(60, "Must be 60 characters or less")
            .matches(/^[A-Za-z]+$/, "Only character is allowed.")
            .required("Please enter your first name"),
          lastName: Yup.string()
            .min(1, "Minimum 1 characters")
            .max(60, "Must be 60 characters or less")
            .matches(/^[A-Za-z]+$/, "Only character is allowed.")
            .required("Please enter your last name"),
          email: Yup.string()
            .max(60, "Must be 60 characters or less")
            .email("Invalid email address")
            .required("Please enter your email"),
          password: Yup.string()
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            )
            .required("Please enter your password"),
        })}
        onSubmit={async (
          values,
          { setSubmitting, setFieldError, resetForm }
        ) => {
          setSubmitting(true);
          clearMsg();

          await fetch("/api/auth/postsignup", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
            .then((result) => result.json())
            .then(async (res) => {
              if (res.isRegistered) {
                await makeSignIn(values.email, values.password);
                successMsg("You are successfully loggedin.");
                resetForm();
              } else if (res.message) {
                infoMsg(res.message);
              }
              if (res.status === 400) {
                if (res.data) {
                  for (let [key, value] of Object.entries(res.data)) {
                    if (values[key]) {
                      setFieldError(key, value?.toString());
                    }
                  }
                }
                if (res.message) {
                  errorMsg(res.message);
                }
              }
            })
            .catch((ex) => {
              console.log(ex);
              errorMsg(ex.message);
            });

          setSubmitting(false);
        }}
      >
        {(formik) => (
          <div className="modal-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="bg-slate-300 flex flex-col items-center justify-center min-h-screen  shadow-lg">
                <div className="bg-white shadow-md rounded mt-5 px-8 pt-6 pb-8 mb-4 w-1/2 md:w-1/3 ">
                  <div className="text-black font-semibold text-2xl text-center rounded p-2">
                    Sign Up
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="firstName"
                      className="uppercase text-sm text-gray-600 font-bold"
                    >
                      First Name
                      <Field
                        name="firstName"
                        aria-label="enter your first name"
                        aria-required="true"
                        type="text"
                        className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline form-control c__input user_valid valid"
                      />
                    </label>

                    <div className="text-red-600 text-sm">
                      <ErrorMessage name="firstName" />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="lastName"
                      className="uppercase text-sm text-gray-600 font-bold"
                    >
                      Last Name
                      <Field
                        name="lastName"
                        aria-label="enter your last name"
                        aria-required="true"
                        type="text"
                        className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline form-control c__input user_valid valid"
                      />
                    </label>

                    <div className="text-red-600 text-sm">
                      <ErrorMessage name="lastName" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="uppercase text-sm text-gray-600 font-bold"
                    >
                      Email
                      <Field
                        name="email"
                        aria-label="enter your email"
                        aria-required="true"
                        type="text"
                        className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline form-control c__input user_valid valid"
                      />
                    </label>

                    <div className="text-red-600 text-sm">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="uppercase text-sm text-gray-600 font-bold"
                    >
                      password
                      <Field
                        name="password"
                        aria-label="enter your password"
                        aria-required="true"
                        type="password"
                        className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline form-control c__input user_valid valid"
                      />
                    </label>

                    <div className="text-red-600 text-sm">
                      <ErrorMessage name="password" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="uppercase text-sm font-bold tracking-wide bg-green-400 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150 btn btn--primary btn--primary-light text-uppercase btn--expand ajaxLoginButton"
                      disabled={formik.isSubmitting ? true : false}
                    >
                      {formik.isSubmitting ? "Please wait..." : "Sign Up"}
                    </button>
                  </div>
                  <div className="pt-4 font-semibold text-center text-blue-500">
                    <Link href="/login">Alreday have an account</Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
}
