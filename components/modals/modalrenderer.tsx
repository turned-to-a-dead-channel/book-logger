"use client";
import { useModal } from "@/context/modalcontext";
import { useUser } from "@/context/usercontext";
import { useBooks } from "@/context/bookscontext";
import SessionModal from "@/components/modals/sessionlog";
import AddBookModal from "@/components/modals/addbook";

const ModalRenderer = ({ todayString } : { todayString : string}) => {
  const { activeModal, setActiveModal } = useModal();
  const { user } = useUser();
  const { books } = useBooks();
  const currentlyReading = books?.filter(b => b.status === 'currently reading');

  return (
    <>
      <SessionModal todayString={ todayString } isOpen={activeModal === "logSession"} onClose={() => setActiveModal(null)} currentlyReading={currentlyReading} />
      <AddBookModal isOpen={activeModal === "addBook"} userUid={user?.user_uid} onClose={() => setActiveModal(null)} />
    </>
  );
};

export default ModalRenderer;