
import { Metadata } from "next";
import Settings from "./Settings";

export const metadata: Metadata = {
    title: 'Omnistock | Settings'
}

const SettingsWrapper = () => {
    return (
        <Settings />
    );
}

export default SettingsWrapper;