import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const PdfThumbnail = ({ file, onRendered }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!file) return;

    const renderPdf = async () => {
      try {
        const canvas = canvasRef.current;
        if (!canvas) return; // ⛑️ SAFETY CHECK

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const pdfData = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 1 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;

        const img = canvas.toDataURL("image/jpeg",0.6);
        onRendered(img);
      } catch (err) {
        console.error("PDF thumbnail render failed:", err);
      }
    };

    renderPdf();
  }, [file, onRendered]);

  // 👇 Canvas MUST exist in DOM
  return (
    <canvas
      ref={canvasRef}
      style={{ display: "none" }}
    />
  );
};

export default PdfThumbnail;
