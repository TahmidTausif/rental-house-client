
import Link from "next/link";
import SecondaryButton from "../shared/SecondaryButton";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const JoinUsCTA = () => {

    const { data: session } = useSession();
    const handleClick = () => {
        if (session?.user?.role !== "landlord") {
            // Show SweetAlert2 message
            Swal.fire({
                title: 'Oops!',
                text: 'Please Login/Register as a Landlord to list your property!',
                icon: 'warning',
            })
        }
    };
    return (
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white text-center">
            <div className="max-w-4xl mx-auto px-4">

                <div className="flex flex-col mx-auto mb-10">
                    <h2 className="text-lg text-white/90 font-bold mb-4">Ready to find your next home?</h2>
                    <p className=" text-4xl font-bold">Join Rental House Today</p>
                    
                </div>
                <div className="flex justify-center gap-4 flex-wrap">
                    <Link href={"/register"}>
                        <SecondaryButton className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-orange-100 transition">
                            Sign Up as Tenant
                        </SecondaryButton>
                    </Link>
                    <Link href={session?.user?.role === "landlord" ? "/dashboard/landlord/add-listing" : "/register"}>
                        <SecondaryButton onClick={handleClick} className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-orange-100 transition">
                            List Your Property
                        </SecondaryButton>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default JoinUsCTA;
