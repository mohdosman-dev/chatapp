import { useAuth } from "../../hooks/use-auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "../../components/logo";

const SignUpPage = () => {
  const { signup, isSigningUp } = useAuth();
  const formSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.email("Email is required"),
    password: z
      .string("Password is required")
      .trim()
      .min(8, "Password must be 8 characters at least"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isSigningUp) return;
    signup(values);
  };

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted p-6">
      <div className="w-full max-w-sm">
        <div className=" card card-lg shadow-xl rounded-xl">
          <div className=" card-title flex flex-col items-center justify-center gap-3">
            <Logo showText={false} />
            <span className="text-xl">Create your account</span>
          </div>

          <div className="card-body">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 gap-3">
              <label className="label">Name</label>
              <input type="text" className="input" placeholder="Name" />

              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email" />

              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password" />

              <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
