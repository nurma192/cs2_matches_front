export const messageCatch = (payload: any): string => {
    if (payload && typeof payload === "object")
        if (Array.isArray(payload?.data?.message)) {
            return payload.data.message[0] || "";
        }
        if (typeof payload?.data?.message === "string") {
            return payload.data.message;
        }
        if (Array.isArray(payload?.message)) {
            return payload.message[0] || "";
        }
        if (typeof payload?.message === "string") {
            return payload.message;
        }

    return ""
}
