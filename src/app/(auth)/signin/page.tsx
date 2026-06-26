import { SignInForm } from "@/features/auth/components/SignInForm";

export default async function SignInPage(props: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const { registered } = await props.searchParams;

  return (
    <div>
      {registered === "true" && (
        <div className="mb-6 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
          Cuenta creada correctamente. Iniciá sesión con tus credenciales.
        </div>
      )}
      <SignInForm />
    </div>
  );
}
