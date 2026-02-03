import { createRequire } from "module";
import mammoth from "mammoth";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse"); // ✅ FUNCTION in v1.1.1

export async function parseResume(file) {
  if (!file) throw new Error("No file uploaded");

  // ---------- PDF ----------
  if (file.mimetype === "application/pdf") {
    const data = await pdfParse(file.buffer);
    return data.text.trim();
  }

  // ---------- DOCX ----------
  if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({
      buffer: file.buffer,
    });
    return result.value.trim();
  }

  throw new Error("Unsupported resume format");
}
