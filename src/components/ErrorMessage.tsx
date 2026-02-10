export default function ErrorMessage({ message }: { message: string }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <p className="text-lg text-red-600">{message}</p>
        </main>
    );
}
