// src/components/hooks/useDocuments.js
import { useState, useCallback } from "react";
import api from "../../api/api";
import { useNotification } from "../NotificationProvider";

// Define 2 MB limit (2 * 1024 * 1024 bytes)
const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

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
      case 413: return serverMsg || `File too large. Maximum size is ${MAX_FILE_SIZE_MB} MB.`;
      case 500: return serverMsg || "Internal server error.";
      default: return serverMsg || defaultMsg;
    }
  };

  /* ===================== FETCH DOCUMENTS ===================== */
  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/documents/me");
      const data = Array.isArray(res.data) ? res.data : [];
      setDocuments(data);
    } catch (err) {
      setDocuments([]);
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
      if (!file || !documentType || !role) return null;

      // Client-side file size check before hit to backend
      if (file.size > MAX_FILE_SIZE_BYTES) {
        const sizeErrorMsg = `File size exceeds the ${MAX_FILE_SIZE_MB} MB limit.`;
        notify(sizeErrorMsg, "error");
        const customError = new Error(sizeErrorMsg);
        setError(customError);
        throw customError;
      }

      setUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("documentType", documentType);
        
        // Pass activeRole in FormData AND query params for backend compatibility
        formData.append("activeRole", role);
        formData.append("role", role); 

        if (userId) formData.append("userId", userId);

        const res = await api.post("/documents", formData, {
          params: { activeRole: role, role },
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
    async (id, role, userId = null) => {
      if (!id) return;
      setError(null);

      try {
        await api.delete(`/documents/${id}`, {
          params: { activeRole: role, role, userId },
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
          params: { activeRole: role, role, userId },
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", doc.fileName || "document.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

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