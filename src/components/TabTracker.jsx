import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export default function TabTracker({
                                       finish,
                                       setWarningText,
                                       setWarnings
                                   }) {
    const blocked = useRef(false);
    const refreshing = useRef(false);

    const { id } = useParams();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("auth_user"));

        if (!user || !id) return;

        const key = `warnings_${id}_${user.uid}`;

        const saved =
            Number(localStorage.getItem(key)) || 0;

        setWarnings(saved);

        function beforeUnload() {
            refreshing.current = true;
        }

        function visibility() {
            if (
                document.hidden &&
                !blocked.current &&
                !refreshing.current
            ) {
                blocked.current = true;

                let count =
                    Number(localStorage.getItem(key)) || 0;

                count++;

                localStorage.setItem(key, count);

                setWarnings(count);

                setWarningText(
                    `Вы покинули экзамен (${count}/3)`
                );

                setTimeout(() => {
                    setWarningText("");
                }, 3000);

                if (count >= 3) {
                    finish();
                }
            }

            if (!document.hidden) {
                blocked.current = false;
                refreshing.current = false;
            }
        }

        window.addEventListener("beforeunload", beforeUnload);
        document.addEventListener(
            "visibilitychange",
            visibility
        );

        return () => {
            window.removeEventListener(
                "beforeunload",
                beforeUnload
            );
            document.removeEventListener(
                "visibilitychange",
                visibility
            );
        };
    }, []);

    return null;
}