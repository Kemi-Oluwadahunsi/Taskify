import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const { verifyEmailAndRegister } = useAuth();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyEmailToken = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setVerificationStatus("error");
        setError(
          "Invalid verification link. Please ensure you've clicked the correct link from your email."
        );
        return;
      }

      try {
        await verifyEmailAndRegister(token);
        setVerificationStatus("success");
        setTimeout(() => navigate("/dashboard"), 3000);
      } catch (err) {
        console.error("Email verification failed:", err);
        setVerificationStatus("error");
        setError(
          err.message ||
            "Verification failed. Please try again or contact support."
        );
      }
    };

    verifyEmailToken();
  }, [searchParams, verifyEmailAndRegister, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
          {verificationStatus === "verifying" && (
            <div className="mt-4 flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-2 text-center text-sm text-gray-600">
                Please wait while we verify your email address...
              </p>
            </div>
          )}
          {verificationStatus === "success" && (
            <div className="mt-4 text-center">
              <p className="text-lg font-medium text-green-600">
                Your email has been successfully verified!
              </p>
              <p className="mt-2 text-sm text-gray-600">
                You will be redirected to the dashboard in a few seconds...
              </p>
            </div>
          )}
          {verificationStatus === "error" && (
            <div className="mt-4 text-center">
              <p className="text-lg font-medium text-red-600">
                Email verification failed.
              </p>
              <p className="mt-2 text-sm text-gray-600">{error}</p>
              <p className="mt-2 text-sm text-gray-600">
                Please try again or contact support.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
