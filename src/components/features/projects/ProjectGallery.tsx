import Image from "next/image";

import type { Tables } from "@/types/database.types";

type Project = Tables<"projects">;

type ProjectGalleryProps = {
  projects: Project[];
};

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Chưa có dự án
        </p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Hình ảnh dự án thi công sẽ được cập nhật sớm.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <article
          key={project.id}
          className="overflow-hidden rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="relative aspect-[16/10] bg-zinc-100 dark:bg-zinc-900">
            {project.thumbnail_url ? (
              <Image
                src={project.thumbnail_url}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                Chưa có ảnh
              </div>
            )}
          </div>

          <div className="space-y-2 p-4">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              {project.title}
            </h3>
            {project.location ? (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {project.location}
              </p>
            ) : null}
            {project.client_name ? (
              <p className="text-sm text-zinc-500">{project.client_name}</p>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
