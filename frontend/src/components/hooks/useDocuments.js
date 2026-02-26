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
  const fetchDocuments = useCallback(
    async (role, userId = null) => {
      if (!role) return;

      setLoading(true);
      setError(null);

      try {
        // Fetch documents for a specific role and optional user
        const res = await api.get("/documents/me", {
          params: { role, userId },
        });
        setDocuments(res.data);
      } catch (err) {
        const msg = extractServerMessage(err, "Failed to fetch documents");
        notify(msg, "error");
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [notify]
  );

  /* ===================== UPLOAD ===================== */
  const uploadDocument = useCallback(
    async (file, documentType, role, userId = null) => {
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
      if (!id || !role) return;
      setError(null);

      try {
        await api.delete(`/documents/${id}`, {
          data: { role, userId },
        });
        setDocuments((prev) => prev.filter((doc) => doc.id !== id));
        notify(`Deleted document`, "success");
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
    async (doc, role, userId = null) => {
      if (!doc?.id || !role) return;

      try {
        const res = await api.get(`/documents/download/${doc.id}`, {
          params: { role, userId },
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

    const serverMsg = err.response.data?.message;
    switch (err.response.status) {
      case 400:
      case 413:
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