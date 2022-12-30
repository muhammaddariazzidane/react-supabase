import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="px-0 py-16 h-screen bg-gray-900 mx-auto w-full">
          <div className="lds-dual-ring lg:ml-[48%] lg:mt-[16%] ml-[44%] mt-[38%]"></div>
        </div>
      ) : (
        <div className="overflow-hidden ">
          <div className="px-4 py-32  mx-auto w-full h-full">
            <div className="flex flex-col items-center justify-center xl:flex-row">
              <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                <div className="relative">
                  <svg viewBox="0 0 52 24" fill="currentColor" className="absolute bottom-0 right-0 z-0 hidden w-32 -mb-8 -mr-20 text-teal-accent-400 lg:w-32 lg:-mr-16 sm:block">
                    <defs>
                      <pattern id="766323e1-e594-4ffd-a688-e7275079d540" x="0" y="0" width=".135" height=".30">
                        <circle cx="1" cy="1" r=".7" />
                      </pattern>
                    </defs>
                    <rect fill="url(#766323e1-e594-4ffd-a688-e7275079d540)" width="52" height="24" />
                  </svg>
                  <div className="relative bg-white rounded shadow-2xl p-7 sm:p-10">
                    <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                      Sign in via <span className="text-teal-accent-400 underline">magic</span> link with your email
                    </h3>
                    <form onSubmit={handleLogin}>
                      <div className="mb-1 sm:mb-2">
                        <label htmlFor="email" className="inline-block mb-1 font-medium">
                          E-mail
                        </label>
                        <input
                          placeholder="john.doe@example.org"
                          required
                          type="email"
                          className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded-2xl shadow-sm appearance-none focus:border-teal-accent-400 focus:outline-none  focus:shadow-outline"
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="mt-4 mb-2 sm:mb-4">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-2xl shadow-md bg-teal-accent-400 hover:bg-teal-accent-700 focus:shadow-outline focus:outline-none"
                        >
                          Send magic link
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
