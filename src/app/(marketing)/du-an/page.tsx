import { createClient } from "@/lib/supabase/server";
import { ProjectGallery } from "@/components/features/projects/ProjectGallery";

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("completed_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Dự án thi công
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Hình ảnh các dự án bếp công nghiệp đã triển khai.
        </p>
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-6 py-8 dark:border-red-900 dark:bg-red-950/30">
          <p className="font-medium text-red-800 dark:text-red-300">
            Không thể tải danh sách dự án
          </p>
          <p className="mt-2 text-sm text-red-700 dark:text-red-400">
            {error.message}
          </p>
        </div>
      ) : (
        <ProjectGallery projects={data ?? []} />
      )}
    </div>
  );
}
