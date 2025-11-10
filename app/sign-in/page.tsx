import { SignIn } from "@stackframe/stack";
import Link from "next/link";

const SignInPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center mx-8">
            <div className="max-w-md w-full space-y-6">
                <SignIn />
                <Link href={'/'} className="text-sm">
                    <span className="mr-2">&larr;</span>
                    Back to Home
                </Link>
            </div>
        </div>
    );
}

export default SignInPage;