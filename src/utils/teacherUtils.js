export const normalizeTeachers = (rawValue) => {
  if (!rawValue) return [];

  if (Array.isArray(rawValue)) {
    return rawValue
      .map((item, index) => (item ? { id: String(index), ...item } : null))
      .filter(Boolean);
  }

  if (typeof rawValue === "object") {
    return Object.entries(rawValue)
      .map(([key, item]) => ({ id: key, ...item }))
      .sort((a, b) => a.id.localeCompare(b.id));
  }

  return [];
};

export const formatTeacherLanguages = (languages) =>
  Array.isArray(languages) ? languages.join(", ") : languages || "-";

export const getTeacherExperience = (teacher) =>
  teacher.experience || teacher.experience_info || teacher.experience_description || teacher.bio || "-";
