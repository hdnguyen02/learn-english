import { useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-300">
      <div className="flex w-full h-full">
        <div className="w-4/12 h-full">
          <img
            src="login_image.png"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col justify-center items-center bg-white w-8/12 h-full">
          <p className="text-center font-bold text-4xl">Đăng Nhập</p>

          <LoginForm></LoginForm>

          <p className="text-center font-bold text-xl my-3">Hoặc</p>
          <a
            href="#"
            className="flex gap-3 px-6 py-3 rounded-xl justify-center items-center w-3/5"
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          >
            <span className="inline-block size-8">
              <img
                src="google.png"
                alt=""
                className="object-cover w-full h-full"
              />
            </span>
            <span>Tiếp tục với Google</span>
          </a>

          <p className="text-center my-4">
            Bạn chưa có tài khoản?{" "}
            <a href="#" className="font-bold cursor-pointer">
              Đăng ký
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const LoginForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: { email: "", password: "", rememberPassword: false },
    resolver: yupResolver(
      Yup.object({
        email: Yup.string()
          .email("Email is not valid")
          .required("Email must not be empty"),
        password: Yup.string()
          .required("Password must not be empty")
          .matches(/^[^\s]*$/, "Password must not include whitespace"),
        rememberPassword: Yup.boolean(),
      })
    ),
    mode: "all",
  });
  const [showPass, setShowPass] = useState(false);
  const emailInput = watch("email");
  const passwordInput = watch("password");

  return (
    <form
      className="w-3/5 flex flex-col mt-12"
      onSubmit={handleSubmit((values) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(values);
          }, 5000);
        });
      })}
    >
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        className={`px-4 py-3 rounded-lg outline-none ${
          emailInput ? "bg-[#E8F0FE]" : "bg-gray-200"
        } text-xl`}
        {...register("email")}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <div className="relative mt-5">
        <input
          type={showPass ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Password"
          className={`px-4 py-3 rounded-lg outline-none ${
            passwordInput ? "bg-[#E8F0FE]" : "bg-gray-200"
          } text-xl w-full`}
          {...register("password")}
        />
        <span
          className="absolute top-1/2 right-2 -translate-y-1/2 text-4xl cursor-pointer"
          onClick={() => {
            setShowPass(!showPass);
          }}
        >
          {showPass ? (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M12 9a3.02 3.02 0 00-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-1.641-1.359-3-3-3z" />
              <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757c-.273.021-.55.038-.841.038-5.351 0-7.424-3.846-7.926-5a8.642 8.642 0 011.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379a.994.994 0 000 .633C2.073 12.383 4.367 19 12 19zm0-14c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657a.994.994 0 000-.633C21.927 11.617 19.633 5 12 5zm4.972 10.558l-2.28-2.28c.19-.39.308-.819.308-1.278 0-1.641-1.359-3-3-3-.459 0-.888.118-1.277.309L8.915 7.501A9.26 9.26 0 0112 7c5.351 0 7.424 3.846 7.926 5-.302.692-1.166 2.342-2.954 3.558z" />
            </svg>
          )}
        </span>
      </div>
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <button
        type="submit"
        className="text-center my-5 py-3 bg-[#35ACEF] text-white font-bold rounded-xl"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="mx-auto size-6 border-[4px] border-white rounded-full border-t-transparent animate-spin"></div>
        ) : (
          "Đăng Nhập"
        )}
      </button>

      <div className="flex justify-between">
        <div className="flex justify-center gap-2 group">
          <input
            type="checkbox"
            id="rememberPass"
            className="bg-gray-300 cursor-pointer"
            {...register("rememberPassword")}
          ></input>
          <label htmlFor="rememberPass" className="cursor-pointer">
            Ghi nhớ mật khẩu
          </label>
        </div>
        <a href="#">Quên mật khẩu?</a>
      </div>
    </form>
  );
};

export default Login;
