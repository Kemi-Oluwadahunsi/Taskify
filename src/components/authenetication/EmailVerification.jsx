import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function EmailVerification() {
  const { emailToken } = useParams();
  const { verifyEmailAndRegister, login } = useAuth();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyEmailToken = async () => {
      try {
        const user = await verifyEmailAndRegister(emailToken);
        setVerificationStatus("success");

        // Attempt to log in the user automatically
        try {
          await login(user.email, user.password); // Note: The backend should not return the actual password
          setTimeout(() => navigate("/dashboard"), 3000);
        } catch (loginError) {
          console.error("Auto-login failed:", loginError);
          setTimeout(() => navigate("/login"), 3000);
        }
      } catch (err) {
        console.error("Email verification failed:", err);
        setVerificationStatus("error");
        setError(err.message || "Verification failed. Please try again.");
      }
    };

    verifyEmailToken();
  }, [emailToken, verifyEmailAndRegister, login, navigate]);

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
                You will be redirected to the dashboard in a few seconds...
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
