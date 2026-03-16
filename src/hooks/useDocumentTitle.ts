import { useEffect } from 'react';

interface UseDocumentTitleProps {
  title: string;
}

export const useDocumentTitle = ({ title }: UseDocumentTitleProps) => {
  useEffect(() => {
    const baseTitle = 'Terminal Portfolio';
    document.title = `${title} - ${baseTitle}`;
    return () => {
      document.title = baseTitle;
    };
  }, [title]);
};
