import LoginForm from "@/components/modules/auth/login/LoginForm";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense>
      <div className="h-screen w-screen flex justify-center items-center">
        <LoginForm />
      </div>
    </Suspense>
  );
};

export default LoginPage;
