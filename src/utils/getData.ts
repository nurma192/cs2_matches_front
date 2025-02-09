export function formatTimeAgo(timestamp: string | number | Date): string {
    const createdDate = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds}сек назад`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes}мин назад`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours}ч назад`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays}дн назад`;
    }

    const createdYear = createdDate.getFullYear();
    const nowYear = now.getFullYear();

    // Ensure day and month are formatted as "DD.MM" with leading zeros
    const day = createdDate.getDate().toString().padStart(2, "0");
    const month = (createdDate.getMonth() + 1).toString().padStart(2, "0");

    if (createdYear === nowYear) {
        return `${day}.${month}`;
    }

    return `${day}.${month}.${createdYear}`;
}
