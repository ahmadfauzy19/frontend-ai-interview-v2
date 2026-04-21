import { useSnackbar } from '@/context/snackbar/SnackbarContext';
import axiosUtils from '@/utils/axiosUtils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { CandidateAnswer } from './InterviewAnswer.interfaces';
import { useForm } from 'react-hook-form';

const useInterviewAnswer = () => {
  const [answerCandidate, setAnswerCandidate] = useState<CandidateAnswer>();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);
  const { candidateId, id } = useParams();
  const { showSnackbar } = useSnackbar();

  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [loadingSave, setLoadingSave] = useState<Record<string, boolean>>({});
  const [loadingValidate, setLoadingValidate] = useState<Record<string, boolean>>({});

  // ✅ react-hook-form
  const { control, setValue, getValues } = useForm();

  async function fetchCandidateAnswer() {
    setIsLoading(true);
    const res = await axiosUtils.get(`/answers/candidate-result/${id}/${candidateId}`);
    setAnswerCandidate(res.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchCandidateAnswer();
  }, [candidateId]);

  // ================= DOWNLOAD =================
  const handleDownload = async (fileName: string) => {
    try {
      setIsLoadingDownload(true);
      const res = await axiosUtils.get(`/answers/download/${fileName}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', fileName);

      document.body.appendChild(link);
      link.click();

      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      if (error.response && error.response.data instanceof Blob) {
        const reader = new FileReader();

        reader.onload = () => {
          const errorData = JSON.parse(reader.result as string);
          showSnackbar(errorData.message, 'error');
        };

        reader.readAsText(error.response.data);
      } else {
        showSnackbar(
          error.response?.data?.message || 'Terjadi kesalahan sistem',
          'error'
        );
      }
    } finally {
      setIsLoadingDownload(false);
    }
  };

  // ================= EDIT =================
  const handleEdit = (questionId: string, currentText: string) => {
    setEditMode((prev) => ({ ...prev, [questionId]: true }));

    // inject ke react-hook-form
    setValue(`answer_${questionId}`, currentText);
  };

  // ================= SAVE =================
  const handleSave = async (participantId: string, questionId: string) => {
    if (!candidateId) return;

    // ambil dari RHF
    const updatedText = getValues(`answer_${questionId}`);

    try {
      setLoadingSave((prev) => ({ ...prev, [questionId]: true }));

      await axiosUtils.put(
        `/answers/update-result/${participantId}/${questionId}`,
        {
          answerTranscript: updatedText,
        }
      );

      // update local state
      setAnswerCandidate((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          answers: prev.answers.map((ans) =>
            ans.questionId === questionId
              ? { ...ans, answerTranscript: updatedText }
              : ans
          ),
        };
      });

      showSnackbar('Answer berhasil diupdate', 'success');
      setEditMode((prev) => ({ ...prev, [questionId]: false }));
    } catch (error: any) {
      showSnackbar(
        error.response?.data?.message || 'Gagal update answer',
        'error'
      );
    } finally {
      setLoadingSave((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  // ================= VALIDATE =================
  const handleValidateToggle = async (
    participantId: string,
    questionId: string,
    value: boolean
  ) => {
    try {
      if (value) {
        const confirmValidate = window.confirm(
          'Yakin ingin validate? Setelah ini tidak bisa diedit.'
        );
        if (!confirmValidate) return;
      }

      setLoadingValidate((prev) => ({ ...prev, [questionId]: true }));

      await axiosUtils.put(
        `/answers/validate/${participantId}/${questionId}`,
        { validated: value }
      );

      setAnswerCandidate((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          answers: prev.answers.map((ans) =>
            ans.questionId === questionId
              ? { ...ans, isValidated: value }
              : ans
          ),
        };
      });

      showSnackbar('Status validasi berhasil diupdate', 'success');
    } catch (error: any) {
      showSnackbar(
        error.response?.data?.message || 'Gagal update validasi',
        'error'
      );
    } finally {
      setLoadingValidate((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  // ================= CANCEL =================
  const handleCancel = (questionId: string) => {
    setEditMode((prev) => ({ ...prev, [questionId]: false }));
  };

  return {
    answerCandidate,
    isLoading,
    id,
    isLoadingDownload,
    editMode,
    loadingSave,
    loadingValidate,
    handleCancel,
    handleDownload,
    handleEdit,
    handleSave,
    handleValidateToggle,
    control,
  };
};

export default useInterviewAnswer;