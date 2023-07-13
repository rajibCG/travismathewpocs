"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { successMsg } from "@/lib/Notification";

export default function SignIn({ csrftoken }) {
  const router = useRouter();
  const [error, setError] = useState(null);

  return (
    <div className="overflow-auto signin__modal modal_main in">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .max(60, "Must be 60 characters or less")
            .email("Invalid email address")
            .required("Please enter your email"),
          password: Yup.string().required("Please enter your password"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          setError(null);
          const res = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: `/`,
          });
          // console.log(res);
          if (res?.error) {
            setError(res.error);
          } else {
            setError(null);
          }
          if (res.url) {
            successMsg("You are successfully logged in.");
            router.push("/");
          }
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <div className="modal-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="bg-slate-300 flex flex-col items-center justify-center min-h-screen  shadow-lg">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="text-black font-semibold text-2xl text-center rounded p-2">
                    Log In
                  </div>
                  <div className="text-red-400 text-md text-center rounded p-2">
                    {error}
                  </div>
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrftoken}
                  />
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="text-sm text-gray-600 font-semibold"
                    >
                      Email
                      <Field
                        name="email"
                        aria-label="enter your email"
                        aria-required="true"
                        type="text"
                        className="w-full bg-gray-300 text-gray-900 mt-1 p-2 rounded-lg focus:outline-none focus:shadow-outline form-control c__input user_valid valid"
                      />
                    </label>

                    <div className="text-red-600 text-sm">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 font-semibold"
                    >
                      Password
                      <Field
                        name="password"
                        aria-label="enter your password"
                        aria-required="true"
                        type="password"
                        className="w-full bg-gray-300 text-gray-900 mt-1 p-2 rounded-lg focus:outline-none focus:shadow-outline form-control c__input user_valid valid"
                      />
                    </label>

                    <div className="text-red-600 text-sm">
                      <ErrorMessage name="password" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="uppercase text-sm font-bold tracking-wide bg-green-400 text-gray-100 p-2 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150 btn btn--primary btn--primary-light text-uppercase btn--expand ajaxLoginButton"
                      disabled={formik.isSubmitting ? true : false}
                    >
                      {formik.isSubmitting ? "Please wait..." : "Sign In"}
                    </button>
                  </div>
                  {/* <div className="pt-4 font-semibold text-center text-blue-500">
                    <Link href="/signup">Don't have an account</Link>
                  </div> */}
                </div>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
}
