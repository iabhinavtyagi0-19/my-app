import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Test1() {
    return (
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>

            {/* Image skeleton */}
            <div style={{ width: "20%" }}>
                <Skeleton height={120} />
            </div>

            {/* Text skeleton */}
            <div style={{ flex: 1 }}>
                <Skeleton height={30} width={200} />
                <div style={{ marginTop: 10 }}>
                    <Skeleton count={3} />
                </div>
            </div>

        </div>
    );
}