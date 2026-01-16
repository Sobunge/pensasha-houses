// src/components/hooks/useDocuments.js
import { useState, useCallback } from "react";
import api from "../../api/api";

export default function useDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  /* ===================== FETCH DOCUMENTS ===================== */
  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/documents/me");
      setDocuments(res.data);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ===================== UPLOAD ===================== */
  const uploadDocument = useCallback(async (file, documentType) => {
    if (!file || !documentType) return;
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
      return res.data;
    } catch (err) {
      console.error("Failed to upload document:", err);
      setError(err);
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  /* ===================== DELETE ===================== */
  const deleteDocument = useCallback(async (id) => {
    if (!id) return;
    setError(null);

    try {
      await api.delete(`/documents/${id}`);
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    } catch (err) {
      console.error("Failed to delete document:", err);
      setError(err);
      throw err;
    }
  }, []);

  /* ===================== DOWNLOAD ===================== */
  const downloadDocument = useCallback(async (doc) => {
    if (!doc?.id) return;

    try {
      const res = await api.get(`/documents/download/${doc.id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", doc.fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to download document:", err);
      setError(err);
      throw err;
    }
  }, []);

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
