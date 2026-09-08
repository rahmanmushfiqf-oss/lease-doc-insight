// Converts any uploaded image into a WebP data URL so every image stored
// through the admin area is served in WebP.
const MAX_EDGE = 2000;

export async function fileToWebp(file: File, quality = 0.85): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the file"));
    reader.readAsDataURL(file);
  });

  // SVG stays vector; converting it to WebP would lose quality.
  if (file.type === "image/svg+xml") return dataUrl;
  if (typeof document === "undefined") return dataUrl;

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Could not decode the image"));
      el.src = dataUrl;
    });

    const scale = Math.min(1, MAX_EDGE / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) return dataUrl;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const webp = canvas.toDataURL("image/webp", quality);
    return webp.startsWith("data:image/webp") ? webp : dataUrl;
  } catch {
    return dataUrl;
  }
}
