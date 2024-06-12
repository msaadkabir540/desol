"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log({ data });
    try {
      const res = await fetch("../api/user", {
        method: "POST",
        body: JSON.stringify(data),
      });
      console.log({ res });
      if (res.ok) {
        localStorage.setItem("token", "qwertyuiopasdfghjklzxcvbnm");
      }
      if (!res.ok) {
        throw new Error("Failed to add vehicle");
      }
      router.push("../");
    } catch (error) {
      console.log("Failed to add vehicle", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <h4 className="mb-2 text-center">Sign In</h4>
        <div className="mb-2">
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={handleSubmit(onSubmit)} method="POST">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    {...register("email", { required: true })}
                  />{" "}
                  {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    {...register("password", { required: true })}
                  />
                  {errors.password && <p className="text-danger">{errors.password.message}</p>}
                </div>
                <div className="mb-5 text-end">
                  <input type="submit" title="Sign in" className="btn btn-primary col-md-12" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
