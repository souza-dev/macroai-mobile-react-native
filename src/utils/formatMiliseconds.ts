export default function formatMilliseconds(ms: number) {
    ms %= 3600000;
    const minutes = Math.floor(ms / 60000);
    ms %= 60000;
    const seconds = Math.floor(ms / 1000);

    const pad = (num: number) => String(num).padStart(2, '0');

    return `${pad(minutes)}:${pad(seconds)}`;
}
