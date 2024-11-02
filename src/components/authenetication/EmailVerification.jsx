import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyEmailToken = async () => {
      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (!token || !email) {
        setVerificationStatus("error");
        setError("Invalid verification link.");
        return;
      }

      try {
        await verifyEmail(token);
        setVerificationStatus("success");
        setTimeout(
          () =>
            navigate(`/login?email=${encodeURIComponent(email)}&verified=true`),
          3000
        );
      } catch (err) {
        console.error("Email verification failed:", err);
        setVerificationStatus("error");
        setError(err.message || "Verification failed. Please try again.");
      }
    };

    verifyEmailToken();
  }, [searchParams, verifyEmail, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
          {verificationStatus === "verifying" && (
            <p className="mt-2 text-center text-sm text-gray-600">
              Please wait while we verify your email address...
            </p>
          )}
          {verificationStatus === "success" && (
            <div>
              <p className="mt-2 text-center text-sm text-green-600">
                Your email has been successfully verified!
              </p>
              <p className="mt-2 text-center text-sm text-gray-600">
                You will be redirected to the login page in a few seconds...
              </p>
            </div>
          )}
          {verificationStatus === "error" && (
            <div>
              <p className="mt-2 text-center text-sm text-red-600">
                Email verification failed.
              </p>
              <p className="mt-2 text-center text-sm text-gray-600">{error}</p>
              <p className="mt-2 text-center text-sm text-gray-600">
                Please try again or contact support.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
