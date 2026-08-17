import { RfqForm } from "@/components/features/rfq/RfqForm";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Liên hệ báo giá
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Gửi yêu cầu báo giá — chúng tôi sẽ liên hệ để tư vấn cấu hình và thi
          công phù hợp dự án của bạn.
        </p>
      </div>

      <RfqForm />
    </div>
  );
}
