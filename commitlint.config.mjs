export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Tính năng mới
        "fix", // Sửa lỗi
        "docs", // Tài liệu
        "style", // Format code (không đổi logic)
        "refactor", // Tái cấu trúc code
        "perf", // Tối ưu hiệu năng
        "test", // Thêm/sửa test
        "chore", // Cấu hình, tooling, deps
        "db", // Migration, Supabase schema
      ],
    ],
  },
};
