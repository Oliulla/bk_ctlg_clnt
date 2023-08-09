
import { useForm } from 'react-hook-form';

interface ILoginInput {
    email: string;
    password: string
}

export default function LoginForm() {
  const { register, handleSubmit } = useForm<ILoginInput>();

  const onSubmit = (data: ILoginInput) => {
    console.log(data); // Replace with your actual login logic
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium">Email</label>
          <input
            type="email"
            id="email"
            className="w-full border rounded p-2"
            {...register('email', { required: true })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium">Password</label>
          <input
            type="password"
            id="password"
            className="w-full border rounded p-2"
            {...register('password', { required: true })}
          />
        </div>
        <div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
