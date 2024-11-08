import LoadingSpinner from "@/components/ui/common/Loading";
export default function Loading() {
    return (
      <div className="min-h-[400px] w-full flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <div className="mt-4 text-gray-500">Đang tải...</div>
        </div>
      </div>
    );
  }