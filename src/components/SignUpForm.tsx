import { useForm } from 'react-hook-form';

interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>();

  const onSubmit = (data: SignupFormInputs) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium">Name</label>
          <input {...register('name', { required: true })} className="w-full border rounded p-2" />
          {errors.name && <span className="text-red-500">This field is required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium">Email</label>
          <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className="w-full border rounded p-2" />
          {errors.email && <span className="text-red-500">This field is required and should be a valid email</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium">Password</label>
          <input {...register('password', { required: true, minLength: 6 })} type="password" className="w-full border rounded p-2" />
          {errors.password && <span className="text-red-500">This field is required and should have at least 6 characters</span>}
        </div>
        <div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
