import NavigationBar from "@/components/navigation-bar/NavigationBar";
import RequirePermission from "@/components/wrappers/RequirePermission";
import Scanner from "./components/Scanner";
import LoadingButton from "@/components/LoadingButton";
import TicketNumberInput from "./components/TicketNumberInput";

export default function Scan() {
    return <RequirePermission permissionId={2}>
        <NavigationBar />
        <div className="flex max-sm:flex-col p-10 gap-5 max-sm:max-w-[400px] sm:h-[400px] mx-auto">
            <Scanner />
            <div className="text-center text-xl font-semibold text-gray-400">or</div>
            <div>
                <TicketNumberInput />
                <LoadingButton disabled loading={false} className="bg-brand-red text-white w-full mt-16 py-2 rounded text-sm disabled:opacity-50"
                >
                    Consume
                </LoadingButton>
            </div>
        </div>
    </RequirePermission >
}