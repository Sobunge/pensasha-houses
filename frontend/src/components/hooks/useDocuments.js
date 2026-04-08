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

  /* ===================== HELPER ===================== */
  const extractServerMessage = (err, defaultMsg) => {
    if (!err?.response) return "Network error. Please check your connection.";
    const serverMsg = err.response.data?.message;
    switch (err.response.status) {
      case 400: return serverMsg || "Invalid request";
      case 401: return serverMsg || "Session expired. Please login again.";
      case 403: return serverMsg || "You are not authorized.";
      case 413: return serverMsg || "File too large.";
      case 500: return serverMsg || "Internal server error.";
      default: return serverMsg || defaultMsg;
    }
  };

  /* ===================== FETCH DOCUMENTS ===================== */
  const fetchDocuments = useCallback(async () => {
    // Removed role requirement here so list loads immediately based on JWT
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/documents/me");
      // Force array format to prevent .map() crashes
      const data = Array.isArray(res.data) ? res.data : [];
      setDocuments(data);
    } catch (err) {
      setDocuments([]); // Reset to empty on failure
      const msg = extractServerMessage(err, "Failed to fetch documents");
      notify(msg, "error");
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [notify]);

  /* ===================== UPLOAD ===================== */
  const uploadDocument = useCallback(
    async (file, documentType, role, userId = null) => {
      // Role IS required for uploads to categorize the file correctly
      if (!file || !documentType || !role) return null;

      setUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("documentType", documentType);
        formData.append("role", role);
        if (userId) formData.append("userId", userId);

        const res = await api.post("/documents", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // Optimistically add the new document to the list
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
    async (id, role, userId = null) => {
      if (!id) return;
      setError(null);

      try {
        await api.delete(`/documents/${id}`, {
          // Sending context if needed, though JWT handles ownership
          params: { role, userId },
        });
        
        setDocuments((prev) => prev.filter((doc) => doc.id !== id));
        notify(`Document deleted`, "success");
      } catch (err) {
        const msg = extractServerMessage(err, "Failed to delete document");
        notify(msg, "error");
        setError(err);
      }
    },
    [notify]
  );

  /* ===================== DOWNLOAD ===================== */
  const downloadDocument = useCallback(
    async (doc, role, userId = null) => {
      if (!doc?.id) return;

      try {
        const res = await api.get(`/documents/download/${doc.id}`, {
          params: { role, userId },
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", doc.fileName || "document.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url); // Clean up memory

        notify(`Download started`, "info");
      } catch (err) {
        const msg = extractServerMessage(err, "Failed to download document");
        notify(msg, "error");
      }
    },
    [notify]
  );

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