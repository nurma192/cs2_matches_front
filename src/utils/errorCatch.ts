export const errorCatch = (payload: any): string => {
    if (payload && typeof payload === "object")
        if (Array.isArray(payload?.data?.error)) {
            return payload.data.error[0] || "";
        }
    if (typeof payload?.data?.error === "string") {
        return payload.data.error;
    }
    if (Array.isArray(payload?.error)) {
        return payload.error[0] || "";
    }
    if (typeof payload?.error === "string") {
        return payload.error;
    }

    return ""
}
