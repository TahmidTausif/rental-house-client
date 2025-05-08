
import Link from "next/link";
import SecondaryButton from "../shared/SecondaryButton";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import SectionHeader from "../shared/SectionHeader";
import PrimaryButton from "../shared/PrimaryButton";

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
        <section className="py-20 bg-gray-50 text-white text-center">
            <div className="max-w-4xl mx-auto px-4">
                <div className="space-y-4 text-center mb-8">
                    <SectionHeader
                        title="Join Rental House Today"
                        subtitle="READY TO FIND YOUR NEXT HOME ?"
                    />
                </div>
                
                <div className="flex justify-center gap-4 flex-wrap">
                    <Link href={"/register"}>
                        <PrimaryButton className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-orange-100 transition">
                            Sign Up as Tenant
                        </PrimaryButton>
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
