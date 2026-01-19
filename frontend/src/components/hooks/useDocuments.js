// src/components/hooks/useDocuments.js
import { useState, useCallback } from "react";
import api from "../../api/api";
import { useNotification } from "../NotificationProvider";

export default function useDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const { notify } = useNotification();

  /* ===================== FETCH DOCUMENTS ===================== */
  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/documents/me");
      setDocuments(res.data);
    } catch (err) {
      const msg = extractServerMessage(err, "Failed to fetch documents");
      notify(msg, "error");
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [notify]);

  /* ===================== UPLOAD ===================== */
  const uploadDocument = useCallback(
    async (file, documentType) => {
      if (!file || !documentType) return null;
      setUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("documentType", documentType);

        const res = await api.post("/documents", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setDocuments((prev) => [...prev, res.data]);
        notify("Document uploaded successfully", "success");

        return res.data;
      } catch (err) {
        const msg = extractServerMessage(err, "Failed to upload document");
        notify(msg, "error");
        setError(err);
        throw err;
      } finally {
        setUploading(false);
      }
    },
    [notify]
  );

  /* ===================== DELETE ===================== */
  const deleteDocument = useCallback(
    async (id, displayName) => {
      if (!id) return;
      setError(null);

      try {
        await api.delete(`/documents/${id}`);
        setDocuments((prev) => prev.filter((doc) => doc.id !== id));
        notify(`Deleted "${displayName || "Document"}"`, "success");
      } catch (err) {
        const msg = extractServerMessage(err, "Failed to delete document");
        notify(msg, "error");
        setError(err);
        throw err;
      }
    },
    [notify]
  );

  /* ===================== DOWNLOAD ===================== */
  const downloadDocument = useCallback(
    async (doc) => {
      if (!doc?.id) return;

      try {
        const res = await api.get(`/documents/download/${doc.id}`, {
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", doc.displayName || doc.fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();

        notify(`Downloaded "${doc.displayName || doc.fileName}"`, "success");
      } catch (err) {
        const msg = extractServerMessage(err, "Failed to download document");
        notify(msg, "error");
        setError(err);
        throw err;
      }
    },
    [notify]
  );

  /* ===================== HELPER ===================== */
  const extractServerMessage = (err, defaultMsg) => {
    if (!err?.response) return "Network error. Please check your connection.";

    // Prefer server-provided message if available
    const serverMsg = err.response.data?.message;
    switch (err.response.status) {
      case 400:
      case 413: // payload too large
        return serverMsg || "Invalid request";
      case 401:
        return serverMsg || "Session expired. Please login again.";
      case 403:
        return serverMsg || "You are not authorized to perform this action.";
      case 404:
        return serverMsg || "Resource not found.";
      case 500:
        return serverMsg || "Server error. Please try again later.";
      default:
        return serverMsg || defaultMsg;
    }
  };

  return {
    documents,
    loading,
    uploading,
    error,
    fetchDocuments,
    uploadDocument,
    deleteDocument,
    downloadDocument,
  };
}
