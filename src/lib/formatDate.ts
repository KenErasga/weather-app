export function formatDateShort(dateStr: string): string {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "short",
    });
}

export function formatDateLong(dateStr: string): string {
    const date = new Date(dateStr + "T00:00:00");
    const weekday = date.toLocaleDateString("en-GB", { weekday: "long" });
    const day = date.getDate();
    const month = date.toLocaleDateString("en-GB", { month: "long" });
    const year = date.getFullYear();
    return `${weekday}, ${day} ${month} ${year}`;
}
