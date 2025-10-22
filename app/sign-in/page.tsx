import { SignIn } from "@stackframe/stack";
import Link from "next/link";

const SignInPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full space-y-6">
                <SignIn />
                <Link href={'/'} className="text-sm">Back to Home</Link>
            </div>
        </div>
    );
}

export default SignInPage;