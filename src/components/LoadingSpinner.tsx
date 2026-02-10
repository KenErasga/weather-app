export default function LoadingSpinner({ message }: { message?: string }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-orange-500" />
            {message && <p className="mt-4 text-lg text-gray-500">{message}</p>}
        </div>
    );
}
