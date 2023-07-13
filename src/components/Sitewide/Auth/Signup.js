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
} from "@/lib/Notification";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Modal from "@/components/Modal/Modal";

export default function Signup() {
    const router = useRouter();
    const [showModal, SetShowModal] = useState(false)

    const handleSignup = () => {
        SetShowModal((prevstate) => !prevstate)
    }

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
        <>
            <button type="button" onClick={handleSignup}>
                Signup
            </button>
            {showModal &&
                <Modal closeAction={handleSignup}>
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
                            <form onSubmit={formik.handleSubmit}>
                                <div className="bg-white">
                                    <div className="text-black font-semibold text-2xl text-center rounded p-2">
                                        Sign Up
                                    </div>
                                    <div className="mb-2">
                                        <label
                                            htmlFor="firstName"
                                            className=" text-sm text-gray-600 font-semibold"
                                        >
                                            First Name
                                            <Field
                                                name="firstName"
                                                aria-label="enter your first name"
                                                aria-required="true"
                                                type="text"
                                                className="w-full bg-gray-300 text-gray-900 mt-1 p-2 rounded-lg focus:outline-none focus:shadow-outline form-control c__input user_valid valid"
                                            />
                                        </label>

                                        <div className="text-red-600 text-sm">
                                            <ErrorMessage name="firstName" />
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <label
                                            htmlFor="lastName"
                                            className=" text-sm text-gray-600 font-semibold"
                                        >
                                            Last Name
                                            <Field
                                                name="lastName"
                                                aria-label="enter your last name"
                                                aria-required="true"
                                                type="text"
                                                className="w-full bg-gray-300 text-gray-900 mt-1 p-2 rounded-lg focus:outline-none focus:shadow-outline form-control c__input user_valid valid"
                                            />
                                        </label>

                                        <div className="text-red-600 text-sm">
                                            <ErrorMessage name="lastName" />
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <label
                                            htmlFor="email"
                                            className=" text-sm text-gray-600 font-semibold"
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
                                    <div className="mb-2">
                                        <label
                                            htmlFor="password"
                                            className=" text-sm text-gray-600 font-semibold"
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
                                    <div className="flex pt-4 items-center justify-center">
                                        <button
                                            type="submit"
                                            className="uppercase text-sm font-bold tracking-wide bg-green-400 text-gray-100 p-2 rounded-lg w-full focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150 btn btn--primary btn--primary-light text-uppercase btn--expand ajaxLoginButton"
                                            disabled={formik.isSubmitting ? true : false}
                                        >
                                            {formik.isSubmitting ? "Please wait..." : "Sign Up"}
                                        </button>
                                    </div>
                                    <div className="pt-4 font-semibold text-center text-blue-500">
                                        <Link href="/login" onClick={handleSignup}>Alreday have an account</Link>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </Modal>
            }
        </>
    );
}
